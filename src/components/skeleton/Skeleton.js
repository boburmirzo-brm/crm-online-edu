import React from "react";
import "./Skeleton.css";

function Skeleton({ title }) {
  return (
    <div className="skeleton">
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
