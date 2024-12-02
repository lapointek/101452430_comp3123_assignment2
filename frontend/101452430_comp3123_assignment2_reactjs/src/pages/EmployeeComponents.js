import React, { useState } from "react";

const EmployeeComponents = () => {
  const [employeesData, setEmployeesData] = useState(() => {
    const employeesDataString = localStorage.getItem("employees");
    return employeesDataString ? JSON.parse(employeesDataString) : [];
  });

  const [newEmployee, setNewEmployee] = useState({ id: "", username: "" });

  const addEmployee = () => {
    // Validate input fields
    if (!newEmployee.id || !newEmployee.username) {
      alert("Please enter both ID and Username.");
      return;
    }

    // Check for duplicate IDs
    const duplicateEmployee = employeesData.find(
      (employee) => employee.id === newEmployee.id
    );
    if (duplicateEmployee) {
      alert("This ID already exists. Please use a different ID.");
      return;
    }

    // Add the new employee to the existing data
    const updatedEmployees = [...employeesData, newEmployee];
    localStorage.setItem("employees", JSON.stringify(updatedEmployees));
    setEmployeesData(updatedEmployees);

    // Reset new employee input
    setNewEmployee({ id: "", username: "" });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewEmployee((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div>
      <div style={{ marginBottom: "20px" }}>
        <input
          type="text"
          name="id"
          placeholder="Enter Employee ID"
          value={newEmployee.id}
          onChange={handleChange}
        />
        <input
          type="text"
          name="username"
          placeholder="Enter Employee"
          value={newEmployee.username}
          onChange={handleChange}
        />
        <button onClick={addEmployee}>Add Employee</button>
      </div>

      {employeesData.length === 0 ? (
        <div>No employee data available</div>
      ) : (
        <table
          style={{
            border: "1px solid black",
            width: "100%",
            textAlign: "left",
          }}
        >
          <thead>
            <tr>
              <th>Employee ID</th>
              <th>Employee Name</th>
            </tr>
          </thead>
          <tbody>
            {employeesData.map((employee) => (
              <tr key={employee.id}>
                <td>{employee.id}</td>
                <td>{employee.username}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default EmployeeComponents;
