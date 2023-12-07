import React, { useState } from "react";
import { handleUserRegistration } from "../firebase";
import "./Register.css";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      if(password !== confirmPassword){
        alert("Passwords do not match");
        return;
      }

      await handleUserRegistration(email, password);
    } catch (error) {
      setError(error.message);
      alert("error");
    }
  };

  return (
    <div className="admin-register">
      <div className="admin-register-container">
        <div className="admin-register-title">
          <h2>Register</h2>
        </div>
        <div className="register-form">
          <form onSubmit={handleRegister}>
            <label>
              Email:
              <br />
              <br />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </label>
            <br />
            <label>
              Password:
              <br />
              <br />
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </label>
            <br />
            <label>
              Confirm Password:
              <br />
              <br />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>
            <br />
            <div className="register-form-button">
              <button type="submit">Register</button>
            </div>
            {error && <p>{error}</p>}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
