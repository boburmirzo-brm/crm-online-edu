// @ts-nocheck
import React from "react";
import "./style/App.css";
import "./style/form.css";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./router/home/Home";
import Login from "./router/login/Login";
import CheckRoute from "./router/check-route/CheckRoute";
import RegisterStudent from "./router/register-student/RegisterStudent";
import { useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const auth = useSelector((s) => s?.has_interop_upgraded);
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        {auth?.isActive ? (
          <Route path="/login" element={<Navigate replace to={"/check"} />} />
        ) : (
          <Route path="/check/*" element={<Navigate replace to={"/login"} />} />
        )}
        <Route path="/login" element={<Login />} />
        <Route path="/check/*" element={<CheckRoute />} />
        <Route path="/register-student" element={<RegisterStudent />} />
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
