// @ts-nocheck
import React, { memo } from "react";
import { useSelector } from "react-redux";
import { TEACHER_MAJOR } from "../../../static";
import "./GetTeacher.css";
import female from "../../../assets/female-icon.webp";
import male from "../../../assets/male-icon.png";
import { Link } from "react-router-dom";

function GetTeacher() {
  const teachers = useSelector((s) => s?.getTeachers);
  // console.log(teachers)
  return (
    <div>
      <div className="get__navbar">
        <h3>O'qituvchilar</h3>
        <ul className="get__collection">
          <li className="get__item get__item-active">
            O'qituvchilar <span>{teachers?.allTeachersIsActiveTrue()}</span>
          </li>
          <li className="get__item">
            Ishdan Ketgan O'qituvchilar <span>{teachers?.allTeachersIsActiveFalse()}</span>
          </li>
        </ul>
      </div>
      <div className="get__controller">
        <input type="text" placeholder="O'qituvchi FISH..." />
        <select name="" id="">
          <option value="all">Barcha yo'nalishlar</option>
          {TEACHER_MAJOR?.map((i, inx) => (
            <option key={inx} value={i}>
              {i.toUpperCase()}
            </option>
          ))}
        </select>
      </div>
      <div className="get__teacher-container">
        {teachers?.map((item) => {
          let {birthYear,firstName,gender,lastName,major,middleName,password,region,tel,username,_id} = item
          return <div key={item._id} className="get__teacher-card">
            <div className="get__teacher-cardHead">
              <img src={gender==="male"? male: female} alt="" />
              <div>
                <h4>{lastName} {firstName} {middleName}</h4>
                <p>
                  Fan <b>{major}</b>
                </p>
                <p>
                  Manzil <b>{region}</b>
                </p>
                <p>
                  Tug'ilgan sana <b>{birthYear} yil</b>
                </p>
              </div>
            </div>
            <div className="get__teacher-cardBody">
              <p>
                Tel <b>{tel?.map(i=>i + " ")}</b>
              </p>
              <p>
                Guruhlar <b>7</b>
              </p>
              <p>
                Username <b>{username}</b>
              </p>
              <p>
                Parol <b>{password}</b>
              </p>
              <div className="get__student-btn">
                <Link
                  // onClick={() => dispatch(getOneStudentAction(item))}
                  to={"item._id"}
                >
                  <button>Batafsil</button>
                </Link>
                <button style={{ background: "crimson" }}>O'chirish</button>
              </div>
            </div>
          </div>
})}
      </div>
    </div>
  );
}

export default memo(GetTeacher);
