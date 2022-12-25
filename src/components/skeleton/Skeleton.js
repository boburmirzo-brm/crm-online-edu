import React from "react";
import "./Skeleton.css";
import {useNavigate} from "react-router-dom"

function Skeleton({ title }) {
  const navigate = useNavigate()
  return (
    <div className="skeleton">
      <button onClick={()=> navigate(-1)} className="backBtn"><b>&#10140;</b><span>Orqaga</span></button>
      <h2 className="one__group-title">{title}</h2>
      <div className="skeleton__head">
        <div></div>
        <div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
      <div className="skeleton__body">
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
}

export default Skeleton;
