// @ts-nocheck
import React, { useState, memo, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {
  getOneGroupAction,
  reloadTeacherAction,
  reloadAction,
} from "../../../context/action/action";
import "./GetGroup.css";
import { TEACHER_MAJOR } from "../../../static/index";

// images
import bugalteriya from "../../../assets/Bug'alteriya.jpg";
import dtmTest from "../../../assets/DTM ga tayyorgarlik.jpg";
import english from "../../../assets/english.jpg";
import it from "../../../assets/it.jpg";
import matematika from "../../../assets/matematika.jpg";
import russia from "../../../assets/russia.jpg";
import english_kids from "../../../assets/english_kids.jpg";
import russia_kids from "../../../assets/russia_kids.jpg";

function GetGroup({ addStudent, studentID }) {
  const groups = useSelector((s) => s?.getGroups);
  // console.log(groups)
  const teachers = useSelector((s) => s?.getTeachers);
  const dispatch = useDispatch();
  const [active, setActive] = useState(false);
  const [type, setType] = useState("all");
  const [filterData, setFilterData] = useState([]);

  useEffect(() => {
    if (type === "all") {
      return setFilterData(groups.filter((i) => i.isActive === active));
    }
    setFilterData(
      groups.filter((i) => i.major === type && i.isActive === active)
    );
  }, [type, groups, active]);

  // console.log(filterData);

  const [images] = useState({
    it,
    russia,
    english,
    matematika,
    dtmTest,
    bugalteriya,
    english_kids,
    russia_kids,
  });
  const addStudentThisGroup = (groupId) => {
    let data = { groupID: groupId, studentID };
    console.log(data);
  };
  return (
    <div className="global__router">
      <div className="get__navbar">
        <h3>Guruhlar</h3>
        <ul className="get__collection">
          <li
            onClick={() => setActive(false)}
            className={`get__item ${active ? "" : "get__item-active"}`}
          >
            Yangi Guruhlar{" "}
            <span>{groups?.filter((el) => el.isActive === false).length}</span>
          </li>
          <li
            onClick={() => setActive(true)}
            className={`get__item ${active ? "get__item-active" : ""}`}
          >
            Aktiv Guruhlar{" "}
            <span>{groups?.filter((el) => el.isActive === true).length}</span>
          </li>
        </ul>
      </div>
      <div className="get__controller">
        <ul className="get__controller-collection">
          <li
            onClick={() => setType("all")}
            className={`get__controller-item ${
              type === "all" ? "get__controller-active" : ""
            }`}
          >
            Barchasi{" "}
            <span>{groups?.filter((el) => el.isActive === active).length}</span>
          </li>
          {TEACHER_MAJOR?.map((i, inx) => (
            <li
              key={inx}
              onClick={() => setType(i)}
              className={`get__controller-item ${
                type === i ? "get__controller-active" : ""
              } `}
            >
              {i}{" "}
              <span>
                {
                  groups?.filter(
                    (el) => el.major === i && el.isActive === active
                  ).length
                }
              </span>
            </li>
          ))}
        </ul>
      </div>
      <div className="get__group-container">
        {filterData?.length ? (
          filterData?.map((item) => {
            const {
              _id: groupId,
              major,
              level,
              teacherInfo,
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
                    {teachers?.reduce((a, c) => {
                      if (c._id === teacherInfo._id) {
                        a = c.firstName + " " + c.lastName;
                      }
                      return a;
                    }, "")}
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
                <hr className="hr" />
                {addStudent ? (
                  <>
                    <br />
                    <button
                      onClick={() => addStudentThisGroup(groupId)}
                      className="btn-py"
                    >
                      Guruhga qo'shish
                    </button>
                  </>
                ) : (
                  <div className="get__group-btn">
                    <Link
                      onClick={() => dispatch(getOneGroupAction(item))}
                      to={groupId}
                    >
                      <button>Batafsil</button>
                    </Link>
                    <button style={{ background: "crimson" }}>O'chirish</button>
                  </div>
                )}
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
