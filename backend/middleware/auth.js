const jwt = require('jsonwebtoken');
const { jwtKey } = require('../config');

function verifyToken(req, res, next) {
  const header = req.headers['authorization'];
  if (!header) return res.sendStatus(403);
  jwt.verify(header, jwtKey, (err, authData) => {
    if (err) return res.sendStatus(403);
    req.user = authData;
    next();
  });
}

function verifyAdmin(req, res, next) {
  verifyToken(req, res, function () {
    if (req.user.Account == 1) return next();
    return res.sendStatus(403);
  });
}

function verifyAdminHR(req, res, next) {
  verifyToken(req, res, function () {
    if (req.user.Account == 1 || req.user.Account == 2) return next();
    return res.sendStatus(403);
  });
}

function verifyHR(req, res, next) {
  verifyToken(req, res, function () {
    if (req.user.Account == 2) return next();
    return res.sendStatus(403);
  });
}

function verifyHREmployee(req, res, next) {
  verifyToken(req, res, function () {
    if (req.user.Account == 2) return next();
    if (req.user.Account == 3 && req.user._id == req.params.id) return next();
    return res.sendStatus(403);
  });
}

function verifyEmployee(req, res, next) {
  verifyToken(req, res, function () {
    if (req.user.Account == 3 && req.user._id == req.params.id) return next();
    return res.sendStatus(403);
  });
}

module.exports = { verifyToken, verifyAdmin, verifyAdminHR, verifyHR, verifyHREmployee, verifyEmployee };
// Admin/User role-based helpers
function verifyAdminRole(req, res, next) {
  verifyToken(req, res, function () {
    if (req.user.Account == 1) return next();
    return res.sendStatus(403);
  });
}
function verifyUserRole(req, res, next) {
  verifyToken(req, res, function () {
    if (req.user.Account == 3) return next();
    return res.sendStatus(403);
  });
}

module.exports.verifyAdminRole = verifyAdminRole;
module.exports.verifyUserRole = verifyUserRole;


