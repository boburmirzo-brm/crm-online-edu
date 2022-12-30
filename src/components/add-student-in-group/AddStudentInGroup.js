import React from "react";
import "./AddStudentInGroup.css";
import GetStudent from "../../router/global/get-student/GetStudent";

const AddStudentInGroup = ({ id, setId, students, setStudents }) => {
  return id ? (
    <div className="add_studentInGroup">
      <div
        onClick={() => {
          setId(null);
          setStudents && setStudents([]);
        }}
        className="add_studentInGroup-modal"
      ></div>
      <div className="add_studentInGroup-content">
        <GetStudent
          addStudentInGroup={true}
          groupIdInGroup={id}
          studentsInGroup={students}
        />
      </div>
    </div>
  ) : (
    <></>
  );
};

export default AddStudentInGroup;
