import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "reactstrap";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import logo from "../Data/inscribe_white_logo.png";
import "../styles.css";

function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // useEffect(() => {
  //     const originalHtmlStyle = document.documentElement.style.cssText;
  //     const originalBodyStyle = document.body.style.cssText;

  //     document.documentElement.style.height = '100%';
  //     document.body.style.height = '100%';
  //     document.body.style.margin = '0px 300px 0px 300px';
  //     document.body.style.fontFamily = 'Arial, sans-serif';
  //     document.body.style.justifyContent = 'center';
  //     document.body.style.alignItems = 'center';
  //     document.body.style.alignContent = 'center';
  //     document.body.style.backgroundColor = '#f0f0f0';

  //     return () => {
  //         document.documentElement.style.cssText = originalHtmlStyle;
  //         document.body.style.cssText = originalBodyStyle;
  //     };
  // }, []);

  const handleLogin = (event) => {
    event.preventDefault();
    if (username === "admin@inscribe.com" && password === "inscribe@3c") {
      login();
      navigate("/home");
    } else {
      setError("Invalid username or password");
    }
  };

  return (
    <div className="login-background">
      <div style={{width:"40%", height:"100vh"}}>
        <div
          className="glass-container uploader-container"
          style={{ padding: "20%", height:"100%", backdropFilter:"blur(18px)"}}
        >
            <div className="login-content">
            <img src={logo} height={"100px"}></img>
            <form onSubmit={handleLogin} style={{width:"100%"}}>
            <div className="input-group">
            <div style={{width:"100%"}}>
            <span style={{fontSize:"18px"}}>Username</span>
            <input
                type="text"
                className="form-control"
                id="username"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
           
              
            </div>
            <div className="input-group" style={{ marginTop: "20px" }}>
            <div style={{width:"100%"}}>
                <span style={{fontSize:"18px"}}>Password</span>
                <input
                type="password"
                className="form-control"
                id="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
             
            </div>
            {error && (
              <div style={{ color: "red", marginTop: "10px" }}>{error}</div>
            )}
            <div style={{width:"100%", display:"flex",justifyContent:"center"}}>
            <button
              className="btn login-btn-primary"
              style={{ marginTop: "40px" }}
            >
              Login
            </button>
            </div>
            
          </form>{" "}
          <div></div>
          <div></div>
            </div>
          
        </div>
      </div>
    </div>
  );
}

export default Login;
