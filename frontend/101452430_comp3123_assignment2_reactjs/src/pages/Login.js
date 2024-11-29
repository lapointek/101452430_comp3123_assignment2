import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === "username") {
      setUsername(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const user = { username, password };
    axios
      .post(`http://localhost:5000/user/login`, user)
      .then((res) => {
        console.log(res);
        console.log(res.data);
        setMessage(res.data.message);
        if (res.data.success && res.data.user) {
          const existingUsersString = localStorage.getItem("users") || "[]";
          const existingUsers = JSON.parse(existingUsersString);
          const userExists = existingUsers.some(
            (user) => user.id === res.data.user.id
          );
          if (!userExists) {
            existingUsers.push(res.data.user);
            localStorage.setItem("users", JSON.stringify(existingUsers));
          }
          localStorage.setItem("user", JSON.stringify(res.data.user));
          navigate("/employeecomponents");
        }
      })
      .catch((error) => {
        console.error(error.response.data);
        setMessage("Cannot login!");
      });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Person Name:
          <input
            type="text"
            name="username"
            value={username}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Password:{" "}
          <input
            type="password"
            name="password"
            value={password}
            onChange={handleChange}
            required
          />
        </label>
        <button type="submit">Login</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default Login;
