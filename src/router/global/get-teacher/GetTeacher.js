// @ts-nocheck
import React, { memo, useState, useEffect } from "react";
import "./GetTeacher.css";
import { useSelector } from "react-redux";
import { TEACHER_MAJOR } from "../../../static";
import female from "../../../assets/female-icon.webp";
import male from "../../../assets/male-icon.png";
import { Link } from "react-router-dom";
import { AiOutlineEye } from "react-icons/ai";
import EmptyData from "../../../components/empty-data/EmptyData";

function GetTeacher() {
  const teachers = useSelector((s) => s?.getTeachers);
  const [active, setActive] = useState(true);
  const [major, setMajor] = useState("all");
  const [name, setName] = useState("");
  const [filterTeachers, setFilterTeachers] = useState([]);
  const [eye, setEye] = useState(null);

  // console.log(teachers)

  useEffect(() => {
    setMajor("all");
    setFilterTeachers(
      teachers?.filter(
        (i) =>
          i.firstName.toLowerCase().includes(name.toLowerCase()) ||
          i.middleName.toLowerCase().includes(name.toLowerCase()) ||
          i.lastName.toLowerCase().includes(name.toLowerCase())
      )
    );
  }, [name]);

  useEffect(() => {
    if (major === "all") {
      return setFilterTeachers(teachers?.filter((i) => i.isActive === active));
    }
    setFilterTeachers(
      teachers?.filter(
        (i) =>
          i.isActive === active &&
          major === i.major &&
          i.firstName.toLowerCase().includes(name.toLowerCase()) &&
          i.lastName.toLowerCase().includes(name.toLowerCase())
      )
    );
  }, [teachers, active, major]);

  return (
    <div>
      <div className="get__navbar">
        <h3>O'qituvchilar</h3>
        <ul className="get__collection">
          <li
            onClick={() => setActive(true)}
            className={`get__item ${active ? "get__item-active" : ""}`}
          >
            O'qituvchilar{" "}
            <span>{teachers?.allTeachersIsActive(true)?.length}</span>
          </li>
          <li
            onClick={() => setActive(false)}
            className={`get__item ${active ? "" : "get__item-active"}`}
          >
            Ishdan Ketgan O'qituvchilar{" "}
            <span>{teachers?.allTeachersIsActive(false)?.length}</span>
          </li>
        </ul>
      </div>
      <div className="get__controller">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          type="text"
          placeholder="O'qituvchi FISH..."
        />
        <select onChange={(e) => setMajor(e.target.value)} name="" id="">
          <option value="all">Barcha yo'nalishlar</option>
          {TEACHER_MAJOR?.map((i, inx) => (
            <option key={inx} value={i}>
              {i.toUpperCase()}
            </option>
          ))}
        </select>
      </div>
      <div className="get__teacher-container">
        {filterTeachers?.map((item) => {
          let {
            birthYear,
            firstName,
            gender,
            lastName,
            major,
            middleName,
            password,
            region,
            tel,
            username,
            _id,
            groups,
          } = item;
          return (
            <div key={_id} className="get__teacher-card">
              <div className="get__teacher-cardHead">
                <img src={gender === "male" ? male : female} alt="" />
                <div>
                  <h4>
                      {lastName} {firstName} {middleName}
                  </h4>
                  <p>
                    Fan: <b>{major?.capitalLetter()}</b>
                  </p>
                  <p>
                    Manzil: <b>{region?.capitalLetter()}</b>
                  </p>
                  <p>
                    Tug'ilgan sana: <b>{birthYear}</b>
                  </p>
                </div>
              </div>
              <div className="get__teacher-cardBody">
                <p>
                  Tel: <b>{tel?.map((i) => i + " ")}</b>
                </p>
                <p>
                  Guruhlar: <b>{groups?.length} ta</b>
                </p>
                <p>
                  Username: <b>{username}</b>
                </p>
                <p>
                  Parol:{" "}
                  <b>
                    {eye === _id ? password : "*".repeat(password?.length)}
                    <AiOutlineEye
                      className="get__teacher-eye"
                      onClick={() => setEye(!eye ? _id : null)}
                    />{" "}
                  </b>
                </p>
                <div className="get__student-btn">
                  <Link to={item?._id}>
                    <button>Batafsil</button>
                  </Link>
                </div>
              </div>
            </div>
          );
        })}

        {!filterTeachers?.length && (
          <EmptyData text={"O'qituvchilar topilmadi"} />
        )}
      </div>
    </div>
  );
}

export default memo(GetTeacher);
