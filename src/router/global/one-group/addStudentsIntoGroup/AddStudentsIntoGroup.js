// @ts-nocheck
import React, { useState, memo } from "react";
import "./AddStudentsIntoGroup.css";
import { FiX } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import female from "../../../../assets/female-icon.webp";
import male from "../../../../assets/male-icon.png";
import {
  reloadGroupAction,
  reloadTeacherAction,
  reloadStudentAction,
} from "../../../../context/action/action";
import { getToken } from "../../../../auth/getToken";
import axios from "../../../../api";

const AddStudentsIntoGroup = ({
  groupID,
  enrolledStudents,
  setStudentsModal,
  setInnerReload,
}) => {
  const [deleteUserId, setDeletedUserId] = useState([]);
  let students = useSelector((s) => s?.getStudents);
  const { pathname } = useLocation();
  students = students?.filter(({ _id }) => {
    if (
      enrolledStudents.some((innerEl) =>
        typeof innerEl === "string" ? innerEl === _id : innerEl._id === _id
      )
    ) {
      return false;
    }
    if (deleteUserId.includes(_id)) {
      return false;
    }
    return true;
  });
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  // console.log(students);

  const handleSubmit = (studentID) => {
    let data = { studentID };
    // console.log(data)
    // console.log(typeof data.groupID)
    // console.log(typeof data.studentID)
    if (studentID.length) {
      setIsLoading(true);
      axios
        .patch(`/api/groups/add-student/${groupID}`, data, getToken())
        .then(({ data }) => {
          setDeletedUserId((e) => [...e, studentID]);
          console.log(data);
          setInnerReload((e) => !e);
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
    }
  };
  return (
    <div className="add_student_into_group__main">
      <div className="add_student_into_group__container">
        <div
          onClick={() => setStudentsModal(false)}
          className="add_student_into_group__close_btn"
        >
          <FiX />
        </div>

        <div className="add_student_into_group__students">
          {students?.length ? (
            students.map((item, idx) => {
              const {
                _id: studentId,
                firstName,
                lastName,
                middleName,
                gender,
                birthYear,
                region,
                tel,
              } = item;
              return (
                <div
                  key={studentId}
                  className="add_student_into_group__student"
                >
                  <div className="add_student_into_group__student_img">
                    <img
                      title={[firstName, lastName, middleName].join(" ")}
                      src={gender === "male" ? male : female}
                      alt={[firstName, lastName, middleName].join(" ")}
                    />
                  </div>
                  <div className="add_student_into_group__student_head">
                    <Link
                      to={`${pathname.pathnameFormat()}/get-student/${studentId}`}
                    >
                      <span title={[firstName, lastName, middleName].join(" ")}>
                        {[firstName, lastName, middleName].join(" ")}
                      </span>
                    </Link>
                    <div className="add_student_into_group__student_body">
                      <p title={birthYear}>Tug'ilgan yili: {birthYear}-yil</p>
                      <p title={region.capitalLetter()}>
                        Hudud: {region.capitalLetter()}
                      </p>
                      <p>
                        Telefon raqamlar:{" "}
                        {tel.map((number, index) => (
                          <span key={index} title={number}>
                            {number}
                          </span>
                        ))}
                      </p>
                    </div>
                    <div className="add_student_into_group__student_btns">
                      <button
                        onClick={() => handleSubmit(studentId)}
                        disabled={isLoading}
                        title={`Guruhga ${firstName} ${lastName} ni qo'shish`}
                      >
                        Guruhga Qo'shish
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <h4>O'quvchilar mavjud emas!</h4>
          )}
        </div>
      </div>
      <div
        onClick={() => setStudentsModal(false)}
        className="add_student_into_group__shadow"
      ></div>
    </div>
  );
};

export default memo(AddStudentsIntoGroup);
