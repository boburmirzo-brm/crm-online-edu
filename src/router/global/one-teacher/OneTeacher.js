// @ts-nocheck
import React, { memo, useEffect, useState } from "react";
import "./OneTeacher.css";
import axios from "../../../api";
import { useFetch } from "../../../hooks/useFetch";
import { useParams, Link, useLocation, useNavigate } from "react-router-dom";
import {
  reloadTeacherAction,
  reloadGroupAction,
} from "../../../context/action/action";
import male from "../../../assets/male-icon.png";
import female from "../../../assets/female-icon.webp";
import Skeleton from "../../../components/skeleton/Skeleton";

function OneTeacher() {
  let { id } = useParams();
  const [innerReload, setInnerReload] = useState(false);
  const navigate = useNavigate()
  const { data: teacher } = useFetch(
    `/api/teachers/${id}`,
    innerReload
  );
  const [data, setData] = useState(null);
  const {pathname} = useLocation() 

  useEffect(() => setData(teacher), [teacher]);

  if (!data) {
    return <Skeleton title={"O'qituvchi haqida batafsil ma'lumot"}/>;
  }
  let {
    birthYear,
    firstName,
    gender,
    groups,
    lastName,
    major,
    middleName,
    password,
    region,
    tel,
    username,
  } = data;
  return (
    <div className="one__teacher">
      <button onClick={()=> navigate(-1)} className="backBtn"><b>&#10140;</b><span>Orqaga</span></button>
      <h2 className="one__student-title">O'qituvchi haqida batafsil ma'lumot</h2>
      <div className="one__student-head">
        <img src={gender === "male" ? male : female} alt="" />
        <div>
          <p>
            <span>FISH: </span>
            <b>
              {lastName} {firstName} {middleName}
            </b>
          </p>
          <p>
            <span>Fan: </span>
            <b>{major.toUpperCase()}</b>
          </p>
          <p>
            <span>Manzil:</span> 
            <b>{region}</b>
          </p>
          <p>
            <span>Tug'ilgan yil:</span> 
            <b>{birthYear}</b>
          </p>
          <p>
            <span>Tel:</span> 
            <b>{tel.join(" / ")}</b>
          </p>
          <p>
            <span>Username:</span> 
            <b>{username}</b>
          </p>
          <p>
            <span>Parol:</span> 
            <b>{"*".repeat(password.length)}</b>
          </p>
          <br />
          <button className="btn-py">O'zgartirish</button>
          <button style={{ marginLeft: "8px" }} className="btn-danger">
            O'chirib yuborish
          </button>
        </div>
      </div>
      <h2 className="one__student-title">O'qituvchining guruhlari</h2>
      <div className="one__student-group">
        {!groups.length? <p style={{color:"crimson"}}>Hali guruhlarga ega emas</p>:<></>}
        {
          groups?.map((item,inx)=> <div key={inx} className="one__student-card">
          <span>{inx+1}.</span>
          <div className="one__student-item">
            <b>Fan</b>
            <p>{item?.major}</p>
            <p>{item?.level}</p>
          </div>
          <div className="one__student-item">
            <b>Kun vaqti</b>
            <p>{item?.day}</p>
            <p>{item?.time}</p>
          </div>
          <div className="one__student-item">
            <b>Xona</b>
            <p>{item?.room.number}</p>
          </div>
          <div style={{flex:1}} className="one__student-item">
            <b>O'quvchilar soni</b>
            <p>{item?.enrolledStudents.length}</p>
          </div>
          <Link to={`${pathname.pathnameFormat(3)}/get-group/${item._id}`} className="one__student-btn">
            <button className="btn-py">Batafsil</button>
          </Link>
        </div>)
        }
      </div>
    </div>
  );
}

export default memo(OneTeacher);
