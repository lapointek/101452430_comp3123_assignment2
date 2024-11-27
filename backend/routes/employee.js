const express = require("express");
const sessionRouter = require("../utils/session");
const Employee = require("../models/employee.model");
const app = express();

app.use(express.json());

app.use(sessionRouter);
const router = express.Router();
app.use(router);

// Create Employee
router.post("/emp/employees", async (req, res) => {
  const data = req.body;
  if (!req.session.username) {
    res.sendStatus(401).json({ message: "Failed to create employee" });
  } else {
    const employee = await Employee.create(data);
    res.status(201).json({
      message: `Employee Created Successfully. employee_id: ${employee.id}`,
    });
  }
});

// Get List of employees
router.get("/emp/employees", async (req, res) => {
  try {
    const fetchEmployees = await Employee.find();
    res.status(200).json(fetchEmployees);
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Fetch employee by id
router.get("/emp/employees/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const fetchEmployee = await Employee.findById(id);
    if (fetchEmployee) {
      res.status(200).json(fetchEmployee);
    } else {
      res.status(404).json({ message: "Employee id not found" });
    }
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Update Employee
router.put("/emp/employees/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const updatedData = req.body;
    const employee = await Employee.findByIdAndUpdate(id, updatedData);
    if (employee) {
      res.status(200).json({
        message: "Employee details updated successfully!",
      });
    } else {
      res.status(404).json({ message: "Employee cannot be updated" });
    }
  } catch (err) {
    console.error("Error", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Delete Employee
router.delete("/emp/employees/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const employee = await Employee.findByIdAndUpdate(id);
    if (employee) {
      res.Status(201).json({ message: "Employee deleted successfully" });
    } else {
      res.status(404).json({ message: "Employee cannot be deleted" });
    }
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;
