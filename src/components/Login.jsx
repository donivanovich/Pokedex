import "../styles/login.css";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import usersData from "../mocks/users.json";

function Login({ onLogin }) {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [error, setError] = useState("");
  const [isSignup, setIsSignup] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isSignup) {
      const existingUser = usersData.users.find(u => u.email === email);
      if (existingUser) {
        setError("Email already exists");
        return;
      }

      const newUser = {
        image: "https://randomuser.me/api/portraits/lego/1.jpg",
        fullName,
        username: email.split("@")[0],
        email,
        password
      };

      const updatedUsers = [...usersData.users, newUser];
      localStorage.setItem("mockUsers", JSON.stringify(updatedUsers));

      localStorage.setItem("loggedIn", "true");
      localStorage.setItem("currentUser", JSON.stringify(newUser));
      onLogin();
      navigate("/");
    } else {
      const users = JSON.parse(localStorage.getItem("mockUsers")) || usersData.users;
      const user = users.find(u => u.email === email && u.password === password);

      if (user) {
        localStorage.setItem("loggedIn", "true");
        localStorage.setItem("currentUser", JSON.stringify(user));
        onLogin();
        navigate("/");
      } else {
        setError("Email or password incorrect");
      }
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit}>
        <h2>{isSignup ? "Sign Up" : "Login"}</h2>

        {isSignup && (
          <input
            type="text"
            placeholder="Full Name"
            value={fullName}
            onChange={e => setFullName(e.target.value)}
          />
        )}

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <button type="submit">{isSignup ? "Sign Up" : "Login"}</button>

        {error && <p style={{color: "red"}}>{error}</p>}

        <p
          className="toggle-signup"
          style={{ cursor: "pointer", color: "#e60023", marginTop: "1rem", textAlign: "center" }}
          onClick={() => {
            setIsSignup(!isSignup);
            setError("");
          }}
        >
          {isSignup ? "Already have an account? Login" : "Don't have an account? Sign Up"}
        </p>
      </form>
    </div>
  );
}

export default Login;