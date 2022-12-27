import React, { useState } from "react";
import "./Login.css";
import logo from "../../assets/logo.jpg";
import { useDispatch } from "react-redux";
import axios from "../../api";
import {authAction} from "../../context/action/action"
import {Link} from "react-router-dom"

function LoginContainer() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState(null);
  const dispatch = useDispatch()

  const signIn = (e) => {
    e.preventDefault();
    setLoading(true);
    axios
      .post("/api/sign-in", { username, password })
      .then(({ data }) => {
        console.log(data?.user?.isActive);
        setLoading(false);
        if(data?.user?.isActive){
          setMsg({state: true, msg: "Algoritmga hush kelibsiz"})
          dispatch(authAction(data.user))
        }else{
          setMsg({state: false, msg: "Kirishga ruhsat yo'q"});
        }
      })
      .catch(({ response: { data } }) => {
        setLoading(false);
        setMsg(data);
      });
    // setTimeout(() => setMsg(null), 5000);
  };

  return (
    <div className="login">
      <img className="login__logo" src={logo} alt="" />
      <form onSubmit={signIn} className="login__container">
        <h2 className="login__title">Tizimga kirish</h2>
        {msg && (
          <p className={`login__msg ${!loading ? "login__animation":""} ${msg.state ? "login__success":""}`}>{msg.msg}</p>
        )}
        <label htmlFor="">Username:</label>
        <input
          required
          value={username}
          onChange={({ target }) => setUsername(target.value.trim().toLowerCase())}
          type="text"
          placeholder="username..."
        />
        <label htmlFor="">Password:</label>
        <input
          required
          value={password}
          onChange={({ target }) => setPassword(target.value.trim())}
          type="password"
          placeholder="password..."
        />
        <button disabled={loading} type="submit">
          Jo'natish
        </button>
        <Link to={"/"}>Bosh Sahifa</Link>
        <p className="login__edu">Algoritm education center</p>
      </form>
    </div>
  );
}

export default LoginContainer;
