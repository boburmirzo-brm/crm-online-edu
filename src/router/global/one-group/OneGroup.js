// @ts-nocheck
import React, { useState, memo } from "react";
import "./OneGroup.css";
import { useSelector } from "react-redux";

import bugalteriya from "../../../assets/Bug'alteriya.jpg";
import dtmTest from "../../../assets/DTM ga tayyorgarlik.jpg";
import english from "../../../assets/english.jpg";
import it from "../../../assets/it.jpg";
import matematika from "../../../assets/matematika.jpg";
import russia from "../../../assets/russia.jpg";

const OneGroup = () => {
  const oneGroup = useSelector((s) => s?.getOneGroup);
  const students = useSelector((s) => s?.getStudents);
  console.log(oneGroup);

  const [images] = useState({
    it: it,
    russia: russia,
    english: english,
    matematika: matematika,
    "DTM ga tayyorgarlik": dtmTest,
    "Bug'alteriya": bugalteriya,
  });

  return (
    <div className="global__router">
      <h3 className="global__title">Guruh haqida batafsil ma'lumotlar</h3>

      <div className="get__group-container">
        <div className="get__OneGroup-main">
          {Object.keys(oneGroup)?.length ? (
            <div>
              <img
                src={images[oneGroup.major]}
                alt={oneGroup.major + " " + oneGroup.level}
              />
              <h3>
                {oneGroup.major.capitalLetter()} {oneGroup.level}
              </h3>
              <hr />
              <p>
                O'qituvchi:{" "}
                <b>
                  {oneGroup.teacherInfo.firstName}{" "}
                  {oneGroup.teacherInfo.lastName}
                </b>
              </p>
              <p>
                Yo'nalish: <b>{oneGroup.major.toUpperCase()}</b>
              </p>
              <p>
                Guruh xona: <b>{oneGroup.room.number}-xona</b>
              </p>
              <p>
                Kurs kunlari:{" "}
                <b>
                  <i>{oneGroup.day}</i>
                </b>
              </p>
              <p>
                Vaqt:{" "}
                <b>
                  <i>{oneGroup.time}</i>
                </b>
              </p>
              <p>
                Kurs boshlangan sana:{" "}
                <b>{oneGroup.firstLesson || "boshlanmagan"}</b>
              </p>
              <p>
                Taxminiy Imtixon sanasi:{" "}
                <b>{oneGroup.expectedExamDay || "Kiritilmagan"}</b>
              </p>
              <p>
                Xona raqami: <b>{oneGroup.room.number}-xona</b>{" "}
                <b>{oneGroup.room.note}</b>
              </p>
              <p>
                Kurs holati:{" "}
                <b>{oneGroup.isActive ? "aktiv" : "aktiv emas"} </b>
                <span className="get__oneGroup_btns">
                  <button style={{ background: "green" }}>
                    Faollashtirish
                  </button>
                  <button style={{ background: "red" }}>
                    Kursni to'xtatish
                  </button>
                </span>
              </p>
              <button className="get__oneGroup_btn_add">
                Guruhga O'quvchi qo'shish
              </button>
            </div>
          ) : (
            "Yuklanyapti"
          )}
          <div>
            <p className="get__oneGroup_students_title">
              O'quvchilar soni: <b>{students?.length} ta</b>
            </p>
            {students?.map((student, idx) => (
              <p className="get__oneGroup_eachStudent" key={idx}>
                <p>
                  <b>{idx + 1}</b>. <i>Ismi</i>: <b>{student.firstName}</b>
                </p>
                <p>
                  <i>Familyasi</i>: <b>{student.lastName}</b>
                </p>
                <p>
                  <i>Otasining ismi</i>: <b>{student.middleName}</b>
                </p>
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(OneGroup);
