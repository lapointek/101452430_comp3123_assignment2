import React from "react";

const EmployeeComponents = () => {
  const usersDataString = localStorage.getItem("users");

  if (!usersDataString) {
    return <div>No user data available</div>;
  }

  let usersData;
  try {
    usersData = JSON.parse(usersDataString);
  } catch (error) {
    console.error("Error parsing user data from localStorage:", error);
    return <div>Error: Unable to load user data.</div>;
  }

  return (
    <table
      style={{
        margin: "20px",
        border: "1px solid black",
        width: "100%",
        textAlign: "left",
      }}
    >
      <thead>
        <tr>
          <th>ID</th>
          <th>Username</th>
        </tr>
      </thead>
      <tbody>
        {usersData.map((user) => (
          <tr key={user.id}>
            <td>{user.id}</td>
            <td>{user.username}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default EmployeeComponents;
