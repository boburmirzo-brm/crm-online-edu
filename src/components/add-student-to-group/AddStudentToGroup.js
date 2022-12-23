import React from "react";
import "./AddStudentToGroup.css";
import GetGroup from "../../router/global/get-group/GetGroup"

function AddStudentToGroup({ id, setId }) {
  return id ? (
    <div className="add_studentToGroup">
      <div onClick={()=> setId(null)} className="add_studentToGroup-modal"></div>
      <div className="add_studentToGroup-content">
        <GetGroup addStudent={true} studentID={id}/>
      </div>
    </div>
  ) : (
    <></>
  );
}

export default AddStudentToGroup;
