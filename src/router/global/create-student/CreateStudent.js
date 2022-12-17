import React, { memo } from "react";
import RegisterStudentComp from "../../../components/register-student-comp/RegisterStudentComp";

function CreateStudent() {
  return (
    <div className="global__router">
      <RegisterStudentComp isReceptionist={true} />
    </div>
  );
}

export default memo(CreateStudent);
