import React from 'react'
import {useSelector} from "react-redux"
import { Link } from "react-router-dom"
import "./Home.css"
import logo from "../../assets/logo.jpg"

function Home() {
  let state = useSelector(s=>s)
  return (
    <div className='home'>
      <img src={logo} alt="" />
      <br />
      <Link to={`/login`}>Login for member</Link>
      <br />
      <Link to={`/register-student`}>register student</Link>

    </div>
  )
}

export default Home