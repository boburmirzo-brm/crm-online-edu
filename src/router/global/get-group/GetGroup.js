// @ts-nocheck
import React, { useState, memo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {
  getOneGroupAction,
  reloadAction,
} from "../../../context/action/action";
import "./GetGroup.css";
import bugalteriya from "../../../assets/Bug'alteriya.jpg";
import dtmTest from "../../../assets/DTM ga tayyorgarlik.jpg";
import english from "../../../assets/english.jpg";
import it from "../../../assets/it.jpg";
import matematika from "../../../assets/matematika.jpg";
import russia from "../../../assets/russia.jpg";

function GetGroup() {
  const groups = useSelector((s) => s?.getGroups);
  const dispatch = useDispatch();

  // console.log(groups);
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
      <div className="get__navbar">
        <h3>Guruhlar</h3>
        <ul className="get__collection">
          <li className="get__item get__item-active">
            Yangi Guruhlar <span>{groups?.yangiGuruhlar(false).uzunlik}</span>
          </li>
          <li className="get__item">
            Aktiv Guruhlar <span>{groups?.yangiGuruhlar(true).uzunlik}</span>
          </li>
        </ul>
      </div>
      <div className="get__controller">
        <ul className="get__controller-collection">
          <li className="get__controller-item get__controller-active">
            Barchasi <span>{groups?.yangiGuruhlar(false).uzunlik}</span>
          </li>
          <li className="get__controller-item">
            IT <span>{groups?.yangiGuruhlar(false).majorIt.length}</span>
          </li>
          <li className="get__controller-item">
            English <span>{groups?.yangiGuruhlar(false).majorEnglish.length}</span>
          </li>
          <li className="get__controller-item">
            Russian <span>{groups?.yangiGuruhlar(false).majorRussia.length}</span>
          </li>
          <li className="get__controller-item">
            DTM <span>{groups?.yangiGuruhlar(false).majorDTM.length}</span>
          </li>
          <li className="get__controller-item">
            Bug'alteriya <span>{groups?.yangiGuruhlar(false).majorEconomics.length}</span>
          </li>
          <li className="get__controller-item">
            Matematika <span>{groups?.yangiGuruhlar(false).majorMath.length}</span>
          </li>
        </ul>
      </div>
      <div className="get__group-container">
        {groups?.length ? (
          groups?.map((item) => {
            const {
              _id: groupId,
              major,
              level,
              teacherInfo: { firstName, lastName },
              room: { number },
              enrolledStudents,
              day,
              time,
            } = item;
            return (
              <div className="get__group-card" key={groupId}>
                <img src={images[major]} alt={major + " " + level} />
                <h3>
                  {major.capitalLetter()} {level}
                </h3>
                <p>
                  O'qituvchi:{" "}
                  <b>
                    {firstName} {lastName}
                  </b>
                </p>
                <p>
                  Guruh xona: <b>{number}-xona</b>
                </p>
                <p>
                  O'quvchilar soni: <b>{enrolledStudents.length} ta</b>
                </p>
                <p>
                  Kun: <i>{day}</i>
                </p>
                <p>
                  Vaqt: <i>{time}</i>
                </p>
                {!enrolledStudents.length ? (
                  <span className="get__student-notGroup">
                    O'quvchi guruhga qo'shilmagan
                  </span>
                ) : (
                  ""
                )}
                <hr />
                <div className="get__group-btn">
                  <Link
                    onClick={() => dispatch(getOneGroupAction(item))}
                    to={groupId}
                  >
                    <button>Batafsil</button>
                  </Link>
                  <button style={{ background: "crimson" }}>O'chirish</button>
                </div>
              </div>
            );
          })
        ) : (
          <p>Guruhlar mavjud emas!</p>
        )}
      </div>
    </div>
  );
}

export default memo(GetGroup);
