import React, {memo} from "react";

const ShowingEnteredNumbers = ({ data, setData }) => {
  return data.tel.length ? (
    <div>
      Sizning telefon ramalaringiz:{" "}
      {data.tel.map((el, idx) => (
        <span
          title={`shu raqam( ${idx} ) ni o'chirishni xohlaysizmi?`}
          className="regStu__deleteNumber"
          onClick={() => {
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
          {el},{" "}
        </span>
      ))}
    </div>
  ) : (
    ""
  );
};

export default memo(ShowingEnteredNumbers);
