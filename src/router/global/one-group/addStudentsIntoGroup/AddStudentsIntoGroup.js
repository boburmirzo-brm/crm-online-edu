// @ts-nocheck
import React, { useState, memo } from "react";
import "./AddStudentsIntoGroup.css";
import { FiX } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import female from "../../../../assets/female-icon.webp";
import male from "../../../../assets/male-icon.png";
import { getOneGroupAction } from "../../../../context/action/action";
import axios from "../../../../api";

const AddStudentsIntoGroup = ({
  group,
  groupID,
  enrolledStudents,
  setStudentsModal,
}) => {
  const [deleteUserId, setDeletedUserId] = useState("");
  let students = useSelector((s) => s?.getStudents);
  students = students?.filter(({ _id }) => {
    if (enrolledStudents.includes(_id)) {
      return false;
    }
    if (deleteUserId === _id) {
      return false;
    }
    return true;
  });
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  // console.log(students);

  const handleSubmit = (studentID) => {
    let data = { groupID, studentID };
    if (studentID.length) {
      setIsLoading(true);
      axios
        .patch("/api/groups/student-add", data)
        .then(({ data }) => {
          setDeletedUserId(studentID);
          console.log(data);
          dispatch(getOneGroupAction(group));
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
          {students?.map(
            (
              {
                _id: studentId,
                firstName,
                lastName,
                middleName,
                gender,
                birthYear,
                region,
                tel,
              },
              idx
            ) => (
              <div key={studentId} className="add_student_into_group__student">
                <div className="add_student_into_group__student_img">
                  <img
                    title={[firstName, lastName, middleName].join(" ")}
                    src={gender === "male" ? male : female}
                    alt={[firstName, lastName, middleName].join(" ")}
                  />
                </div>
                <div className="add_student_into_group__student_head">
                  <p title={[firstName, lastName, middleName].join(" ")}>
                    {[firstName, lastName, middleName].join(" ")}
                  </p>
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
            )
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
