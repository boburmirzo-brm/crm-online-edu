// @ts-nocheck
import React, { memo } from "react";
import { BsTrash } from "react-icons/bs";

const ShowingEnteredNumbers = ({ data, setData, notDelete }) => {
  return (
    <div className="showingEnteredNumbers">
      {<span>Tel: </span>}
      {data.tel.map((el, idx) => (
        <span
          title={
            notDelete ? el : `shu raqam( ${el} ) ni o'chirishni xohlaysizmi?`
          }
          className={notDelete ? "" : "regStu__deleteNumber "}
          onClick={() => {
            if (notDelete) {
              return null;
            }
            let confirm = window.confirm(
              `shu raqam( ${el} ) ni o'chirmoqchimisiz?`
            );
            if (confirm) {
              let copyData = { ...data };
              copyData.tel = copyData.tel.filter((e) => el !== e);
              setData(copyData);
            }
          }}
          key={idx}
        >
          {el} <BsTrash />
        </span>
      ))}
    </div>
  );
};

export default memo(ShowingEnteredNumbers);
