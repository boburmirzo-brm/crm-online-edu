// @ts-nocheck
import React, { memo, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./GetStudent.css";
import female from "../../../assets/female-icon.webp";
import male from "../../../assets/male-icon.png";
import { Link, useLocation } from "react-router-dom";
import {
  reloadGroupAction,
  reloadStudentAction,
} from "../../../context/action/action";
import axios from "../../../api";
import { TEACHER_MAJOR } from "../../../static/index";
import AddStudentToGroup from "../../../components/add-student-to-group/AddStudentToGroup";

const [NEW_STUDENT,STUDENT_OF_GROUP,ALL_STUDENT] = ["NEW_STUDENT", "STUDENT_OF_GROUP","ALL_STUDENT"]
function GetStudent({ addStudentInGroup, groupIdInGroup, studentsInGroup }) {
  const data = useSelector((s) => s?.getStudents);
  const dispatch = useDispatch();
  const [id, setId] = useState(null);
  const [courses, setCourses] = useState([]);
  const [filterStudents, setStudents] = useState([]);
  const [filterType, setFilterType] = useState(localStorage.getItem("filterStudent") || NEW_STUDENT);

  useEffect(()=> {
    localStorage.setItem("filterStudent", filterType)
    if(!data){return }
    if(NEW_STUDENT === filterType){
      setStudents(data?.filter(i=> !i.enrolledCourses.length && !i.isEnd ))
    }else if(STUDENT_OF_GROUP === filterType){
      setStudents(data?.filter(i=> i.enrolledCourses.length  && !i.isActive ))
    }else if(ALL_STUDENT === filterType){
      setStudents(data?.filter(i=> i.enrolledCourses.length && i.isActive ))
    }
  }, [data,filterType])
  
  console.log(filterStudents);

  // Zokirkhon
  const [isLoading, setIsLoading] = useState(false);
  const { pathname } = useLocation();

  const deleteStudent = (_id, f, l) => {
    if (window.confirm(`${f} ${l} shu o'quvchini o'chirmoqchimisiz?`)) {
      axios
        .delete(`/api/students/${_id}`)
        .then(({ data }) => {
          console.log(data);
          dispatch(reloadStudentAction());
        })
        .catch(({ response }) => console.log(response));
    }
  };

  const addThisStudentToGroup = (studentId) => {
    const innerData = { studentID: studentId };
    setIsLoading(true);
    axios
      .patch(`/api/groups/add-student/${groupIdInGroup}`, innerData)
      .then(({ data }) => {
        console.log(data);
        dispatch(reloadGroupAction());
        dispatch(reloadStudentAction());
        // dispatch(reloadTeacherAction());
      })
      .catch(({ response }) => {
        console.log(response);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };


  return (
    <div className="global__router">
      <div className="get__navbar">
        <h3>O'quvchilar</h3>
        <ul className="get__collection">
          <li onClick={()=> setFilterType(NEW_STUDENT)} className={`get__item ${NEW_STUDENT===filterType?"get__item-active":""}`}>
            Yangi O'quvchilar <span>{data?.unenrolledCourses()}</span>
          </li>
          <li onClick={()=> setFilterType(STUDENT_OF_GROUP)} className={`get__item ${STUDENT_OF_GROUP===filterType?"get__item-active":""}`}>
            Yangi Guruh O'quvchilari <span>{data?.enrolledCourses()}</span>
          </li>
          <li onClick={()=> setFilterType(ALL_STUDENT)} className={`get__item ${ALL_STUDENT===filterType?"get__item-active":""}`}>
            Markazda O'qiyotgan O'quvchilar <span>{data?.isActiveTrue()}</span>
          </li>
        </ul>
      </div>
      <div className="get__controller">
        <input type="text" placeholder="O'quvchi FISH..." />
        <select name="" id="">
          <option value="all">Barcha yo'nalishlar</option>
          {TEACHER_MAJOR?.map((i, inx) => (
            <option key={inx} value={i}>
              {i.toUpperCase()}
            </option>
          ))}
        </select>
      </div>
      {/* <h3 className="global__title">O'quvchilar</h3> */}
      <div className="get__student-container">
        {!filterStudents.length ? <p>O'quvchilar mavjud emas</p> : <></>} 
        {filterStudents?.map((item, inx) => (
          <div key={inx} className="get__student-card">
            <Link
              to={`${pathname.pathnameFormat()}/get-student/${item._id}`}
            >
              <img src={item.gender === "male" ? male : female} alt="" />
              <h3>
                {item.firstName} {item.lastName} {item.middleName}
              </h3>
            </Link>
            <p>
              Manzil: <b>{item.region}</b>
            </p>
            <p>
              Tug'ilgan sana: <b>{item.birthYear} yil</b>
            </p>
            <p style={{ flex: 1 }}>
              Tel: <b>{item.tel?.map((i) => i + " ")}</b>
            </p>
            {!item.enrolledCourses.length && (
              <span className="get__student-notGroup">
                Guruhga qo'shilmagan
              </span>
            )}
            {item.wantedCourse.length ? (
              <div className="get__student-extra">
                <p>
                  Fan: <i>{item.wantedCourse}</i>
                </p>
                <p>
                  Kun:{" "}
                  <i>
                    {item.wantedDay} {item.wantedTime}
                  </i>
                </p>
              </div>
            ) : (
              <></>
            )}
            {addStudentInGroup ? (
              <>
                <br />
                <button
                  disabled={isLoading || studentsInGroup.includes(item._id)}
                  onClick={() => addThisStudentToGroup(item._id)}
                  className="btn-py"
                >
                  {studentsInGroup.includes(item._id)
                    ? "O'quvchi guruhga qo'shilgan"
                    : "Bu O'quvchini qo'shish"}
                </button>
              </>
            ) : (
              <div className="get__student-btn">
                <Link
                  to={item._id}
                >
                  <button>Batafsil</button>
                </Link>
                <button
                  onClick={() => {
                    setId(item._id);
                    setCourses(item.enrolledCourses);
                  }}
                >
                  Guruh
                </button>

                {!item.enrolledCourses.length ? (
                  <button
                    onClick={() =>
                      deleteStudent(item._id, item.firstName, item.lastName)
                    }
                    style={{ background: "crimson" }}
                  >
                    O'chirish
                  </button>
                ) : (
                  <></>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
      <AddStudentToGroup
        id={id}
        setId={setId}
        courses={courses}
        setCourses={setCourses}
      />
    </div>
  );
}

export default memo(GetStudent);
