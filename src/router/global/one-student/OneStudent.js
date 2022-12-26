// @ts-nocheck
import React, { memo, useState, useEffect } from "react";
import "./OneStudent.css";
import axios from "../../../api";
import { useFetch } from "../../../hooks/useFetch";
import { useParams, Link, useLocation, useNavigate } from "react-router-dom";
// import {
//   reloadTeacherAction,
//   reloadGroupAction,
// } from "../../../context/action/action";
import male from "../../../assets/male-icon.png";
import female from "../../../assets/female-icon.webp";
import Skeleton from "../../../components/skeleton/Skeleton";
import AddStudentToGroup from "../../../components/add-student-to-group/AddStudentToGroup";

import { regions, times, days, genders } from "../../../static";
import ShowingEnteredNumbers from "../../../components/register-student-comp/ShowingEnteredNumbers";

const initializeData = {
  _id: "63a92a30b141665b89177aeb",
  firstName: "Abdulaziz",
  lastName: "Shuhratov",
  middleName: "Xusanboy ugli",
  birthYear: 2011,
  region: "namangan shahar",
  startedDate: "2022-12-26T04:58:35.246Z",
  tel: ["+998911234567"],
  gender: "male",
  aboutUs: "",
  wantedCourse: "it, matematika",
  wantedDay: "M/W/F",
  wantedTime: "10:00/12:00",
  monthlyPayment: [],
  isActive: false,
  isEnd: false,
  enrolledCourses: [
    {
      room: {
        number: "",
        note: "",
      },
      _id: "",
      teacherInfo: {
        _id: "",
        username: "_",
        password: "_",
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
      },
      name: "",
      major: "",
      level: "",
      day: "",
      time: "",
      firstLesson: "",
      expectedExamDay: "",
      enrolledStudents: [],
      isActive: false,
      coursePrice: 0,
    },
  ],
};

function OneStudent() {
  const [oneId, setOneId] = useState(null);
  const [courses, setCourses] = useState([]);
  const navigate = useNavigate();

  let { id } = useParams();
  const { pathname } = useLocation();
  const [innerReload, setInnerReload] = useState(false);
  const { data: student } = useFetch(`/api/students/${id}`, innerReload);
  const [one, setOne] = useState(initializeData);

  // news By Zokirkhon
  const [areInputsDisabled, setAreInputsDisabled] = useState(true);
  const [tempPhoneNumber, setTempPhoneNumber] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // console.log(student);

  // console.log(courses);
  useEffect(() => {
    setOne(student);
    setCourses(student?.enrolledCourses?.map((el) => el._id));
  }, [student]);
  if (!one) {
    return <Skeleton title={"O'quvchi haqida batafsil ma'lumot"} />;
  }
  // console.log(one);

  const handleChange = ({ target: t }) => {
    let key = t.getAttribute("name");
    let newFormData = structuredClone(one);

    if (key === "birthYear") {
      newFormData[key] = +t.value.replace(/\D/g, "");
    } else {
      newFormData[key] = t.value;
    }
    setOne(newFormData);
  };

  const handleAddTelNumToArrOfData = () => {
    if (!tempPhoneNumber) return null;
    let newFormData = structuredClone(one);
    if (newFormData.tel.includes(tempPhoneNumber)) {
      return alert("bu telefon raqamni kiritdingiz");
    }
    newFormData.tel.push(tempPhoneNumber);
    setTempPhoneNumber("");
    setOne(newFormData);
  };

  const handleActiveStatusAndUpdateData = () => {
    console.log(one);
    if (areInputsDisabled) {
      setAreInputsDisabled((e) => !e);
    } else {
      setIsLoading(true);
      axios
        .patch(`/api/students/${one?._id}`, one)
        .then(({ data }) => {
          console.log(data);
          setInnerReload((e) => !e);
          setAreInputsDisabled((e) => !e);
        })
        .catch((err) => {
          console.log(err?.data);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  };
  return (
    <div className="one__student">
      <button onClick={() => navigate(-1)} className="backBtn">
        <b>&#10140;</b>
        <span>Orqaga</span>
      </button>
      <h2 className="one__student-title">O'quvchi haqida batafsil ma'lumot</h2>
      <div className="one__student-head">
        <img src={one?.gender === "male" ? male : female} alt="" />
        <div>
          <p>
            <span>Ism: </span>
            <input
              onChange={handleChange}
              className="one__student-input"
              name="firstName"
              id="firstName"
              disabled={areInputsDisabled}
              value={one?.firstName}
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
              value={one?.lastName}
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
              value={one?.middleName}
              required
              autoComplete="off"
            />
          </p>
          <p>
            <span>Manzil:</span>
            <select
              className="one__student-select"
              onChange={handleChange}
              title="Hududingizni tanlang"
              disabled={areInputsDisabled}
              defaultValue={one?.region}
              name="region"
              id="region"
              required
            >
              <option disabled={true} value="">
                tanlang
              </option>
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
              className="one__student-input"
              onChange={handleChange}
              value={one?.birthYear}
              disabled={areInputsDisabled}
              type="string"
              name="birthYear"
              id="birthYear"
              required
              autoComplete="off"
            />
          </p>
          <div>
            {<ShowingEnteredNumbers data={one} setData={setOne} />}
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
          <p>
            <span>Jinsi:</span>
            <select
              disabled={areInputsDisabled}
              className="one__student-select"
              onChange={handleChange}
              defaultValue={one?.gender}
              name="gender"
              id="gender"
              required
            >
              <option disabled={true} value="">
                tanlang
              </option>
              {genders.map((el, idx) => (
                <option key={idx} title={el.en} value={el.en}>
                  {el.uz.capitalLetter()}
                </option>
              ))}
            </select>
          </p>
          <hr className="hr" />
          <b className="one__student-special">O'quvchi hohlagan</b>
          {one?.wantedCourse ? (
            <p>
              <span>Kurslari:</span>
              <input
                type="text"
                disabled={areInputsDisabled}
                className="one__student-input"
                onChange={handleChange}
                style={{ textTransform: "uppercase" }}
                value={one?.wantedCourse}
                name="wantedCourse"
                id="wantedCourse"
                required
              />
            </p>
          ) : (
            ""
          )}
          {one?.wantedDay ? (
            <>
              <p>
                <span>Kuni:</span>
                <select
                  disabled={areInputsDisabled}
                  className="one__student-select"
                  onChange={handleChange}
                  defaultValue={one?.wantedDay}
                  name="wantedDay"
                  id="wantedDay"
                  required
                >
                  <option disabled={true} value="">
                    tanlang
                  </option>
                  {days.map((el, idx) => (
                    <option key={idx} title={el} value={el}>
                      {el.toUpperCase()}
                    </option>
                  ))}
                </select>{" "}
              </p>
              <p>
                <span>Vaqti:</span>
                <select
                  disabled={areInputsDisabled}
                  className="one__student-select"
                  onChange={handleChange}
                  defaultValue={one?.wantedTime}
                  name="wantedTime"
                  id="wantedTime"
                  required
                >
                  <option disabled={true} value="">
                    tanlang
                  </option>
                  {times.map((el, idx) => (
                    <option key={idx} title={el} value={el}>
                      {el.toUpperCase()}
                    </option>
                  ))}
                </select>
              </p>
            </>
          ) : (
            ""
          )}
          <p>
            <span>Biz haqimizda:</span>
            <textarea
              disabled={areInputsDisabled}
              className="one__student-textarea"
              rows="4"
              cols="50"
              onChange={handleChange}
              value={one?.aboutUs}
              type="text"
              name="aboutUs"
              id="aboutUs"
              autoComplete="off"
            ></textarea>
          </p>
          <br />
          <button
            disabled={isLoading}
            title={areInputsDisabled ? "O'zgartirish" : "Ma'lumotlarni saqlash"}
            onClick={handleActiveStatusAndUpdateData}
            className="btn-py"
          >
            {areInputsDisabled ? "O'zgartirish" : "Ma'lumotlarni saqlash"}
          </button>
          <button
            title={
              areInputsDisabled
                ? "Guruhga qo'shish"
                : "Iltimos birinchi ma'lumotlarni saqlang"
            }
            disabled={!areInputsDisabled}
            style={{ marginLeft: "8px" }}
            onClick={() => setOneId(one?._id)}
            className="btn-py"
          >
            Guruhga qo'shish
          </button>
          <button
            title={
              areInputsDisabled
                ? "O'chirib yuborish"
                : "Iltimos birinchi ma'lumotlarni saqlang"
            }
            disabled={!areInputsDisabled}
            style={{ marginLeft: "8px" }}
            className="btn-danger"
          >
            O'chirib yuborish
          </button>
        </div>
      </div>
      <h2 className="one__student-title">O'quvchi tahsil olayotgan guruhlar</h2>
      <div className="one__student-group">
        {!one?.enrolledCourses.length ? (
          <p style={{ color: "crimson" }}>Hali guruhlarga qo'shilmagan</p>
        ) : (
          <></>
        )}
        {one?.enrolledCourses?.map((item, inx) => (
          <div key={inx} className="one__student-card">
            <span>{inx + 1}.</span>
            <div className="one__student-item">
              <b>Fan</b>
              <p>{item?.major}</p>
              <p>{item?.level}</p>
            </div>
            <div className="one__student-item">
              <b>Kun vaqti</b>
              <p>{item?.day}</p>
              <p>{item?.time}</p>
            </div>
            <div className="one__student-item" style={{ flex: 1 }}>
              <Link
                to={`${pathname.pathnameFormat()}/get-teacher/${
                  item?.teacherInfo?._id
                }`}
              >
                <>
                  <b>O'qituvchi</b>
                  <p>{item?.teacherInfo?.lastName}</p>
                  <p>{item?.teacherInfo?.firstName}</p>
                </>
              </Link>
            </div>
            <Link to={`${pathname.pathnameFormat(3)}/get-group/${item._id}`}>
              <button className="btn-py">Batafsil</button>
            </Link>
          </div>
        ))}
      </div>
      <AddStudentToGroup
        id={oneId}
        setId={setOneId}
        courses={courses}
        setCourses={setCourses}
      />
    </div>
  );
}

export default memo(OneStudent);
