import React from "react";
import "./RegisterStudent.css";
import RegisterStudentComp from "../../components/register-student-comp/RegisterStudentComp";

function RegisterStudent() {
  return (
    <div className="regStuRoute_Container">
      <RegisterStudentComp isReceptionist={false} />
    </div>
  );
}

export default RegisterStudent;
