// @ts-nocheck
import React, { memo } from "react";
import "./AddStudentsIntoGroup.css";
import { FiX } from "react-icons/fi";
import { useSelector } from "react-redux";
import female from "../../../../assets/female-icon.webp";
import male from "../../../../assets/male-icon.png";

const AddStudentsIntoGroup = ({ groupId, setStudentsModal }) => {
  const students = useSelector((s) => s?.getStudents);
  console.log(students);
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
                    <p title={birthYear}>yil: {birthYear}</p>
                    <p title={region}>hudud: {region}</p>
                    <p>
                      telefon raqamlar:{" "}
                      {tel.map((number, index) => (
                        <span key={index} title={number}>
                          {number}
                        </span>
                      ))}
                    </p>
                  </div>
                  <div className="add_student_into_group__student_btns">
                    <button
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
