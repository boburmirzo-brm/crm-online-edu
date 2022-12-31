// @ts-nocheck
import React, { memo, useEffect, useState } from "react";
import "./OneTeacher.css";
import axios from "../../../api";
import { useFetch } from "../../../hooks/useFetch";
import { useParams, Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  reloadTeacherAction,
  reloadGroupAction,
} from "../../../context/action/action";
import male from "../../../assets/male-icon.png";
import female from "../../../assets/female-icon.webp";
import Skeleton from "../../../components/skeleton/Skeleton";
import { AiOutlineEye } from "react-icons/ai";
import { TEACHER_MAJOR, regions, genders } from "../../../static";
import ShowingEnteredNumbers from "../../../components/register-student-comp/ShowingEnteredNumbers";

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
  const dispatch = useDispatch();
  const [innerReload, setInnerReload] = useState(false);

  // zokirkhon
  const [showPassword, setShowPassword] = useState(false);
  const [areInputsDisabled, setAreInputsDisabled] = useState(true);
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
    // console.log(data);
    if (areInputsDisabled) {
      setAreInputsDisabled(false);
      setShowPassword(true);
    } else {
      console.log("update qilish kerak");
      setAreInputsDisabled(true);
      setShowPassword(false);
      setIsLoading(true);
      axios
        .patch(`/api/teachers/${data?._id}`, data)
        .then(({ data }) => {
          console.log(data);
          setAreInputsDisabled(true);
          setInnerReload((e) => !e);
          dispatch(reloadTeacherAction());
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  };

  const handleDeleteTeacher = () => {
    if (
      window.confirm(
        `${data?.firstName} ${data?.lastName} ni o'chirmoqchimisiz?`
      )
    ) {
      setIsLoading(true);
      axios
        .delete(`/api/teachers/${data?._id}`)
        .then(({ data }) => {
          console.log(data);
          dispatch(reloadTeacherAction());
          navigate(`${pathname.pathnameFormat()}/get-teacher`);
        })
        .catch(({ response: { data } }) => {
          console.log(data);
        })
        .finally(() => {
          setIsLoading(false);
        });
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
        <img
          src={gender === "male" ? male : female}
          alt={`${firstName} ${lastName}`}
          title={`${firstName} ${lastName}`}
        />
        <div>
          <p>
            <span>Ism: </span>
            <input
              onChange={handleChange}
              className="one__student-input"
              name="firstName"
              id="firstName"
              disabled={areInputsDisabled}
              value={firstName}
              required
              autoComplete="off"
            />
          </p>
          <p>
            <span>Familya: </span>
            <input
              onChange={handleChange}
              className="one__student-input"
              name="lastName"
              id="lastName"
              disabled={areInputsDisabled}
              value={lastName}
              required
              autoComplete="off"
            />
          </p>
          <p>
            <span>Otasining ismi: </span>
            <input
              onChange={handleChange}
              className="one__student-input"
              name="middleName"
              id="middleName"
              disabled={areInputsDisabled}
              value={middleName}
              required
              autoComplete="off"
            />
          </p>
          <p>
            <span>Username:</span>
            <input
              onChange={handleChange}
              className="one__student-input"
              name="username"
              id="username"
              disabled={areInputsDisabled}
              value={username}
              required
              autoComplete="off"
            />
          </p>
          <p>
            <span>Parol:</span>
            <input
              onChange={handleChange}
              className="one__student-input"
              name="password"
              id="password"
              disabled={areInputsDisabled}
              value={showPassword ? password : "*".repeat(password.length)}
              required
              autoComplete="off"
            />
            <AiOutlineEye
              title={
                areInputsDisabled && showPassword
                  ? "parolni yashirish"
                  : areInputsDisabled && !showPassword
                  ? "parolni ko'rish"
                  : "Iltimos birinchi ma'lumotni saqlang"
              }
              className="get__teacher-eye"
              onClick={() => {
                if (areInputsDisabled) {
                  setShowPassword((e) => !e);
                }
              }}
            />
          </p>
          <p>
            <span>Fan: </span>
            <select
              onChange={handleChange}
              defaultValue={major}
              className="one__student-select"
              name="major"
              disabled={areInputsDisabled}
              id="major"
              required
            >
              <option value="">tanlang</option>
              {TEACHER_MAJOR.map((el, idx) => {
                return (
                  <option key={idx} title={el} value={el}>
                    {el.capitalLetter()}
                  </option>
                );
              })}
            </select>
          </p>
          <p>
            <span>Manzil:</span>
            <select
              onChange={handleChange}
              title="Hududni tanlang"
              defaultValue={region}
              className="one__student-select"
              disabled={areInputsDisabled}
              name="region"
              id="region"
              required
            >
              <option value="">tanlang</option>
              {regions.map((el, idx) => (
                <option key={idx} title={el} value={el}>
                  {el.capitalLetter()}
                </option>
              ))}
            </select>
          </p>
          <p>
            <span>Tug'ilgan yil:</span>
            <input
              onChange={handleChange}
              value={birthYear}
              className="one__student-input"
              disabled={areInputsDisabled}
              title="Tug'ilgan yilingizni kiriting"
              type="text"
              name="birthYear"
              id="birthYear"
              minLength={4}
              maxLength={4}
              required
              autoComplete="off"
            />
          </p>
          <p>
            <span>Jinsi: </span>
            <select
              onChange={handleChange}
              className="one__student-select"
              disabled={areInputsDisabled}
              defaultValue={gender}
              name="gender"
              id="gender"
              required
            >
              <option value="">tanlang</option>
              {genders.map((el, idx) => (
                <option key={idx} title={el.en} value={el.en}>
                  {el.uz.capitalLetter()}
                </option>
              ))}
            </select>
          </p>
          <div className="one__teacher-special">
            {
              <ShowingEnteredNumbers
                data={data}
                notDelete={areInputsDisabled}
                setData={setData}
              />
            }
            {areInputsDisabled ? (
              ""
            ) : (
              <span>
                <input
                  className="one__student-input"
                  disabled={areInputsDisabled}
                  onChange={(e) => setTempPhoneNumber(e.target.value)}
                  value={tempPhoneNumber}
                  placeholder="Telefon raqam"
                  type="text"
                  autoComplete="off"
                />
                <button
                  disabled={areInputsDisabled}
                  className="btn-py"
                  onClick={handleAddTelNumToArrOfData}
                  type="button"
                >
                  Telefon raqam qo'shish
                </button>
              </span>
            )}
          </div>

          <br />
          <button
            disabled={isLoading}
            className="btn-py"
            onClick={handleToggleAndUpdateData}
          >
            {areInputsDisabled ? "O'zgartirish" : "Ma'lumotlarni saqlash"}
          </button>
          {!groups.length && (
            <button
              onClick={handleDeleteTeacher}
              disabled={isLoading || !areInputsDisabled}
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
