// @ts-nocheck
/* eslint-disable no-undef */
import React, { useState, memo } from "react";
import "./RegisterStudentComp.css";
import axios from "../../api";
import { regions, times, days, genders, TEACHER_MAJOR } from "../../static";
import ShowingEnteredNumbers from "./ShowingEnteredNumbers";
import Loader from "../../components/loader/Loader";
// import IsOnline from "../deviceInfo/IsOnline";
// import BatteryStatus from "../deviceInfo/BatteryStatus";

function RegisterStudentComp({ isReceptionist }) {
  // const batteryInfo = BatteryStatus();
  // const [isOnline] = IsOnline();
  const [loading, setLoading] = useState(false);
  const [tempPhoneNumber, setTempPhoneNumber] = useState("");
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    middleName: "",
    birthYear: "",
    region: "",
    startedDate: new Date(),
    tel: [],
    gender: "",
    aboutUs: "",
    wantedCourse: "",
    wantedDay: "",
    wantedTime: "",
    monthlyPayment: [],
    isActive: false,
    isEnd: false,
    enrolledCourses: [],
  });

  const handleChange = ({ target: t }) => {
    let key = t.getAttribute("name");
    let newFormData = structuredClone(data);

    let obj = {
      birthYear: +t.value.replace(/\D/g, ""),
      wantedCourse: newFormData["wantedCourse"]
        ? t.checked
          ? `${newFormData["wantedCourse"]}, ${t.value}`
          : newFormData["wantedCourse"]
              .split(", ")
              .filter((e) => e !== t.value)
              .join(", ")
        : t.value,
      default: t.value,
    };

    newFormData[key] = obj[key] ?? obj["default"];

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

  const handleSubmit = (e) => {
    e.preventDefault();

    setLoading(true);
    axios
      .post("/api/students", data)
      .then(({ data }) => {
        console.log(data);
        setData({
          firstName: "",
          lastName: "",
          middleName: "",
          birthYear: "",
          region: "",
          startedDate: new Date(),
          tel: [],
          gender: "",
          aboutUs: "",
          wantedCourse: "",
          wantedDay: "",
          wantedTime: "",
          monthlyPayment: [],
          isActive: false,
          isEnd: false,
          enrolledCourses: [],
        });

        // select option larni tozalash
        [region, gender, wantedDay, wantedTime].forEach((e) => (e.value = ""));
      })
      .catch(({ response: { data } }) => {
        console.log(data);
        // quyida alert dagi xabar backend dan kelyapti
        alert(data?.msg);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  return (
    <>
      <div className="above__form">
        <h3 className="global__title">O'quvchini ro'yxatga olish</h3>
        {/* <span>{isOnline ? "🟢online" : "🔴offline"}</span>
        <span>
          {batteryInfo.state ? (
            <>
              batteryLevel: {Math.round(batteryInfo.batteryInfo?.level * 100)}%
            </>
          ) : (
            ""
          )}
        </span> */}
      </div>
      <form onSubmit={handleSubmit} className="form">
        <div className="form__field">
          <label htmlFor="firstName">Ism: </label>
          <div>
            <input
              onChange={handleChange}
              value={data.firstName}
              title="Ismingizni kiriting"
              type="text"
              placeholder="ism..."
              name="firstName"
              id="firstName"
              required
              autoComplete="off"
            />
          </div>
        </div>
        <div className="form__field">
          <label htmlFor="lastName">Familya: </label>
          <div>
            <input
              onChange={handleChange}
              value={data.lastName}
              title="Familyangizni kiriting"
              type="text"
              placeholder="familya..."
              name="lastName"
              id="lastName"
              required
              autoComplete="off"
            />
          </div>
        </div>
        <div className="form__field">
          <label htmlFor="middleName">Kimning o'g'li: </label>
          <div>
            <input
              onChange={handleChange}
              value={data.middleName}
              title="Kimning o'g'li ekanligingizni kiriting"
              type="text"
              placeholder="misol: Abdulloh o'g'li"
              name="middleName"
              id="middleName"
              required
              autoComplete="off"
            />
          </div>
        </div>
        <div className="form__field">
          <label htmlFor="birthYear">Tug'ilgan yil: </label>
          <div>
            <input
              onChange={handleChange}
              value={data.birthYear}
              title="Tug'ilgan yilingizni kiriting"
              type="string"
              placeholder="misol: 1998"
              name="birthYear"
              id="birthYear"
              required
              autoComplete="off"
            />
          </div>
        </div>
        <div className="form__field">
          <label>Hudud: </label>
          <div>
            <select
              onChange={handleChange}
              title="Hududingizni tanlang"
              defaultValue={data.region}
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
          </div>
        </div>
        <div className="form__field">
          <label htmlFor="tel">Telefon raqam: </label>
          {<ShowingEnteredNumbers data={data} setData={setData} />}
          <div>
            <input
              onChange={(e) => setTempPhoneNumber(e.target.value)}
              value={tempPhoneNumber}
              type="text"
              placeholder="+998901234567"
              autoComplete="off"
            />
            <button
              className="form__btn"
              onClick={handleAddTelNumToArrOfData}
              type="button"
            >
              Telefon raqam qo'shish
            </button>
          </div>
        </div>
        <div className="form__field">
          <label>Jinsingiz tanlang: </label>
          <div>
            <select
              onChange={handleChange}
              defaultValue={data.gender}
              name="gender"
              id="gender"
              required
            >
              <option disabled={true} value="">
                tanlang
              </option>
              {genders.map((el, idx) => (
                <option key={idx} title={el} value={el}>
                  {el.capitalLetter()}
                </option>
              ))}
            </select>
          </div>
        </div>
        {!isReceptionist && (
          <>
            <div className="custom__field">
              <label htmlFor="wantedCourse">
                Qaysi kurslarni o'qishni xohlaysiz:{" "}
              </label>
              {TEACHER_MAJOR.map((el, idx) => (
                <div key={idx}>
                  <input
                    type="checkbox"
                    onChange={handleChange}
                    value={el}
                    name="wantedCourse"
                    id={el}
                    autoComplete="off"
                  />
                  <label htmlFor={el}>{el.toUpperCase()}</label>
                </div>
              ))}
            </div>
            {/* <div className="form__field">
              <label htmlFor="wantedCourse">
                Qaysi kurslarni o'qishni xohlaysiz:{" "}
              </label>
              <div>
                <textarea
                  rows="4"
                  cols="50"
                  onChange={handleChange}
                  value={data.wantedCourse}
                  type="text"
                  placeholder="misol: Web dasturlash va ingliz tili kurslarida o'qishni xohlayman"
                  name="wantedCourse"
                  id="wantedCourse"
                  autoComplete="off"
                ></textarea>
              </div>
            </div> */}
            <div className="form__field">
              <label>Qaysi kunlari o'qishni hohlaysiz: </label>
              <div>
                <select
                  onChange={handleChange}
                  defaultValue={data.wantedDay}
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
                </select>
              </div>
            </div>
            <div className="form__field">
              <label>Qaysi vaqtda o'qishni hohlaysiz: </label>
              <div>
                <select
                  onChange={handleChange}
                  defaultValue={data.wantedTime}
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
              </div>
            </div>
            <div className="form__field">
              <label htmlFor="aboutUs">
                Biz haqimizda qayerdan eshitdingiz?:{" "}
              </label>
              <div>
                <textarea
                  rows="4"
                  cols="50"
                  onChange={handleChange}
                  value={data.aboutUs}
                  type="text"
                  placeholder="misol: do'stimdan eshitdim"
                  name="aboutUs"
                  id="aboutUs"
                  autoComplete="off"
                ></textarea>
              </div>
            </div>
          </>
        )}
        <button disabled={loading} className="form__btn" type="submit">
          {loading ? "Kuting..." : "Tizimga kiritish"}
        </button>
      </form>
      {loading && <Loader />}
    </>
  );
}

export default memo(RegisterStudentComp);
