// @ts-nocheck
import React, { memo, useState } from "react";
import "./OneGroup.css";
import { useSelector } from "react-redux";
import AddStudentsIntoGroup from "./addStudentsIntoGroup/AddStudentsIntoGroup";
import axios from "../../../api";
import { TEACHER_MAJOR, levels, days, times } from "../../../static";

function OneGroup() {
  const group = useSelector((s) => s?.getOneGroup);
  const teachers = useSelector((s) => s?.getTeachers);
  const [studentID, setStudentID] = useState("");
  group.enrolledStudents = group?.enrolledStudents.filter(({ _id }) => {
    if (studentID === _id) {
      return false;
    }
    return true;
  });
  const [data, setData] = useState({
    ...group,
  });
  console.log(data);
  // console.log(teachers);
  const [StudentsModal, setStudentsModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [areInputsDisabled, setAreInputsDisabled] = useState(true);
  document.body.style.overflow = StudentsModal ? "hidden" : "auto";

  let studentsIdArr = group?.enrolledStudents.reduce((a, c) => {
    a.push(c._id);
    return a;
  }, []);
  // console.log(studentsIdArr);

  const handleChange = ({ target: t }) => {
    let key = t.getAttribute("name");
    if (key === "teacherInfo") {
      let [_id, firstName, lastName] = t.value.split(", ");
      setData((e) => ({ ...e, [key]: { _id, firstName, lastName } }));
    } else if (key === "number") {
      let copyData = structuredClone(data);
      copyData.room[key] = t.value;
      setData(copyData);
    } else {
      setData((e) => ({ ...e, [key]: t.value }));
    }
  };

  const handleChangeDisableAndSaveData = () => {
    if (areInputsDisabled) {
      setAreInputsDisabled((e) => !e);
    } else {
      // code

      setIsLoading(true);
      axios
        .patch("/api/groups", data)
        .then(({ data }) => {
          console.log(data);
          setAreInputsDisabled((e) => !e);
        })
        .catch(({ response }) => {
          console.log(response);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  };

  const handleSubmitDelete = (studentID, firstName, lastName) => {
    let dataInner = { groupID: group._id, studentID };

    if (
      window.confirm(`${firstName} ${lastName} ni rostan o'chirmoqchimisiz?`)
    ) {
      setIsLoading(true);
      axios
        .patch("/api/groups/student-remove", dataInner)
        .then(({ data }) => {
          console.log(data);
          setStudentID(studentID);
        })
        .catch(({ response }) => {
          console.log(response);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  };

  return (
    <div className="one__group">
      <h2 className="one__group-title">Guruh haqida batafsil malumot</h2>
      <div className="one__group-head">
        <div className="one__group-item">
          <p>Yo'nalish</p>
          <select
            onChange={handleChange}
            disabled={areInputsDisabled}
            style={{ textTransform: "uppercase" }}
            name="major"
            id="major"
            defaultValue={data?.major}
          >
            {TEACHER_MAJOR.map((el, idx) => (
              <option key={idx} title={el}>
                {el}
              </option>
            ))}
          </select>
          <select
            onChange={handleChange}
            disabled={areInputsDisabled}
            defaultValue={data?.level}
            name="level"
            id="level"
          >
            {levels[data?.major].map((el, idx) => (
              <option key={idx} title={el}>
                {el}
              </option>
            ))}
          </select>
        </div>
        <div className="one__group-item">
          <p>O'qituvchi</p>
          <select
            onChange={handleChange}
            disabled={areInputsDisabled}
            name="teacherInfo"
            id="teacherInfo"
            defaultValue={`${data?.teacherInfo.firstName} ${data?.teacherInfo.lastName}`}
          >
            <option
              value={`${data?.teacherInfo._id}, ${data?.teacherInfo.firstName}, ${data?.teacherInfo.lastName}`}
            >
              {data?.teacherInfo.firstName} {data?.teacherInfo.lastName}
            </option>
            {teachers.map((el, idx) => (
              <option
                key={idx}
                value={[el._id, el.firstName, el.lastName].join(", ")}
                title={[el.firstName, el.lastName].join(" ")}
              >
                {el.firstName.capitalLetter()} {el.lastName.capitalLetter()}
              </option>
            ))}
          </select>
        </div>
        <div className="one__group-item">
          <p>Kun</p>
          <select
            onChange={handleChange}
            disabled={areInputsDisabled}
            defaultValue={data?.day}
            name="day"
            id="day"
          >
            {days.map((el, idx) => (
              <option key={idx} value={el} title={el}>
                {el}
              </option>
            ))}
          </select>
        </div>
        <div className="one__group-item">
          <p>Vaqti</p>
          <select
            onChange={handleChange}
            defaultValue={data?.time}
            name="time"
            id="time"
            disabled={areInputsDisabled}
          >
            {times.map((el, idx) => (
              <option key={idx} value={el} title={el}>
                {el}
              </option>
            ))}
          </select>
        </div>
        <div className="one__group-item">
          <p>Xona</p>
          <input
            onChange={handleChange}
            disabled={areInputsDisabled}
            value={data?.room.number}
            type="text"
            placeholder="xona raqami..."
            name="number"
            id="number"
            required
            autoComplete="off"
          />
        </div>
        <button
          title={
            areInputsDisabled ? "Guruhni o'zgartirish" : "Ma'lumotlarni saqlash"
          }
          onClick={() => handleChangeDisableAndSaveData()}
          className="one__group-btnSuccess"
        >
          {areInputsDisabled ? "Guruhni o'zgartirish" : "Ma'lumotlarni saqlash"}
        </button>
        {!group?.enrolledStudents.length ? (
          <button className="one__group-btnDanger">Guruhni o'chirish</button>
        ) : !group?.isActive ? (
          <button
            disabled={!areInputsDisabled}
            title={
              areInputsDisabled
                ? "Guruhni faollashtirish"
                : "Iltimos birinchi ma'lumotlarni saqlang!"
            }
            className="one__group-btnInfo"
          >
            Guruhni faollashtish
          </button>
        ) : (
          <></>
        )}
      </div>
      <div className="one__group-body">
        {!group?.enrolledStudents.length && (
          <p className="one__group-warning">O'quvchalar hali qo'shilmagan</p>
        )}
        {group?.enrolledStudents?.map(
          ({ firstName, lastName, middleName, tel, _id }, inx) => (
            <div key={_id} className="one__group-card">
              <span>{inx + 1}</span>
              <p>
                {firstName} {lastName} {middleName} (
                {tel?.map((el, idx) => (
                  <span key={idx} title={el}>
                    {el}
                  </span>
                ))}
                )
              </p>
              <button
                disabled={isLoading}
                onClick={() => handleSubmitDelete(_id, firstName, lastName)}
                className="one__group-btnDanger"
              >
                Guruhdan chiqarib yuborish
              </button>
            </div>
          )
        )}
        <div style={{ textAlign: "right", marginTop: "30px" }}>
          <button
            onClick={() => setStudentsModal(true)}
            className="one__group-btnSuccess"
          >
            Guruhga o'quvchi qo'shish
          </button>
        </div>
      </div>
      {StudentsModal ? (
        <AddStudentsIntoGroup
          group={group}
          groupID={group?._id}
          enrolledStudents={studentsIdArr}
          setStudentsModal={setStudentsModal}
        />
      ) : (
        ""
      )}
    </div>
  );
}

export default memo(OneGroup);
