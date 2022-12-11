// @ts-nocheck
import React, { useState } from "react";
import "./RegisterStudentComp.css";
import axios from "../../api";
import { regions, times, days } from "../../static";

function RegisterStudentComp() {
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
    let newFormData = { ...data };
    if (key === "birthYear") {
      newFormData[key] = +t.value;
    } else {
      newFormData[key] = t.value;
    }

    setData(newFormData);
  };

  const handleAddTelNumToArrOfData = (e) => {
    if (!tempPhoneNumber)
      return alert("iltimos telefon raqamingizni kiriting!");
    let newFormData = { ...data };
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
      })
      .catch(({ response: { data } }) => console.log(data))
      .finally(() => {
        setLoading(false);
      });
  };

  // console.log(data);
  return (
    <div className="regStu__Container">
      <h3>Register Student</h3>
      <form onSubmit={handleSubmit} className="regStu__form">
        <div className="regStu__input_field">
          <label htmlFor="firstName">Ism: </label>
          <div>
            <input
              onChange={handleChange}
              value={data.firstName}
              type="text"
              placeholder="ism..."
              name="firstName"
              id="firstName"
              required
              autoComplete="off"
            />
          </div>
        </div>
        <div className="regStu__input_field">
          <label htmlFor="lastName">Familya: </label>
          <div>
            <input
              onChange={handleChange}
              value={data.lastName}
              type="text"
              placeholder="familya..."
              name="lastName"
              id="lastName"
              required
              autoComplete="off"
            />
          </div>
        </div>
        <div className="regStu__input_field">
          <label htmlFor="middleName">Kimning o'g'li: </label>
          <div>
            <input
              onChange={handleChange}
              value={data.middleName}
              type="text"
              placeholder="misol: Abdulloh o'g'li"
              name="middleName"
              id="middleName"
              required
              autoComplete="off"
            />
          </div>
        </div>
        <div className="regStu__input_field">
          <label htmlFor="birthYear">Tug'ilgan yil: </label>
          <div>
            <input
              onChange={handleChange}
              value={data.birthYear}
              type="text"
              placeholder="misol: 1998"
              name="birthYear"
              id="birthYear"
              required
              autoComplete="off"
            />
          </div>
        </div>
        <div className="regStu__input_field">
          <label>Hudud: </label>
          <div>
            <select
              onChange={handleChange}
              defaultValue={data.region}
              name="region"
              required
            >
              <option value="">tanlang</option>
              {regions.map((el, idx) => (
                <option key={idx} value={el}>
                  {el.toUpperCase()}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="regStu__input_field">
          <label htmlFor="tel">Telefon raqam: </label>
          {data.tel.length ? (
            <div>
              Sizning telefon ramalaringiz:{" "}
              {data.tel.map((el, idx) => (
                <span key={idx}>{el}, </span>
              ))}
            </div>
          ) : (
            ""
          )}
          <div>
            <input
              onChange={(e) => setTempPhoneNumber(e.target.value)}
              value={tempPhoneNumber}
              type="text"
              placeholder="+998901234567"
              name="tel"
              id="tel"
              autoComplete="off"
            />
            <button
              className="regStu__btn"
              onClick={handleAddTelNumToArrOfData}
              type="button"
            >
              add
            </button>
          </div>
        </div>
        <div className="regStu__input_field">
          <label>Jinsingiz tanlang: </label>
          <div>
            <select
              onChange={handleChange}
              defaultValue={data.gender}
              name="gender"
              required
            >
              <option value="">tanlang</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>
        </div>
        <div className="regStu__input_field">
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
        </div>
        <div className="regStu__input_field">
          <label>Qaysi kunlari o'qishni hohlaysiz: </label>
          <div>
            <select
              onChange={handleChange}
              defaultValue={data.wantedDay}
              name="wantedDay"
              required
            >
              <option value="">tanlang</option>
              {days.map((el, idx) => (
                <option key={idx} value={el}>
                  {el.toUpperCase()}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="regStu__input_field">
          <label>Qaysi vaqtda o'qishni hohlaysiz: </label>
          <div>
            <select
              onChange={handleChange}
              defaultValue={data.wantedTime}
              name="wantedTime"
              required
            >
              <option value="">tanlang</option>
              {times.map((el, idx) => (
                <option key={idx} value={el}>
                  {el.toUpperCase()}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="regStu__input_field">
          <label htmlFor="aboutUs">Biz haqimizda qayerdan eshitdingiz?: </label>
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
        <button disabled={loading} className="regStu__btn" type="submit">
          {loading ? "Kuting..." : "Tizimga kiritish"}
        </button>
      </form>
    </div>
  );
}

export default RegisterStudentComp;
