// @ts-nocheck
import React, { memo, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./GetStudent.css";
import female from "../../../assets/female-icon.webp";
import male from "../../../assets/male-icon.png";
import { Link, useLocation } from "react-router-dom";
import {
  reloadGroupAction,
  reloadStudentAction,
} from "../../../context/action/action";
import axios from "../../../api";
// import { TEACHER_MAJOR } from "../../../static/index";
import AddStudentToGroup from "../../../components/add-student-to-group/AddStudentToGroup";
import EmptyData from "../../../components/empty-data/EmptyData";
import loadingGif from "../../../assets/loading-gif.gif";
import { FiX } from "react-icons/fi";
import { toast } from "react-toastify";

const [NEW_STUDENT, STUDENT_OF_GROUP, ALL_STUDENT] = [
  "NEW_STUDENT",
  "STUDENT_OF_GROUP",
  "ALL_STUDENT",
];
function GetStudent({
  addStudentInGroup,
  groupIdInGroup,
  studentsInGroup,
  setClose,
  oneGroupReload
}) {
  const data = useSelector((s) => s?.getStudents);
  const dispatch = useDispatch();
  const [id, setId] = useState(null);
  const [courses, setCourses] = useState([]);
  const [filterStudents, setFilterStudents] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [searchLoading, setSearchLoading] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [filterType, setFilterType] = useState(
    localStorage.getItem("filterStudent") || NEW_STUDENT
  );
  useEffect(() => {
    localStorage.setItem("filterStudent", filterType);
    if (!data) {
      return;
    }
    if (NEW_STUDENT === filterType) {
      setFilterStudents(
        data?.filter((i) => !i.enrolledCourses.length && !i.isEnd)
      );
    } else if (STUDENT_OF_GROUP === filterType) {
      setFilterStudents(
        data?.filter((i) => i.enrolledCourses.length && !i.isActive)
      );
    } else if (ALL_STUDENT === filterType) {
      setFilterStudents(
        data?.filter((i) => i.enrolledCourses.length && i.isActive)
      );
    }
  }, [data, filterType]);

  // console.log(filterStudents);

  // Zokirkhon
  const [isLoading, setIsLoading] = useState(false);
  const { pathname } = useLocation();

  const deleteStudent = (_id, f, l) => {
    if (window.confirm(`${f} ${l} shu o'quvchini o'chirmoqchimisiz?`)) {
      axios
        .delete(`/api/students/${_id}`)
        .then(({ data }) => {
          toast.success(data?.msg, {
            autoClose: 5000,
          });
          // console.log(data);
          dispatch(reloadStudentAction());
        })
        .catch(({ response: { data } }) => {
          toast.error(data?.msg, { autoClose: 5000 });
        });
    }
  };

  const addThisStudentToGroup = (studentId) => {
    const innerData = { studentID: studentId };
    setIsLoading(true);
    axios
      .patch(`/api/groups/add-student/${groupIdInGroup}`, innerData)
      .then(({ data }) => {
        toast.success(data?.msg, {
          autoClose: 5000,
        });
        dispatch(reloadGroupAction());
        dispatch(reloadStudentAction());
        oneGroupReload(e=> !e);
        // dispatch(reloadTeacherAction());
      })
      .catch(({ response }) => {
        toast.error(response?.data?.msg, {
          autoClose: 5000,
        });
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleOnKeyUpSearch = ({ target: { value } }) => {
    setInputValue(value);
    if (value.length < 3) {
      return;
    }
    setSearchLoading(true);
    axios
      .get("/api/students/search", {
        method: "GET",
        params: {
          input: value.toLowerCase(),
        },
      })
      .then(({ data: innerData }) => {
        setSearchResults(innerData.data);
      })
      .catch((err) => {
        console.log("xatolik: ");
        console.log(err);
      })
      .finally(() => {
        setSearchLoading(false);
      });
  };
  return (
    <div className="global__router">
      <div className="get__navbar">
        <h3>O'quvchilar</h3>
        <ul className="get__collection">
          <li
            onClick={() => setFilterType(NEW_STUDENT)}
            className={`get__item ${
              NEW_STUDENT === filterType ? "get__item-active" : ""
            }`}
          >
            <p>Yangi O'quvchilar </p>
            <p>Yangi </p>
            <span>{data?.unenrolledCourses()}</span>
          </li>
          <li
            onClick={() => setFilterType(STUDENT_OF_GROUP)}
            className={`get__item ${
              STUDENT_OF_GROUP === filterType ? "get__item-active" : ""
            }`}
          >
            <p>Yangi Guruh O'quvchilari </p>
            <p>Yangi Guruh</p>
            <span>{data?.enrolledCourses()}</span>
          </li>
          <li
            onClick={() => setFilterType(ALL_STUDENT)}
            className={`get__item ${
              ALL_STUDENT === filterType ? "get__item-active" : ""
            }`}
          >
            <p>Markazda O'qiyotgan O'quvchilar </p>
            <p>Barcha </p>
            <span>{data?.isActiveTrue()}</span>
          </li>
        </ul>
        {addStudentInGroup && (
          <button
            onClick={() => {
              setClose(null);
            }}
            className="get__navbar-close"
          >
            <FiX />
          </button>
        )}
      </div>
      <div className="get__controller">
        <input
          type="text"
          className="get__student-searchInput"
          placeholder="O'quvchi FISH..."
          onKeyUp={handleOnKeyUpSearch}
        />
        {inputValue.length >= 3 && (
          <div className="get__student-search">
            {!searchResults.length && !searchLoading && (
              <p>O'quvchi topilmadi</p>
            )}

            {searchResults?.map((i, inx) => (
              <Link
                key={inx}
                to={`${pathname.pathnameFormat()}/get-student/${i._id}`}
              >
                <b>{inx + 1}. </b>
                <span>{i.firstName}</span> <span>{i.lastName}</span>{" "}
                <span>{i.middleName}</span> <i>({i.birthYear})</i>
              </Link>
            ))}
            {searchLoading && <img src={loadingGif} alt="" />}
          </div>
        )}

        {/* <select name="" id="">
          <option value="all">Barcha yo'nalishlar</option>
          {TEACHER_MAJOR?.map((i, inx) => (
            <option key={inx} value={i}>
              {i.toUpperCase()}
            </option>
          ))}
        </select> */}
      </div>
      {/* <h3 className="global__title">O'quvchilar</h3> */}
      <div className="get__student-container">
        {!filterStudents.length ? (
          <EmptyData text={"O'quvchilar topilmadi"} />
        ) : (
          <></>
        )}
        {filterStudents?.map((item, inx) => (
          <div key={inx} className="get__student-card">
            <div >
              <img src={item.gender === "male" ? male : female} alt="" />
              <h3>
                {item.firstName} {item.lastName} {item.middleName}
              </h3>
            </div>
            <p>
              Manzil: <b>{item.region.capitalLetter()}</b>
            </p>
            <p>
              Tug'ilgan sana: <b>{item.birthYear}</b>
            </p>
            <p style={{flex: item.isActive && item.enrolledCourses.length && 1}}>
              Tel:{" "}
              <b>
                {item.tel?.map((i, inx) => (
                  <a key={inx} href={`tel:${i}`}>
                    {i}
                  </a>
                ))}
              </b>
            </p>
            {!item.isActive && !item.enrolledCourses.length && (
              <p style={{ flex: 1 }}>
                Sana:{" "}
                <b>
                  {new Date(item.startedDate).getDate()}.
                  {new Date(item.startedDate).getMonth()}.
                  {new Date(item.startedDate).getFullYear()} /{" "}
                  {new Date(item.startedDate)
                    .getHours()
                    .toString()
                    .padStart(2, "0")}
                  :
                  {new Date(item.startedDate)
                    .getMinutes()
                    .toString()
                    .padStart(2, "0")}
                </b>
              </p>
            )}
            {!item.enrolledCourses.length && (
              <span className="get__student-notGroup">
                Guruhga qo'shilmagan
              </span>
            )}
            {item.wantedCourse.length &&
            !item.isActive &&
            !item.enrolledCourses.length ? (
              <div className="get__student-extra">
                <p>
                  Fan: <i>{item.wantedCourse}</i>
                </p>
                <p>
                  Kun:{" "}
                  <i>
                    {item.wantedDay} {item.wantedTime}
                  </i>
                </p>
              </div>
            ) : (
              <></>
            )}
            {addStudentInGroup ? (
              <>
                <br />
                <button
                  disabled={isLoading || studentsInGroup.includes(item._id)}
                  onClick={() => addThisStudentToGroup(item._id)}
                  className="btn-py"
                >
                  {studentsInGroup.includes(item._id)
                    ? "O'quvchi guruhga qo'shilgan"
                    : "O'quvchini qo'shish"}
                </button>
              </>
            ) : (
              <div className="get__student-btn">
                <Link to={item._id}>
                  <button>Batafsil</button>
                </Link>
                <button
                  onClick={() => {
                    setId(item._id);
                    setCourses(item.enrolledCourses);
                  }}
                >
                  Guruh
                </button>

                {!item.enrolledCourses.length ? (
                  <button
                    onClick={() =>
                      deleteStudent(item._id, item.firstName, item.lastName)
                    }
                    style={{ background: "crimson" }}
                  >
                    O'chirish
                  </button>
                ) : (
                  <></>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
      <AddStudentToGroup
        id={id}
        setId={setId}
        courses={courses}
        setCourses={setCourses}
      />
    </div>
  );
}

export default memo(GetStudent);
