import React from "react";
import "./EmptyData.css";
import photo from "../../assets/man-sh.png";

function EmptyData({ text }) {
  return (
    <div className="empty__data">
      <p>{text ? text : "Hech narsa topilmadi"}</p>
      <img src={photo} alt={text || "Hech narsa topilmadi"} />
    </div>
  );
}

export default EmptyData;
