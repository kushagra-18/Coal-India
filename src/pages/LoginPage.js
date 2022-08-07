import "../styles/styles.css";
import { Link, useNavigate } from "react-router-dom";
import { useRef, useState, useContext } from "react";
import  Login from "../components/Login";
// import AuthContext from "../store.js/auth-context";
// import { URL } from "../store.js/const";

function LoginPage() {

  return (
    <div className="login-main">
      <Login></Login>
    </div>
  );
}

export default LoginPage;