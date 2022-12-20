import React, { memo } from "react";
import { useSelector } from "react-redux";
import "./OneStudent.css";
import male from "../../../assets/male-icon.png";
import female from "../../../assets/female-icon.webp";

function OneStudent() {
  const one = useSelector((s) => s?.getOneStudent);
  console.log(one);
  return (
    <div className="one__student">
      <h2 className="one__student-title">O'quvchi haqida batafsil ma'lumot</h2>
      <div className="one__student-head">
        <img src={one?.gender === "male" ? male : female} alt="" />
        <div>
          <p>
            FISH:{" "}
            <b>
              {one?.lastName} {one?.firstName} {one?.middleName}
            </b>
          </p>
          <p>Manzil: <b>{one?.region}</b></p>
          <p>Tug'ilgan yil: <b>{one?.birthYear} yil</b></p>
          <p>Tel: <b>{one?.tel.join(" / ")}</b></p>
          <hr className="hr"/>
          {one?.wantedCourse ? <p>Qiziqqan kurslari: <b>{one?.wantedCourse.toUpperCase()}</b></p>:""}
          {one?.wantedDay ? <p>Vaqti: <b>{one?.wantedDay} - {one?.wantedTime}</b></p>:""}
        </div>
        <div>
          <button className="btn-py">Guruhga qo'shish</button>
          <br />
          <button style={{marginTop:"8px"}} className="btn-danger">O'chirib yuborish</button>
        </div>
      </div>
      <h2 className="one__student-title">O'quvchi tahsil olayotgan guruhlar</h2>
      <div className="one__student-group">
        {!one?.enrolledCourses.length? <p style={{color:"crimson"}}>Hali guruhlarga qo'shilmagan</p>:<></>}
        {
          one?.enrolledCourses?.map(({groupInfo,teacherInfo},inx)=> <div key={inx} className="one__student-card">
          <span>{inx+1}.</span>
          <div className="one__student-item">
            <b>Fan</b>
            <p>{groupInfo?.name}</p>
            <p>{groupInfo?.level}</p>
          </div>
          <div className="one__student-item">
            <b>Kun vaqti</b>
            <p>{groupInfo?.day}</p>
            <p>{groupInfo?.time}</p>
          </div>
          <div className="one__student-item" style={{flex:1}}>
            <b>O'qituvchi</b>
            <p>{teacherInfo?.lastName}</p>
            <p>{teacherInfo?.firstName}</p>
          </div>
          <div>
            <button className="btn-py">Batafsil</button>
          </div>
        </div>)
        }
      </div>
    </div>
  );
}

export default memo(OneStudent);
