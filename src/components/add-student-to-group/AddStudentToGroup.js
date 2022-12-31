import React from "react";
import "./AddStudentToGroup.css";
import GetGroup from "../../router/global/get-group/GetGroup";

function AddStudentToGroup({ id, setId, courses, setCourses }) {
  return id ? (
    <div className="add_studentToGroup">
      <div
        onClick={() => {
          setId(null);
          setCourses([]);
        }}
        className="add_studentToGroup-modal"
      ></div>
      <div className="add_studentToGroup-content">
        <GetGroup addStudent={true} studentID={id} courses={courses} setClose={setId} setCourses={setCourses}/>
      </div>
    </div>
  ) : (
    <></>
  );
}

export default AddStudentToGroup;
