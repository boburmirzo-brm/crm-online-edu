// @ts-nocheck
import React, { useState, memo } from "react";
import {
  days,
  times,
  levels,
  tempTeachers,
  TEACHER_MAJOR,
} from "../../../static";
import axios from "../../../api";

function CreateGroup() {
  const [data, setData] = useState({
    teacherId: "",
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
  });


  const handleChange = ({ target: t }) => {
    let key = t.getAttribute("name");
    let copyData = structuredClone(data);
    if (key === "number") {
      copyData.room[key] = t.value;
    } else {
      copyData[key] = t.value;
    }

    setData(copyData);

    // copyData[key] = +t.value.replace(/\D/g, "");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post("/api/groups", data)
      .then(({data})=> {
        console.log(console.log)
      })
      .catch(({response: {data}})=> {
        console.log(data)
      })
      .finally();
  };
  return (
    <div className="global__router">
      <h3 className="global__title">Guruh qo'shish</h3>
      <form onSubmit={handleSubmit} className="form">
        <div className="form__field">
          <label>O'qituvchi: </label>
          <div>
            <select
              onChange={handleChange}
              title="Hududingizni tanlang"
              defaultValue={data.teacherId}
              name="teacherId"
              id="teacherId"
              required
            >
              <option value="">tanlang</option>
              {tempTeachers.map((el, idx) => (
                <option key={idx} value={el._id} title={el.firstName}>
                  {el.firstName.capitalLetter()}
                </option>
              ))}
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
                  {el.capitalLetter()}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="form__field">
          <label>Guruh bosqichi: </label>
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
                    {el.capitalLetter()}
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
              title="guruh yo'nalishini tanlang"
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
                  {el}
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
              title="guruh yo'nalishini tanlang"
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
  );
}

export default memo(CreateGroup);
