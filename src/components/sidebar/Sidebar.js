import React from 'react'
import "./Sidebar.css"

function Sidebar({info, degree}) {
  return (
    <div className='sidebar'>
      <h2 className='sidebar__logo'>Algoritm EDU</h2>
      <div className="sidebar__top">
        <div className="sidebar__circle">
          {info?.lastName[0]}
          {info?.firstName[0]}
        </div>
        <div className="sidebar__name">
          <h4>{info?.lastName}</h4>
          <h4>{info?.firstName}</h4>
        </div>
          <p>{info?.major} {degree?.teacher && "Teacher"}</p>
      </div>
      <div className="sidebar__collection">
        <div className="sidebar__item"></div>
      </div>
    </div>
  )
}

export default Sidebar