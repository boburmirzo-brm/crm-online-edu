import React from "react";
import "./Sidebar.css";
import { NavLink, useLocation } from "react-router-dom";
import { AiOutlineUsergroupAdd, AiOutlineUserAdd } from "react-icons/ai";
import {GLOBAL_ROUTERS} from "../../static/router"

function Sidebar({ info, degree }) {
  const { pathname } = useLocation();
  return (
    <div className="sidebar">
      <h2 className="sidebar__logo">Algoritm EDU</h2>
      <NavLink
        to={`${pathname.split("/").slice(0, 3).join("/")}`}
        className="sidebar__top"
      >
        <div className="sidebar__circle">
          {info?.lastName[0]}
          {info?.firstName[0]}
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
          to={pathname.split("/").slice(0, 3).join("/")+item.path}
          className={({ isActive }) =>
            "sidebar__item " + (isActive && "sidebar__active")
          }
        >
          {item.icon}
          <span>{item.title}</span>
        </NavLink> )
        }
      </div>
    </div>
  );
}

export default Sidebar;
