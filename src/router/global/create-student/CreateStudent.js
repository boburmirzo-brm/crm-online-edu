import React, { memo } from "react";
import RegisterStudentComp from "../../../components/register-student-comp/RegisterStudentComp";

function CreateStudent() {
  return (
    <div className="global__router">
       <div className="get__navbar get__group-navbar">
        <h3>O'quvchini ro'yxatga olish</h3>
      </div>
      <RegisterStudentComp isReceptionist={true} />
    </div>
  );
}

export default memo(CreateStudent);
