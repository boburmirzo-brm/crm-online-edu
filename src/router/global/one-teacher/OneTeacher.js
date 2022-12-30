// @ts-nocheck
import React, { memo, useEffect, useState } from "react";
import "./OneTeacher.css";
import axios from "../../../api";
import { useFetch } from "../../../hooks/useFetch";
import { useParams, Link, useLocation, useNavigate } from "react-router-dom";
import {
  reloadTeacherAction,
  reloadGroupAction,
} from "../../../context/action/action";
import male from "../../../assets/male-icon.png";
import female from "../../../assets/female-icon.webp";
import Skeleton from "../../../components/skeleton/Skeleton";
import { AiOutlineEye } from "react-icons/ai";

const initializeData = {
  _id: "",
  username: "",
  password: "",
  createdAt: "",
  firstName: "",
  lastName: "",
  middleName: "",
  tel: [],
  region: "",
  birthYear: 0,
  gender: "",
  groups: [],
  allStudents: 0,
  monthlySalaries: [],
  major: "",
  isActive: true,
  isTeacher: true,
  isAdmin: false,
  isReceptionist: false,
  isAccounter: false,
  isOwner: false,
};

function OneTeacher() {
  let { id } = useParams();
  const [innerReload, setInnerReload] = useState(false);
  // zokirkhon
  const [showPassword, setShowPassword] = useState(false);
  const [areInputsDisabled, setAreInputsDisabled] = useState(false);
  const [tempPhoneNumber, setTempPhoneNumber] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const { data: teacher } = useFetch(`/api/teachers/${id}`, innerReload);
  const [data, setData] = useState(initializeData);
  const { pathname } = useLocation();
  useEffect(() => setData(teacher), [teacher]);

  const handleChange = ({ target: t }) => {
    let key = t.getAttribute("name");
    let newFormData = structuredClone(data);

    if (key === "birthYear") {
      newFormData[key] = +t.value.replace(/\D/g, "");
    } else {
      newFormData[key] = t.value;
    }
    setData(newFormData);
  };

  const handleAddTelNumToArrOfData = () => {
    if (!tempPhoneNumber) return null;
    let newFormData = structuredClone(data);
    if (newFormData.tel.includes(tempPhoneNumber)) {
      return alert("bu telefon raqamni kiritdingiz");
    }
    newFormData.tel.push(tempPhoneNumber);
    setTempPhoneNumber("");
    setData(newFormData);
  };

  const handleToggleAndUpdateData = () => {
    console.log(data);
    if (!areInputsDisabled) {
      setAreInputsDisabled(true);
    } else {
      console.log("update qilish kerak");
      setAreInputsDisabled(false);
      setIsLoading(true);
      // axios
      //   .patch(`/api/students/${one?._id}`, one)
      //   .then(({ data }) => {
      //     console.log(data);
      //     setInnerReload((e) => !e);
      //     setAreInputsDisabled((e) => !e);
      //     dispatch(reloadTeacherAction());
      //   })
      //   .catch((err) => {
      //     console.log(err?.data);
      //   })
      //   .finally(() => {
      //     setIsLoading(false);
      //   });
    }
  };

  // console.log(data);

  if (!data) {
    return <Skeleton title={"O'qituvchi haqida batafsil ma'lumot"} />;
  }
  let {
    birthYear,
    firstName,
    gender,
    groups,
    lastName,
    major,
    middleName,
    password,
    region,
    tel,
    username,
  } = data;
  return (
    <div className="one__teacher">
      <button onClick={() => navigate(-1)} className="backBtn">
        <b>&#10140;</b>
        <span>Orqaga</span>
      </button>
      <h2 className="one__student-title">
        O'qituvchi haqida batafsil ma'lumot
      </h2>
      <div className="one__student-head">
        <img src={gender === "male" ? male : female} alt="" />
        <div>
          <p>
            <span>FISH: </span>
            <b>
              {lastName} {firstName} {middleName}
            </b>
          </p>
          <p>
            <span>Fan: </span>
            <b>{major.toUpperCase()}</b>
          </p>
          <p>
            <span>Manzil:</span>
            <b>{region}</b>
          </p>
          <p>
            <span>Tug'ilgan yil:</span>
            <b>{birthYear}</b>
          </p>
          <p>
            <span>Tel:</span>
            <b>{tel.join(" / ")}</b>
          </p>
          <p>
            <span>Username:</span>
            <b>{username}</b>
          </p>
          <p>
            <span>Parol:</span>
            <b>{showPassword ? password : "*".repeat(password.length)} </b>
            <AiOutlineEye
              className="get__teacher-eye"
              onClick={() => setShowPassword((e) => !e)}
            />
          </p>
          <br />
          <button className="btn-py" onClick={handleToggleAndUpdateData}>
            {areInputsDisabled ? "Ma'lumotlarni saqlash" : "O'zgartirish"}
          </button>
          {!groups.length && (
            <button
              disabled={areInputsDisabled}
              style={{ marginLeft: "8px" }}
              className="btn-danger"
            >
              O'chirib yuborish
            </button>
          )}
        </div>
      </div>
      <h2 className="one__student-title">O'qituvchining guruhlari</h2>
      <div className="one__student-group">
        {!groups.length ? (
          <p style={{ color: "crimson" }}>Hali guruhlarga ega emas</p>
        ) : (
          <></>
        )}
        {groups?.map((item, inx) => (
          <div key={inx} className="one__student-card">
            <span>{inx + 1}.</span>
            <div className="one__student-item">
              <b>Fan</b>
              <div>
                <p>{item?.major}</p>
                <p>{item?.level}</p>
              </div>
            </div>
            <div className="one__student-item">
              <b>Kun vaqti</b>
              <div>
                <p>{item?.day}</p>
                <p>{item?.time}</p>
              </div>
            </div>
            <div className="one__student-item">
              <b>Start / Exam</b>
              <div>
                <p>{item?.firstLesson || "26.12.2022"}</p>
                <p>{item?.expectedExamDay || "20.02.2023"}</p>
              </div>
            </div>
            <div className="one__student-item">
              <b>Xona</b>
              <p>{item?.room.number}</p>
            </div>
            <div style={{ flex: 1 }} className="one__student-item">
              <b>O'quvchilar soni</b>
              <p>{item?.enrolledStudents.length}</p>
            </div>
            <Link
              to={`${pathname.pathnameFormat(3)}/get-group/${item._id}`}
              className="one__student-btn"
            >
              <button className="btn-py">Batafsil</button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default memo(OneTeacher);
