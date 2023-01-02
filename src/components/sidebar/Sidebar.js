import React, { memo, useState } from "react";
import "./Sidebar.css";
import { NavLink, useLocation } from "react-router-dom";
import { GLOBAL_ROUTERS } from "../../static/router";
import { useDispatch } from "react-redux";
import { logOutAction } from "../../context/action/action";
import { FiMenu, FiX } from "react-icons/fi";
import logo from "../../assets/logo2.png"
import {IoMdRefresh} from "react-icons/io"
import { IoExitOutline} from "react-icons/io5"

function Sidebar({ info, degree }) {
  const [show, setShow] = useState(false);
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const logOut = () => {
    if (window.confirm("Tizimdan chindan ham chiqmoqchimisi"))
      dispatch(logOutAction());
  };
  return (
    <>
      <div className={`sidebar ${show ? "sidebar__show" : ""}`}>
        <NavLink to="/" className="sidebar__logo">
          <img src={logo} alt="" />
          <span>Algoritm EDU</span>
        </NavLink>
        <NavLink to={`${pathname.pathnameFormat(3)}`} className="sidebar__top">
          <div className="sidebar__circle">{info?.lastName[0]}</div>
          <div className="sidebar__name">
            <h4>{info?.lastName}</h4>
            <h4>{info?.firstName}</h4>
          </div>
          <p>
            {info?.major} {degree?.teacher && "O'qituvchi"}
          </p>
        </NavLink>
        <div style={{textAlign:"right", margin: "20px 0"}}>
          <button onClick={()=> window.location.reload()} className="sidaber__refresh">
            <IoMdRefresh/>
          </button>
        </div>
        <div className="sidebar__collection">
          {GLOBAL_ROUTERS?.map((item, inx) => {
            if (item[pathname.pathnameFormat(3).split("/").slice(-1)[0]]) {
              return (
                <NavLink
                  key={inx}
                  onClick={() => setShow(false)}
                  to={pathname.pathnameFormat() + item.path}
                  className={({ isActive }) =>
                    "sidebar__item " + (isActive && "sidebar__active")
                  }
                >
                  {item.icon}
                  <span>{item.title}</span>
                </NavLink>
              );
            }
          })}
        </div>
        <button className="sidebar__logOut" onClick={logOut}>
          <IoExitOutline/><span>Tizimdan chiqish</span>
        </button>
      </div>
      <button onClick={() => setShow((p) => !p)} className={`sidebar__menu sidebar__menu-${show?"cancel":""}`}>
        {show ? <FiX /> : <FiMenu />}
      </button>
      <div onClick={() => setShow((p) => !p)} className={`sidebar__shadow sidebar__shadow-${show?"show":"hide"}`}></div>
    </>
  );
}

export default memo(Sidebar);
