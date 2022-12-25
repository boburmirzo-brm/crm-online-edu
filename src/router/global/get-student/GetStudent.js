// @ts-nocheck
import React, { memo, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./GetStudent.css";
import female from "../../../assets/female-icon.webp";
import male from "../../../assets/male-icon.png";
import { Link, useLocation } from "react-router-dom";
import {
  getOneStudentAction,
  reloadAction,
  reloadGroupAction,
  reloadTeacherAction,
  reloadStudentAction,
} from "../../../context/action/action";
import axios from "../../../api";
import { TEACHER_MAJOR } from "../../../static/index";
import AddStudentToGroup from "../../../components/add-student-to-group/AddStudentToGroup";

function GetStudent({ addStudentInGroup, groupIdInGroup, studentsInGroup }) {
  const data = useSelector((s) => s?.getStudents);
  const dispatch = useDispatch();
  const [id, setId] = useState(null);
  const [courses, setCourses] = useState([]);

  // Zokirkhon
  const [isLoading, setIsLoading] = useState(false);
  const { pathname } = useLocation();

  // console.log(data);
  const deleteStudent = (_id, f, l) => {
    if (window.confirm(`${f} ${l} shu o'quvchini o'chirmoqchimisiz?`)) {
      axios
        .delete(`/api/students/${_id}`)
        .then(({ data }) => {
          console.log(data);
          dispatch(reloadAction());
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
        dispatch(reloadTeacherAction());
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
          <li className="get__item get__item-active">
            Yangi O'quvchilar <span>{data?.unenrolledCourses()}</span>
          </li>
          <li className="get__item">
            Yangi Guruh O'quvchilari <span>{data?.enrolledCourses()}</span>
          </li>
          <li className="get__item">
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
        {data?.map((item, inx) => (
          <div key={inx} className="get__student-card">
            <Link
              onClick={() => dispatch(getOneStudentAction(item))}
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
              Tel <b>{item.tel?.map((i) => i + " ")}</b>
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
                  onClick={() => dispatch(getOneStudentAction(item))}
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
