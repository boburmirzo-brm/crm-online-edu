// @ts-nocheck
import React, { memo } from "react";
import { useSelector } from "react-redux";

const OneGroup = () => {
  const oneGroup = useSelector((s) => s?.getOneGroup);
  console.log(oneGroup);

  return (
    <div className="global__router">
      <h3 className="global__title">Guruh haqida batafsil ma'lumotlar</h3>
      <h3>{oneGroup?.major} {oneGroup?.level}</h3>
    </div>
  );
};

export default memo(OneGroup);
