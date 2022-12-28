// @ts-nocheck
import React, { memo } from "react";

const ShowingEnteredNumbers = ({ data, setData, notDelete }) => {
  return  (
    <div className="showingEnteredNumbers">
      {
        notDelete? <span>Tel: </span> : "Sizning telefon ramalaringiz:"
      }
      {data.tel.map((el, idx) => (
        <span
          title={`shu raqam( ${el} ) ni o'chirishni xohlaysizmi?`}
          className={notDelete ? "":"regStu__deleteNumber " }
          onClick={() => {
            if(notDelete){return null}
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
        >{el},{" "}
        </span>
      ))}
      {
        !data.tel.length && <i>Tel kiritilmagan</i>
      }
    </div>
  ) ;
};

export default memo(ShowingEnteredNumbers);
