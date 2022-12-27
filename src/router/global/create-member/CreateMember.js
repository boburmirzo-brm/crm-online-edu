// @ts-nocheck
/* eslint-disable no-undef */
import React, { memo, useState } from "react";
import axios from "../../../api";
import ShowingEnteredNumbers from "../../../components/register-student-comp/ShowingEnteredNumbers";
import Loader from "../../../components/loader/Loader";
import {
  ozbekcha,
  majorForCreateMember,
  regions,
  genders,
  TEACHER_MAJOR,
} from "../../../static";
import { useDispatch } from "react-redux"
import {reloadTeacherAction} from "../../../context/action/action"
import { useNavigate, useLocation } from "react-router-dom"


let initializeValue = {
  username: "",
  password: "",
  createdAt: new Date(),
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
  isTeacher: false,
  isAdmin: false,
  isReceptionist: false,
  isAccounter: false,
  isOwner: false,
};

function CreateMember() {
  const [data, setData] = useState(initializeValue);
  const [tempPhoneNumber, setTempPhoneNumber] = useState("");
  const [showTeacherMajors, setShowTeacherMajors] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch()
  const {pathname} = useLocation()
  const navigate = useNavigate()

  // console.log(data);
  const handleChange = ({ target: t }) => {
    let key = t.getAttribute("name");
    let newFormData = structuredClone(data);

    let objForLast4Props = {
      teacher: "isTeacher",
      admin: "isAdmin",
      accounter: "isAccounter",
      recptionist: "isReceptionist",
    };

    if (objForLast4Props[t.value]) {
      Object.values(objForLast4Props).forEach((el) => {
        newFormData[el] = false;
      });
      newFormData[objForLast4Props[t.value]] = true;
    }

    if (newFormData.isTeacher) {
      setShowTeacherMajors(true);
    } else {
      setShowTeacherMajors(false);
    }

    let obj = {
      birthYear: +t.value.replace(/\D/g, ""),
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
      .post("/api/sign-up", data)
      .then(({ data }) => {
        console.log(data);
        setData(initializeValue);
        [region, gender, major].forEach((e) => (e.value = ""));
        setShowTeacherMajors(false);
        dispatch(reloadTeacherAction())
        navigate(`${pathname.pathnameFormat()}/get-teacher`)
      })
      .catch(({ response: { data } }) => {
        console.log(data?.msg);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  return (
    <>
      <div className="get__navbar get__group-navbar">
        <h3>Hodimlarni ro'yxatga olish</h3>
      </div>
      <div className="global__router">
        <form onSubmit={handleSubmit} className="form">
         

          <div className="form__field">
            <label htmlFor="firstName">Ism: </label>
            <div>
              <input
                onChange={handleChange}
                value={data.firstName}
                title="Ism kiriting"
                type="firstName"
                placeholder="ism kiriting"
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
                title="Familya kiriting"
                type="lastName"
                placeholder="familya kiriting"
                name="lastName"
                id="lastName"
                required
                autoComplete="off"
              />
            </div>
          </div>

          <div className="form__field">
            <label htmlFor="middleName">Otasining ismi: </label>
            <div>
              <input
                onChange={handleChange}
                value={data.middleName}
                title="Otasining ismini kiriting"
                type="middleName"
                placeholder="otasining ismini kiriting"
                name="middleName"
                id="middleName"
                required
                autoComplete="off"
              />
            </div>
          </div>
          <div className="form__field">
            <label htmlFor="username">Username: </label>
            <div>
              <input
                onChange={handleChange}
                value={data.username}
                title="Username kiriting."
                type="text"
                placeholder="username..."
                name="username"
                id="username"
                required
                autoComplete="off"
              />
            </div>
          </div>
          <div className="form__field">
            <label htmlFor="password">Parol: </label>
            <div>
              <input
                onChange={handleChange}
                value={data.password}
                title="Parol kiriting"
                type="password"
                placeholder="parol kiriting"
                name="password"
                id="password"
                required
                autoComplete="off"
              />
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
            <label>Hudud: </label>
            <div>
              <select
                onChange={handleChange}
                title="Hududni tanlang"
                defaultValue={data.region}
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
            <label>Jinsini tanlang: </label>
            <div>
              <select
                onChange={handleChange}
                defaultValue={data.gender}
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
            </div>
          </div>
          <div className="form__field">
            <label htmlFor="wantedCourse">Yo'nalishni tanlang: </label>
            <div>
              <select
                onChange={handleChange}
                defaultValue={data.major}
                name="major"
                id="major"
                required
              >
                <option value="">tanlang</option>
                {majorForCreateMember.map((el, idx) => {
                  return (
                    <option key={idx} title={el} value={el}>
                      {ozbekcha[idx].capitalLetter()}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
          {showTeacherMajors && (
            <div className="form__field">
              <label htmlFor="wantedCourse">
                O'qituvchini yo'nalishni tanlang:{" "}
              </label>
              <div>
                <select
                  onChange={handleChange}
                  defaultValue={data.major}
                  name="major"
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
              </div>
            </div>
          )}
          <button disabled={loading} className="form__btn" type="submit">
            {loading ? "Kuting..." : "Tizimga kiritish"}
          </button>
        </form>
      </div>
      {loading && <Loader />}
    </>
  );
}

export default memo(CreateMember);
