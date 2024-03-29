/* eslint-disable no-undef */
// @ts-nocheck
import React, { useState, memo } from "react";
import { days, times, levels, TEACHER_MAJOR } from "../../../static";
import axios from "../../../api";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {
  reloadGroupAction,
  reloadTeacherAction,
} from "../../../context/action/action";
import { useNavigate, useLocation } from "react-router-dom";
import Loader from "../../../components/loader/Loader";
import { toast } from "react-toastify";
import { getToken } from "../../../auth/getToken";

let initializeData = {
  teacherInfo: {
    _id: "",
  },
  name: "",
  major: "",
  level: "",
  day: "",
  time: "",
  room: {
    number: "",
    note: "",
  },
  firstLesson: "",
  expectedExamDay: "",
  enrolledStudents: [],
  isActive: false,
  coursePrice: 0, // type must be number before submit
};

function CreateGroup() {
  const [data, setData] = useState(initializeData);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const teachersSomeData = useSelector((s) => s?.getTeachers);
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const handleChange = ({ target: t }) => {
    let key = t.getAttribute("name");
    let copyData = structuredClone(data);
    if (key === "number") {
      copyData.room[key] = t.value;
    } else if (key === "teacherInfo") {
      copyData[key] = { _id: t.value };
    } else {
      copyData[key] = t.value;
    }

    setData(copyData);

    // copyData[key] = +t.value.replace(/\D/g, "");
  };

  // console.log(data);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    axios
      .post("/api/groups", data, getToken())
      .then(({ data }) => {
        toast.success(data?.msg, {
          autoClose: 5000,
        });
        dispatch(reloadGroupAction());
        dispatch(reloadTeacherAction());
        setData(initializeData);
        // select option larni tozolash;
        [teacherInfo, major, level, day, time].forEach((e) => (e.value = ""));
        navigate(`${pathname.pathnameFormat()}/get-group`);
      })
      .catch(({ response: { data } }) => {
        toast.error(data?.msg, {
          autoClose: 5000,
        });
      })
      .finally(() => setLoading(false));
  };
  return (
    <>
      <div className="get__navbar get__group-navbar">
        <h3>Guruh qo'shish</h3>
      </div>
      <div className="global__router">
        <form onSubmit={handleSubmit} className="form">
          <div className="form__field">
            <label>O'qituvchi: </label>
            <div>
              <select
                onChange={handleChange}
                title="O'qituvchini tanlang"
                defaultValue={`${data.teacherInfo.firstName} ${data.teacherInfo.lastName}`}
                name="teacherInfo"
                id="teacherInfo"
                required
              >
                <option value="">tanlang</option>
                {teachersSomeData?.map(
                  ({ _id, firstName, lastName, major }, idx) => (
                    <option
                      key={idx}
                      value={_id}
                      title={[firstName, lastName, major].join(" ")}
                    >
                      {firstName.capitalLetter()} {lastName.capitalLetter()}{" "}
                      ({major.toUpperCase()})
                    </option>
                  )
                )}
              </select>
            </div>
          </div>
          <div className="form__field">
            <label>Guruh yo'nalishi: </label>
            <div>
              <select
                onChange={handleChange}
                title="guruh yo'nalishini tanlang"
                defaultValue={data.major}
                name="major"
                id="major"
                required
              >
                <option value="">tanlang</option>
                {TEACHER_MAJOR.map((el, idx) => (
                  <option key={idx} value={el} title={el}>
                    {el.toUpperCase()}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="form__field">
            <label>Guruh batafsil: </label>
            <div>
              <select
                onChange={handleChange}
                title="guruh yo'nalishini tanlang"
                defaultValue={data.level}
                name="level"
                id="level"
                required
              >
                <option disabled={true} value="">
                  tanlang
                </option>

                {data.major ? (
                  levels[data.major]?.map((el, idx) => (
                    <option key={idx} value={el} title={el}>
                      {el.toUpperCase()}
                    </option>
                  ))
                ) : (
                  <option disabled={true} value="">
                    iltimos birinchi Guruh yo'nalishini tanlang
                  </option>
                )}
              </select>
            </div>
          </div>

          <div className="form__field">
            <label>Guruh o'qish kunlari: </label>
            <div>
              <select
                onChange={handleChange}
                title="guruh kunlarini tanlang"
                defaultValue={data.day}
                name="day"
                id="day"
                required
              >
                <option disabled={true} value="">
                  tanlang
                </option>

                {days.map((el, idx) => (
                  <option key={idx} value={el} title={el}>
                    {el === "M/W/F" ? "Dush/Chor/Juma" : "Sesh/Pay/Shanba"}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="form__field">
            <label>Guruh o'qish vaqtlari: </label>
            <div>
              <select
                onChange={handleChange}
                title="guruh vaqtlarini tanlang"
                defaultValue={data.time}
                name="time"
                id="time"
                required
              >
                <option disabled={true} value="">
                  tanlang
                </option>

                {times.map((el, idx) => (
                  <option key={idx} value={el} title={el}>
                    {el}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="form__field">
            <label htmlFor="number">Guruh xonasi: </label>
            <div>
              <input
                onChange={handleChange}
                value={data.room.number}
                title="xona raqamini kiriting"
                type="text"
                placeholder="xona raqami..."
                name="number"
                id="number"
                required
                autoComplete="off"
              />
            </div>
          </div>

          {/* <div className="regStu__input_field">
          <label>Guruh holati: </label>
          <div>
            <select
              onChange={handleChange}
              title="guruh holati"
              defaultValue={data.isActive}
              name="isActive"
              id="isActive"
              required
            >
              <option value="false" title="false">
                false
              </option>
              <option value="true" title="true">
                true
              </option>
            </select>
          </div>
        </div> */}

          {/* <div className="regStu__input_field">
          <label htmlFor="coursePrice">Oylik to'lov: </label>
          <div>
            <input
              onChange={handleChange}
              value={Number(data.coursePrice).brm()}
              title="Oylik to'lovini kiriting"
              type="text"
              placeholder="misol: 400 000"
              name="coursePrice"
              id="coursePrice"
              required
              autoComplete="off"
            />
          </div>
        </div> */}
          <button type="submit" className="form__btn">
            Tizimga kiritish
          </button>
        </form>
      </div>
      {loading && <Loader />}
    </>
  );
}

export default memo(CreateGroup);
