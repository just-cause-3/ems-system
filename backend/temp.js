  if (err) {
    console.error("Database error while processing leave application:", err);
    return res.status(500).json({
      error: "Failed to process leave application",
      details: err.message
    });
  }
  if (!employee) {
    console.log("Employee not found with ID:", req.params.id);
    return res.status(404).json({
      error: "Employee not found"
    });
  }
  
  console.log("Processing leave application for employee:", employee.FirstName);
  const newLeaveApplication = new LeaveApplication(req.body);
  newLeaveApplication.save(function(err, leaveApplication) {
    if (err) {
      console.error("Error saving leave application:", err);
      return res.status(500).json({
        error: "Failed to save leave application",
        details: err.message
      });
    }
    employee.leaveApplication.push(leaveApplication);
    employee.save(function(err, employee) {
      if (err) {
        console.error("Error updating employee with leave application:", err);
        return res.status(500).json({
          error: "Failed to update employee record",
          details: err.message
        });
      }
      console.log("Successfully created leave application");
      res.json({
        success: true,
        leaveApplication: leaveApplication
      });
    });
  });
