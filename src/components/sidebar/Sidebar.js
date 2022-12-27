import React, {memo, useState} from "react";
import "./Sidebar.css";
import { NavLink, useLocation } from "react-router-dom";
import {GLOBAL_ROUTERS} from "../../static/router"
import { useDispatch } from "react-redux"
import { logOutAction } from "../../context/action/action"
import {FiMenu, FiX} from "react-icons/fi"

function Sidebar({ info, degree }) {
  const [show, setShow] = useState(false)
  const { pathname } = useLocation();
  const dispatch = useDispatch()
  const logOut = ()=>{
    if(window.confirm("Tizimdan chindan ham chiqmoqchimisi"))
      dispatch(logOutAction())
  }
  return (
    <>
        <div className={`sidebar ${show?"sidebar__show":""}`}>
      <h2 className="sidebar__logo">Algoritm EDU</h2>
      <NavLink
        to={`${pathname.pathnameFormat(3)}`}
        className="sidebar__top"
      >
        <div className="sidebar__circle">
          {info?.lastName[0]}
        </div>
        <div className="sidebar__name">
          <h4>{info?.lastName}</h4>
          <h4>{info?.firstName}</h4>
        </div>
        <p>
          {info?.major} {degree?.teacher && "Teacher"}
        </p>
      </NavLink>
      <div className="sidebar__collection">
        {
          GLOBAL_ROUTERS?.map((item,inx)=><NavLink
          key={inx}
          onClick={()=>setShow(false)}
          to={pathname.pathnameFormat()+item.path}
          className={({ isActive }) =>
            "sidebar__item " + (isActive && "sidebar__active")
          }
        >
          {item.icon}
          <span>{item.title}</span>
        </NavLink> )
        }
      </div>
      <button className="sidebar__logOut" onClick={logOut}>Tizimdan chiqish</button>
    </div>
    <button onClick={()=>setShow(p=>!p)} className="sidebar__menu">
      {show? <FiX/>:  <FiMenu/>}
     
    </button>
    </>
  );
}

export default memo(Sidebar);
