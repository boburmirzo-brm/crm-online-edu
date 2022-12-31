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
          data.user.os = [
            data.user.os.slice(0,30), 
            data.user.os.slice(30,60), 
            data.user.os.slice(60),
          ]
          dispatch(authAction(data.user))
          localStorage.setItem("token", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtZXNzYWdlIjoiRWhoIGJlZm95ZGEgaGFyYWthdCBxaWxtYW5nbGFyIiwibWFkZV9ieSI6IkJvYnVybWlyem8gJiBab2tpcmtob24ifQ.ZD1OkRrpV3PBerd8Tc2EKRIcAaW9NNtTL8Va8aBiy0E")
          localStorage.setItem("_oz_bandwidthEstimate","13d561dw156f16%65a&5s1dd1c345c48btb4y9b4fg5b6b489y4j91gfb516fbr89t4h8n941gf1b3fgb1btr8b94df51x3cs6d5c4e9w84fds5v1sdc165")
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
