// @ts-nocheck
import React, { useState, memo, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  reloadGroupAction,
  reloadTeacherAction,
  reloadStudentAction,
} from "../../../context/action/action";
import "./GetGroup.css";
import { TEACHER_MAJOR } from "../../../static/index";
import axios from "../../../api";
import AddStudentInGroup from "../../../components/add-student-in-group/AddStudentInGroup";
import { toast } from "react-toastify";

// images
import bugalteriya from "../../../assets/Bug'alteriya.jpg";
import dtm from "../../../assets/DTM ga tayyorgarlik.jpg";
import english from "../../../assets/english.jpg";
import it from "../../../assets/it.jpg";
import matematika from "../../../assets/matematika.jpg";
import russia from "../../../assets/russia.jpg";
import english_kids from "../../../assets/english_kids.jpg";
import russia_kids from "../../../assets/russia_kids.jpg";
import EmptyData from "../../../components/empty-data/EmptyData";
import { FiX } from "react-icons/fi";

function GetGroup({ addStudent, studentID, courses, setCourses, setClose }) {
  const groups = useSelector((s) => s?.getGroups);
  // console.log(groups)
  const teachers = useSelector((s) => s?.getTeachers);
  const dispatch = useDispatch();
  const [active, setActive] = useState(
    localStorage.getItem("filterGroupActive") === "active"
  );
  const [type, setType] = useState(
    localStorage.getItem("filterGroupType") || "all"
  );
  const [filterData, setFilterData] = useState([]);

  // Zokirkhon
  const [isLoading, setIsLoading] = useState(false);
  const [id, setId] = useState(null);
  const [students, setStudents] = useState([]);
  const { pathname } = useLocation();
  const navigate = useNavigate();

  // console.log(filterData);
  // console.log(courses);
  useEffect(() => {
    localStorage.setItem("filterGroupActive", active ? "active" : "new");
    localStorage.setItem("filterGroupType", type);
    if (type === "all") {
      //  console.log(active);
      return setFilterData(groups?.filter((i) => i.isActive === active));
    }
    setFilterData(
      groups?.filter((i) => i.major === type && i.isActive === active)
    );
  }, [type, groups, active]);
  /*
    useEffect(() => {
    if (type === "all") {
      return setFilterData(
        groups?.filter((i) => {
          if (addStudent && courses.includes(i._id)) {
            return false;
          }
          return i.isActive === active;
        })
      );
    }
    setFilterData(
      groups?.filter((i) => {
        if (addStudent && courses.includes(i._id)) {
          return false;
        }
        return i.major === type && i.isActive === active;
      })
    );
  }, [type, groups, active, addStudent, courses]);
  */

  // console.log(filterData);

  const [images] = useState({
    it,
    russia,
    english,
    matematika,
    dtm,
    bugalteriya,
    english_kids,
    russia_kids,
  });
  const addStudentThisGroup = (groupId) => {
    let data = { studentID };
    // console.log(data);
    setIsLoading(true);
    axios
      .patch(`/api/groups/add-student/${groupId}`, data)
      .then(({ data }) => {
        // console.log(data);
        toast.success(data?.msg, {
          autoClose: 5000,
        });
        dispatch(reloadGroupAction());
        dispatch(reloadStudentAction());
        // dispatch(reloadTeacherAction());
        setCourses([...courses, groupId]);
      })
      .catch(({ response: { data } }) => {
        toast.error(data?.msg, {
          autoClose: 5000,
        });
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleDeleteGroupById = (_id) => {
    if (window.confirm(`Shu guruh ni rostan o'chirmoqchimisiz?`)) {
      setIsLoading(true);
      axios
        .delete(`/api/groups/${_id}`)
        .then(({ data }) => {
          console.log(data);
          dispatch(reloadGroupAction());
          dispatch(reloadStudentAction());
          dispatch(reloadTeacherAction());
          // navigate(`${pathname.pathnameFormat()}/get-group`);
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
    <div className="global__router">
      <div className="get__navbar ">
        <h3>Guruhlar</h3>
        <ul className="get__collection ">
          <li
            onClick={() => setActive(false)}
            className={`get__item ${active ? "" : "get__item-active"}`}
          >
            Yangi Guruhlar{" "}
            <span>{groups?.filter((el) => el.isActive === false).length}</span>
          </li>
          <li
            onClick={() => setActive(true)}
            className={`get__item ${active ? "get__item-active" : ""}`}
          >
            Aktiv Guruhlar{" "}
            <span>{groups?.filter((el) => el.isActive === true).length}</span>
          </li>
        </ul>
        {addStudent && (
          <button
            onClick={() => {
              setCourses([]);
              setClose(null);
            }}
            className="get__navbar-close"
          >
            <FiX />
          </button>
        )}
      </div>
      <div className="get__controller">
        <ul className="get__controller-collection">
          <li
            onClick={() => setType("all")}
            className={`get__controller-item ${
              type === "all" ? "get__controller-active" : ""
            }`}
          >
            Barchasi{" "}
            <span>{groups?.filter((el) => el.isActive === active).length}</span>
          </li>
          {TEACHER_MAJOR?.map((i, inx) => (
            <li
              key={inx}
              onClick={() => setType(i)}
              className={`get__controller-item ${
                type === i ? "get__controller-active" : ""
              } `}
            >
              {i.toUpperCase()}
              <span>
                {
                  groups?.filter(
                    (el) => el.major === i && el.isActive === active
                  ).length
                }
              </span>
            </li>
          ))}
        </ul>
      </div>
      <div className="get__group-container">
        {filterData?.length ? (
          filterData?.map((item) => {
            const {
              _id: groupId,
              major,
              level,
              teacherInfo,
              room: { number },
              enrolledStudents,
              day,
              time,
            } = item;
            return (
              <div className="get__group-card" key={groupId}>
                <Link to={`${pathname.pathnameFormat()}/get-group/${groupId}`}>
                  <img src={images[major]} alt={major + " " + level} />
                  <h3>
                    {major.capitalLetter()} {level}
                  </h3>
                </Link>
                <Link
                  to={`${pathname.pathnameFormat()}/get-teacher/${
                    teacherInfo._id
                  }`}
                >
                  <p>
                    O'qituvchi:{" "}
                    <b>
                      {teachers?.reduce((a, c) => {
                        if (c._id === teacherInfo._id) {
                          a = c.firstName + " " + c.lastName;
                        }
                        return a;
                      }, "")}
                    </b>
                  </p>
                </Link>
                <p>
                  Guruh xonasi: <b>{number}</b>
                </p>
                <p>
                  O'quvchilar soni: <b>{enrolledStudents.length} ta</b>
                </p>
                <p>
                  Kun: <i>{day}</i> - <i>{time}</i>
                </p>
                {!enrolledStudents.length ? (
                  <span className="get__student-notGroup">
                    O'quvchi guruhga qo'shilmagan
                  </span>
                ) : (
                  ""
                )}
                <hr className="hr" />
                {addStudent ? (
                  <>
                    <br />
                    <button
                      disabled={isLoading || courses.includes(groupId)}
                      onClick={() => addStudentThisGroup(groupId)}
                      className="btn-py"
                    >
                      {courses.includes(groupId)
                        ? "Bu guruhda o'qiyapti"
                        : "Guruhga qo'shish"}
                    </button>
                  </>
                ) : (
                  <div className="get__group-btn">
                    <Link to={groupId}>
                      <button>Batafsil</button>
                    </Link>
                    <button
                      onClick={() => {
                        setId(groupId);
                        setStudents(enrolledStudents);
                      }}
                    >
                      O'quvchilar
                    </button>
                    {!enrolledStudents.length && (
                      <button
                        onClick={() => handleDeleteGroupById(groupId)}
                        style={{ background: "crimson" }}
                      >
                        O'chirish
                      </button>
                    )}
                  </div>
                )}
              </div>
            );
          })
        ) : (
          <EmptyData text={"Guruhlar topilmadi"} />
        )}
      </div>
      <AddStudentInGroup
        id={id}
        setId={setId}
        students={students}
        setStudents={setStudents}
      />
    </div>
  );
}

export default memo(GetGroup);
