const jwt = require('jsonwebtoken');
const { jwtKey } = require('../config');

function verifyToken(req, res, next) {
  const header = req.headers['authorization'];
  if (!header) return res.status(403).json({ error: 'No token provided' });
  
  const [bearer, token] = header.split(' ');
  if (bearer !== 'Bearer' || !token) {
    return res.status(403).json({ error: 'Invalid token format' });
  }

  jwt.verify(token, jwtKey, (err, authData) => {
    if (err) return res.status(403).json({ error: 'Invalid or expired token' });
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
    // Admin (1) and HR (2) can access any employee data
    if (req.user.Account === 1 || req.user.Account === 2) {
      req.employee = { _id: req.params.id };
      return next();
    }
    // Regular employees (3) can only access their own data
    if (req.user.Account === 3) {
      if (req.params.id && req.params.id !== req.user._id) {
        return res.status(403).json({ error: 'Unauthorized to access other employee data' });
      }
      req.employee = { _id: req.user._id };
      return next();
    }
    return res.status(403).json({ error: 'Employee access required' });
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


