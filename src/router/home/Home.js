import React from 'react'
import { Link } from "react-router-dom"
import "./Home.css"
import logo from "../../assets/logo2.png"

function Home() {
  return (
    <div className='home'>
      <div className="home__navbar">
        <div className="home__logo">
          <img src={logo} alt="" />
          <span>Algoritm EDU</span>
        </div>
        <div className='nav__btns nav__btnsShow'>
          <Link to={`/login`}>Tizimga kirish</Link>
          <Link to={`/register-student`}>Ro'yhatdan o'tish</Link>
        </div>
      </div>
      <h1 className='home__title'>
        <span>Dunyoni</span> 
        <span>o'zgartirishingiz </span> 
        <span>uchun bilimli</span>
        <span>bo'ling.</span>
      </h1>
      <div className='nav__btns nav__btnsHide'>
          <Link to={`/login`}>Tizimga kirish</Link>
          <Link to={`/register-student`}>Ro'yhatdan o'tish</Link>
      </div>
    </div>
  )
}

export default Home