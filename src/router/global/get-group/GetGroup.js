import React, { memo } from "react";
import { useSelector } from "react-redux";
import { TEACHER_MAJOR } from "../../../static";
import "./GetGroup.css"

function GetGroup() {
  const groups = useSelector((s) => s?.getGroups);
  return (
    <div className="global__router">
      <div className="get__navbar">
        <h3>Guruhlar</h3>
        <ul className="get__collection">
          <li className="get__item get__item-active">
            Yangi Guruhlar <span>12</span>
          </li>
          <li className="get__item">
            Barcha Guruhlar <span>126</span>
          </li>
        </ul>
      </div>
      <div className="get__controller">
        <ul className="get__controller-collection">
          <li className="get__controller-item get__controller-active">Barchasi <span>12</span></li>
          <li className="get__controller-item">IT <span>3</span></li>
          <li className="get__controller-item">English <span>5</span></li>
          <li className="get__controller-item">Russian <span>2</span></li>
          <li className="get__controller-item">DTM <span>2</span></li>
          <li className="get__controller-item">Bug'alteriya <span>0</span></li>
        </ul>
      </div>
      <div className="get__group-container">
        {groups?.map((item) => (
          <div className="get__group-card" key={item._id}>
            <h3>
              {item.major} {item.level}
            </h3>
            <hr />
          </div>
        ))}
      </div>
    </div>
  );
}

export default memo(GetGroup);
