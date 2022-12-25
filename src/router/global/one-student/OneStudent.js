import React, { memo, useState,useEffect } from "react";
import "./OneStudent.css"
import axios from "../../../api";
import { useFetch } from "../../../hooks/useFetch";
import { useParams, Link, useLocation } from "react-router-dom";
import {
  reloadTeacherAction,
  reloadGroupAction,
} from "../../../context/action/action";
import male from "../../../assets/male-icon.png";
import female from "../../../assets/female-icon.webp";
import Skeleton from "../../../components/skeleton/Skeleton";
import AddStudentToGroup from "../../../components/add-student-to-group/AddStudentToGroup";

function OneStudent() {
  const [oneId, setOneId] = useState(null)
  
  let { id } = useParams();
  const [innerReload, setInnerReload] = useState(false);
  const { data: student, loading } = useFetch(
    `/api/students/${id}`,
    innerReload
  );
  const [one, setOne] = useState(null);
  const {pathname} = useLocation() 

  useEffect(() => setOne(student), [student]);
  if(!one){
    return <Skeleton title={"O'quvchi haqida batafsil ma'lumot"}/>
  }
  return (
    <div className="one__student">
      <h2 className="one__student-title">O'quvchi haqida batafsil ma'lumot</h2>
      <div className="one__student-head">
        <img src={one?.gender === "male" ? male : female} alt="" />
        <div>
          <p>
            <span>FISH: </span>
            <b>
              {one?.lastName} {one?.firstName} {one?.middleName}
            </b>
          </p>
          <p><span>Manzil:</span><b>{one?.region}</b></p>
          <p><span>Tug'ilgan yil:</span><b>{one?.birthYear}</b></p>
          <p><span>Tel:</span><b>{one?.tel.join(" / ")}</b></p>
          <hr className="hr"/>
          {one?.wantedCourse ? <p><span>Qiziqqan kurslari:</span> <b>{one?.wantedCourse.toUpperCase()}</b></p>:""}
          {one?.wantedDay ? <p><span>Vaqti:</span> <b>{one?.wantedDay} - {one?.wantedTime}</b></p>:""}
          <br />
          <button className="btn-py">O'zgartirish</button>
          <button style={{marginLeft:"8px"}} onClick={()=> setOneId(one?._id)} className="btn-py">Guruhga qo'shish</button>
          <button style={{marginLeft:"8px"}} className="btn-danger">O'chirib yuborish</button>
        </div>
      </div>
      <h2 className="one__student-title">O'quvchi tahsil olayotgan guruhlar</h2>
      <div className="one__student-group">
        {!one?.enrolledCourses.length? <p style={{color:"crimson"}}>Hali guruhlarga qo'shilmagan</p>:<></>}
        {
          one?.enrolledCourses?.map((item,inx)=> <div key={inx} className="one__student-card">
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
          <div className="one__student-item" style={{flex:1}}>
            <b>O'qituvchi</b>
            <p>{item?.teacherInfo?.lastName}</p>
            <p>{item?.teacherInfo?.firstName}</p>
          </div>
          <Link to={`${pathname.pathnameFormat(3)}/get-group/${item._id}`}>
            <button className="btn-py">Batafsil</button>
          </Link>
        </div>)
        }
      </div>
      <AddStudentToGroup id={oneId} setId={setOneId}/>
    </div>
  );
}

export default memo(OneStudent);
