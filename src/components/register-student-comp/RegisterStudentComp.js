// @ts-nocheck
/* eslint-disable no-undef */
import React, { useState, memo } from "react";
import "./RegisterStudentComp.css";
import axios from "../../api";
import { regions, times, days, genders, TEACHER_MAJOR } from "../../static";
import ShowingEnteredNumbers from "./ShowingEnteredNumbers";
import Loader from "../../components/loader/Loader";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { reloadStudentAction } from "../../context/action/action";
import call from "../../assets/call.png";
import Confetti from "react-confetti";
import { AiOutlineCheckCircle, AiOutlineCloseCircle } from "react-icons/ai";

let initializeValue = {
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
};
function RegisterStudentComp({ isReceptionist }) {
  const [loading, setLoading] = useState(false);
  const [tempPhoneNumber, setTempPhoneNumber] = useState("+998");
  const [data, setData] = useState(initializeValue);
  const [modal, setModal] = useState(false);

  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
    setTempPhoneNumber("+998");
    setData(newFormData);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if(!data.tel.length){
      return alert("tel")
    }
    data.middleName =
      data.middleName.split(" ")[0].capitalLetter() +
      (data.gender === "male" ? " o'g'li" : " qizi");
    data.firstName = data.firstName.capitalLetter();
    data.lastName = data.lastName.capitalLetter();

    setLoading(true);
    axios
      .post("/api/students", data)
      .then(({ data }) => {
        console.log(data);

        setData(initializeValue);
        if (!isReceptionist) {
          setModal(true);
        }
        if (isReceptionist) {
          navigate(`${pathname.pathnameFormat()}/get-student`);
          dispatch(reloadStudentAction());
        }
        // select option larni tozalash
        [region, gender, wantedDay, wantedTime].forEach((e) => (e.value = ""));
      })
      .catch((err) => {
        console.log(err?.data);
        // quyida alert dagi xabar backend dan kelyapti
        // alert(err?.data?.msg);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  return (
    <>
      {!isReceptionist ? (
        <button onClick={() => navigate(-1)} className="backBtn register__back">
          <b>&#10140;</b>
          <span>Orqaga</span>
        </button>
      ) : (
        ""
      )}
      {!isReceptionist ? (
        <h3 className="register__title"> O'quvchini ro'yxatga olish</h3>
      ) : (
        <></>
      )}

      <form
        onSubmit={handleSubmit}
        className={`form ${!isReceptionist ? "register__formCon" : ""}`}
      >
        <div className="form__field">
          <label htmlFor="firstName">
            Ismingiz: <span style={{ color: "crimson" }}>*</span>
          </label>
          <div>
            <input
              onChange={handleChange}
              value={data.firstName}
              style={{ outline: data.firstName.length >= 3 ? "3.5px solid #aeddae" : "" }}
              title="Ismingizni kiriting"
              type="text"
              placeholder="ism..."
              name="firstName"
              id="firstName"
              minLength={3}
              required
              autoComplete="off"
            />
            {data.firstName.length >= 3 ? (
              <AiOutlineCheckCircle style={{ color: "green" }} />
            ) : (
              <AiOutlineCloseCircle style={{ color: "crimson" }} />
            )}
          </div>
        </div>
        <div className="form__field">
          <label htmlFor="lastName">
            Familyangiz: <span style={{ color: "crimson" }}>*</span>{" "}
          </label>
          <div>
            <input
              onChange={handleChange}
              value={data.lastName}
              style={{ outline: data.lastName.length >= 3 ? "3.5px solid #aeddae" : "" }}
              title="Familyangizni kiriting"
              type="text"
              placeholder="familya..."
              name="lastName"
              minLength={3}
              id="lastName"
              required
              autoComplete="off"
            />
            {data.lastName.length >= 3 ? (
              <AiOutlineCheckCircle style={{ color: "green" }} />
            ) : (
              <AiOutlineCloseCircle style={{ color: "crimson" }} />
            )}
          </div>
        </div>
        <div className="form__field">
          <label htmlFor="middleName">
            Otangizning ismi: <span style={{ color: "crimson" }}>*</span>{" "}
          </label>
          <div>
            <input
              onChange={handleChange}
              value={data.middleName}
              style={{ outline: data.middleName.length >= 3 ? "3.5px solid #aeddae" : "" }}
              title="Kimning o'g'li ekanligingizni kiriting"
              type="text"
              placeholder="misol: Abdulloh o'g'li"
              name="middleName"
              id="middleName"
              minLength={3}
              required
              autoComplete="off"
            />
            {data.middleName.length >= 3 ? (
              <AiOutlineCheckCircle style={{ color: "green" }} />
            ) : (
              <AiOutlineCloseCircle style={{ color: "crimson" }} />
            )}
          </div>
        </div>
        <div className="form__field">
          <label htmlFor="birthYear">
            Tug'ilgan yilingiz: <span style={{ color: "crimson" }}>*</span>{" "}
          </label>
          <div>
            <input
              onChange={handleChange}
              value={data.birthYear}
              style={{ outline: data.birthYear >= 1910 ? "3.5px solid #aeddae" : "" }}
              title="Tug'ilgan yilingizni kiriting"
              type="text"
              placeholder="misol: 1998"
              name="birthYear"
              minLength={4}
              maxLength={4}
              id="birthYear"
              required
              autoComplete="off"
            />
            {data.birthYear >= 1910  ? (
              <AiOutlineCheckCircle style={{ color: "green" }} />
            ) : (
              <AiOutlineCloseCircle style={{ color: "crimson" }} />
            )}
          </div>
        </div>
        <div className="form__field">
          <label>
            Qayerdansiz: <span style={{ color: "crimson" }}>*</span>{" "}
          </label>
          <div>
            <select
              onChange={handleChange}
              title="Hududingizni tanlang"
              defaultValue={data.region}
              style={{ outline: data.region ? "3.5px solid #aeddae" : "" }}
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
            {data.region ? (
              <AiOutlineCheckCircle style={{ color: "green" }} />
            ) : (
              <AiOutlineCloseCircle style={{ color: "crimson" }} />
            )}
          </div>
        </div>
        <div className="form__field">
          <label htmlFor="tel">
            Telefon raqamingiz (avval o'zingiznikini keyin ota-onangizning tel
            raqamini kiriting): <span style={{ color: "crimson" }}>*</span>{" "}
          </label>
          {<ShowingEnteredNumbers data={data} setData={setData} />}
          <div>
            <input
              onChange={(e) => setTempPhoneNumber(e.target.value)}
              onBlur={(e) => {
                if(tempPhoneNumber.length < 8){return}
                setTempPhoneNumber(e.target.value);
                handleAddTelNumToArrOfData();
              }}
              value={tempPhoneNumber}
              type="text"
              placeholder="tel number"
              style={{
                outline:
                  tempPhoneNumber.length > 8 || data.tel.length
                    ? "3.5px solid #aeddae"
                    : "",
              }}
              autoComplete="off"
              required
              minLength={9}
              maxLength={15}
            />
            {data.tel.length ||  tempPhoneNumber.length > 8  ? (
              <AiOutlineCheckCircle style={{ color: "green" }} />
            ) : (
              <AiOutlineCloseCircle style={{ color: "crimson" }} />
            )}
            <button
              className="form__btn"
              onClick={()=> {
                if(tempPhoneNumber.length < 8){return}
                handleAddTelNumToArrOfData()
              } }
              type="button"
            >
              Telefon raqam qo'shish
            </button>
          </div>
        </div>
        <div className="form__field">
          <label>
            Jinsingiz tanlang: <span style={{ color: "crimson" }}>*</span>{" "}
          </label>
          <div>
            <select
              onChange={handleChange}
              defaultValue={data.gender}
              name="gender"
              style={{ outline: data.gender ? "3.5px solid #aeddae" : "" }}
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
            {data.gender ? (
              <AiOutlineCheckCircle style={{ color: "green" }} />
            ) : (
              <AiOutlineCloseCircle style={{ color: "crimson" }} />
            )}
          </div>
        </div>
        {!isReceptionist && (
          <>
            <div className="custom__field">
              <label htmlFor="wantedCourse">
                Qaysi kurslarni o'qishni xohlaysiz:{" "}
                <span style={{ color: "crimson" }}>*</span>
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
              <label>
                Qaysi kunlari o'qishni hohlaysiz:{" "}
                <span style={{ color: "crimson" }}>*</span>{" "}
              </label>
              <div>
                <select
                  onChange={handleChange}
                  defaultValue={data.wantedDay}
                  name="wantedDay"
                  style={{
                    outline: data.wantedDay ? "3.5px solid #aeddae" : "",
                  }}
                  id="wantedDay"
                  required
                >
                  <option disabled={true} value="">
                    tanlang
                  </option>
                  {days.map((el, idx) => (
                    <option key={idx} title={el} value={el}>
                      {el === "M/W/F" ? "Dush/Chor/Juma" : "Sesh/Pay/Shanba"}
                    </option>
                  ))}
                </select>
                {data.wantedDay ? (
                  <AiOutlineCheckCircle style={{ color: "green" }} />
                ) : (
                  <AiOutlineCloseCircle style={{ color: "crimson" }} />
                )}
              </div>
            </div>
            <div className="form__field">
              <label>
                Qaysi vaqtda o'qishni hohlaysiz:{" "}
                <span style={{ color: "crimson" }}>*</span>{" "}
              </label>
              <div>
                <select
                  onChange={handleChange}
                  defaultValue={data.wantedTime}
                  name="wantedTime"
                  style={{
                    outline: data.wantedTime ? "3.5px solid #aeddae" : "",
                  }}
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
                {data.wantedTime ? (
                  <AiOutlineCheckCircle style={{ color: "green" }} />
                ) : (
                  <AiOutlineCloseCircle style={{ color: "crimson" }} />
                )}
              </div>
            </div>
            <div className="form__field">
              <label htmlFor="aboutUs">
                Qo'shimcha ma'lumot yozish uchun?: <i>(Ixtiyoriy)</i>
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

      {modal ? (
        <>
          <div className="greeting__modal">
            <div
              style={{ backdropFilter: "blur(0)" }}
              className="greeting__modal-shadow"
            ></div>
            <div className="greeting__modal-content register__modal">
              <div>
                <h4>Muvaffaqiyatli to'ldirdingiz</h4>
                <p>Qisqa muddatda sizga aloqaga chiqamiz</p>
                <img src={call} alt="" />
                <button onClick={() => navigate(-1)} className="form__btn">
                  Bosh sahifaga qaytish
                </button>
              </div>
            </div>

            <Confetti
              width={window.innerWidth - 50}
              height={window.innerHeight}
              recycle={false}
              tweenDuration={30000}
              numberOfPieces={1000}
            />
          </div>
        </>
      ) : (
        <></>
      )}

      {loading && <Loader />}
    </>
  );
}

export default memo(RegisterStudentComp);
