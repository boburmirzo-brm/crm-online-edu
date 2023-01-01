import React from "react";
import "./AddStudentInGroup.css";
import GetStudent from "../../router/global/get-student/GetStudent";

const AddStudentInGroup = ({
  id,
  setId,
  students,
  oneGroupReload,
}) => {
  return id ? (
    <div className="add_studentInGroup">
      <div
        onClick={() => {
          setId(null);
        }}
        className="add_studentInGroup-modal"
      ></div>
      <div className="add_studentInGroup-content">
        <GetStudent
          addStudentInGroup={true}
          groupIdInGroup={id}
          studentsInGroup={students}
          setClose={setId}
          oneGroupReload={oneGroupReload}
        />
      </div>
    </div>
  ) : (
    <></>
  );
};

export default AddStudentInGroup;
