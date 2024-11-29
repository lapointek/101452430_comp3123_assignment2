import React, { useState } from "react";
import axios from "axios";

function Signup() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === "username") {
      setUsername(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };

  const validateInput = () => {
    if (username.trim() === "") {
      setMessage("Username is required.");
      return false;
    }
    if (password.length < 6) {
      setMessage("Password must be at least 6 characters long.");
      return false;
    }
    return true;
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!validateInput()) return;

    const user = { username, password };

    axios
      .post(`http://localhost:5000/user/signup`, user)
      .then((res) => {
        console.log(res);
        console.log(res.data);
        setMessage(res.data.message);
      })
      .catch((error) => {
        console.error(error);
        if (error.response) {
          setMessage(error.response.data.message || "Error signing up");
        } else if (error.request) {
          setMessage("Network error. Please try again later.");
        } else {
          setMessage("An error occurred. Please try again.");
        }
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
          Password:
          <input
            type="password"
            name="password"
            value={password}
            onChange={handleChange}
            required
          />
        </label>
        <button type="submit">Sign Up</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default Signup;
