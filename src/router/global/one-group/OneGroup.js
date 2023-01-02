// @ts-nocheck
import React, { memo, useEffect, useState } from "react";
import "./OneGroup.css";
import { useDispatch, useSelector } from "react-redux";
// import AddStudentsIntoGroup from "./addStudentsIntoGroup/AddStudentsIntoGroup";
import axios from "../../../api";
import { useFetch } from "../../../hooks/useFetch";
import { TEACHER_MAJOR, levels, days, times } from "../../../static";
import { useParams, useNavigate, useLocation, Link } from "react-router-dom";
import Loader from "../../../components/loader/Loader";
import Skeleton from "../../../components/skeleton/Skeleton";
import {
  reloadTeacherAction,
  reloadGroupAction,
  reloadStudentAction,
} from "../../../context/action/action";
import { getToken } from "../../../auth/getToken";
import AddStudentInGroup from "../../../components/add-student-in-group/AddStudentInGroup";
import EmptyData from "../../../components/empty-data/EmptyData";
import { toast } from "react-toastify";
import Content from "../../../components/content/Content";
import Tel from "../../../components/tel/Tel";
import { FiTrash } from "react-icons/fi";

function OneGroup() {
  let { id } = useParams();

  const [innerReload, setInnerReload] = useState(false);
  const [contentReload, setContentReload] = useState(false);
  const {
    fetchError,
    data: group,
    loading,
  } = useFetch(`/api/groups/${id}`, innerReload);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const teachers = useSelector((s) => s?.getTeachers);

  const [data, setData] = useState(null);

  useEffect(() => {
    setData(group);
  }, [group]);

  const { data: content, loading: contentLoading } = useFetch(
    `/api/contents/${id}`,
    contentReload
  );

  const [StudentsModal, setStudentsModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [students, setStudents] = useState([]);
  const [areInputsDisabled, setAreInputsDisabled] = useState(true);
  document.body.style.overflow = StudentsModal ? "hidden" : "auto";

  // console.log(studentsIdArr);

  useEffect(() => {
    setStudents(data?.enrolledStudents.map((i) => i._id));
  }, [data?.enrolledStudents]);

  const handleChange = ({ target: t }) => {
    let key = t.getAttribute("name");
    if (key === "teacherInfo") {
      setData((e) => ({ ...e, [key]: { _id: t.value } }));
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
        .patch(`/api/groups/${data?._id}`, data, getToken())
        .then(({ data }) => {
          toast.success(data?.msg, {
            autoClose: 5000,
          });
          setInnerReload((e) => !e);
          setAreInputsDisabled((e) => !e);
          dispatch(reloadGroupAction());
          dispatch(reloadTeacherAction());
        })
        .catch(({ response: { data } }) => {
          toast.error(data?.msg, {
            autoClose: 5000,
          });
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  };

  const handleSubmitDeleteStudent = (studentID, firstName, lastName) => {
    let dataInner = { studentID };
    let groupIDInner = group._id;

    // console.log("studentId: " + studentID);
    // console.log("groupId: " + groupIDInner);

    if (
      window.confirm(`${firstName} ${lastName} ni rostan o'chirmoqchimisiz?`)
    ) {
      setIsLoading(true);
      axios
        .patch(
          `/api/groups/remove-student/${groupIDInner}`,
          dataInner,
          getToken()
        )
        .then(({ data }) => {
          if (!data.data) {
            console.log("ok");
            toast.success(data?.msg, {
              autoClose: 5000,
            });
            dispatch(reloadGroupAction());
            dispatch(reloadStudentAction());
            dispatch(reloadTeacherAction());
            return navigate(`${pathname.pathnameFormat()}/get-group`);
          }
          toast.success(data?.msg, {
            autoClose: 5000,
          });
          setInnerReload((e) => !e);
          dispatch(reloadGroupAction());
          dispatch(reloadStudentAction());
          // dispatch(reloadTeacherAction());
        })
        .catch(({ response: { data } }) => {
          toast.error(data?.msg, {
            autoClose: 5000,
          });
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  };

  const handleDeleteGroupById = () => {
    if (window.confirm(`Shu guruh ni rostan o'chirmoqchimisiz?`)) {
      setIsLoading(true);
      axios
        .delete(`/api/groups/${group._id}`, getToken())
        .then(({ data }) => {
          // console.log(data);
          toast.success(data?.msg, {
            autoClose: 5000,
          });
          dispatch(reloadGroupAction());
          dispatch(reloadStudentAction());
          dispatch(reloadTeacherAction());
          navigate(`${pathname.pathnameFormat()}/get-group`);
        })
        .catch(({ response: { data } }) => {
          toast.error(data?.msg, {
            autoClose: 5000,
          });
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  };
  console.log(pathname.pathnameFormat().split("/")[2]);
  const handleChangerOfActiveStatus = () => {
    if (window.confirm("Guruhni chindan faollashtirmoqchimisiz"))
      if (data.enrolledStudents?.length) {
        axios
          .get(`/api/groups/isactiveTrue/${group._id}`, getToken())
          .then(({ data }) => {
            toast.success(data?.msg, {
              autoClose: 5000,
            });
            setInnerReload((e) => !e);
            dispatch(reloadGroupAction());
            dispatch(reloadStudentAction());
            dispatch(reloadTeacherAction());
          })
          .catch(({ response: { data } }) => {
            toast.error(data?.msg, {
              autoClose: 5000,
            });
          })
          .finally(() => {
            setIsLoading(false);
          });
      }
  };

  const handleCreateContent = () => {
    axios
      .post(
        `/api/contents`,
        {
          groupId: id,
          titles: [],
        },
        getToken()
      )
      .then(({ data }) => {
        toast.success(data?.msg, {
          autoClose: 5000,
        });
        setInnerReload((e) => !e);
        setContentReload((p) => !p);
        dispatch(reloadGroupAction());
      })
      .catch(({ response: { data } }) => {
        toast.error(data?.msg, {
          autoClose: 5000,
        });
      });
  };

  if (!data) {
    if (fetchError.length) {
      return <EmptyData text={`Guruh topilmadi, ${fetchError}`} />;
    }
    return <Skeleton title={"Guruh haqida batafsil malumot"} />;
  }
  return (
    <>
      <div className="one__group">
        <button onClick={() => navigate(-1)} className="backBtn">
          <b>&#10140;</b>
          <span>Orqaga</span>
        </button>
        <div className="one__group-head">
          <div>
            <h2 className="one__group-title">Guruh haqida batafsil malumot</h2>
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
                {TEACHER_MAJOR?.map((el, idx) => (
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
                {levels[data?.major]?.map((el, idx) => (
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
                defaultValue={data?.teacherInfo?._id}
              >
                <option value={data?.teacherInfo?._id || ""}>
                  {data?.teacherInfo?.firstName} {data?.teacherInfo?.lastName}
                </option>
                {teachers?.map((el, idx) => (
                  <option
                    key={idx}
                    value={el._id || ""}
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
                    {el === "M/W/F" ? "Dush/Chor/Juma" : "Sesh/Pay/Shanba"}
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
              <p>Boshlangan vaqti</p>
              <input
                onChange={handleChange}
                disabled={areInputsDisabled}
                value={data?.firstLesson}
                type="text"
                placeholder="00.00.0000"
                name="firstLesson"
                id="firstLesson"
                required
                autoComplete="off"
              />
            </div>
            <div className="one__group-item">
              <p>Imtihon vaqti</p>
              <input
                onChange={handleChange}
                disabled={areInputsDisabled}
                value={data?.expectedExamDay}
                type="text"
                placeholder="00.00.0000"
                name="expectedExamDay"
                id="expectedExamDay"
                required
                autoComplete="off"
              />
            </div>
            <div className="one__group-item">
              <p>Xona</p>
              <input
                onChange={handleChange}
                disabled={areInputsDisabled}
                value={data?.room?.number || ""}
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
                areInputsDisabled
                  ? "Guruhni o'zgartirish"
                  : "Ma'lumotlarni saqlash"
              }
              disabled={isLoading}
              onClick={() => handleChangeDisableAndSaveData()}
              className="one__group-btnSuccess"
            >
              {areInputsDisabled
                ? "Guruhni o'zgartirish"
                : isLoading
                ? "Kuting..."
                : "Saqlash"}
            </button>
            {!group?.enrolledStudents?.length ? (
              <button
                onClick={handleDeleteGroupById}
                className="one__group-btnDanger"
              >
                Guruhni o'chirish
              </button>
            ) : !group?.isActive ? (
              <button
                onClick={handleChangerOfActiveStatus}
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
          <div className="one__group-content">
            {data?.isActive && !content && (
              <button
                onClick={handleCreateContent}
                disabled={contentLoading}
                className="btn-py"
              >
                Ish reja qo'shish
              </button>
            )}
            {data?.isActive && content && (
              <Content setContentReload={setContentReload} content={content} />
            )}
          </div>
        </div>
        <br />
        <h3 className="one__group-title">Guruh o'quvchilari</h3>
        <div className="one__group-body">
          {!group?.enrolledStudents?.length && (
            <p className="one__group-warning">O'quvchalar hali qo'shilmagan</p>
          )}
          {group?.enrolledStudents?.map((item, idx) => {
            const { firstName, lastName, middleName, tel, _id } = item;
            return (
              <div key={_id} className="one__group-card">
                <div className="one__group-cardItem">
                  <span>{idx + 1}. </span>
                  <Link to={`${pathname.pathnameFormat()}/get-student/${_id}`}>
                    {firstName} {lastName} {middleName}
                  </Link>
                  <div className="one__group-tel">
                    <Tel tel={tel.slice(0, 1)} />
                  </div>
                </div>
                {pathname.pathnameFormat().split("/")[2] === "receptionist" &&
                group.isActive ? (
                  <></>
                ) : (
                  <button
                    disabled={isLoading}
                    onClick={() =>
                      handleSubmitDeleteStudent(_id, firstName, lastName)
                    }
                    className="one__group-btnDanger"
                  >
                    <FiTrash />
                  </button>
                )}
              </div>
            );
          })}
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
          // <AddStudentsIntoGroup
          //   groupID={group?._id}
          //   enrolledStudents={data?.enrolledStudents}
          //   setStudentsModal={setStudentsModal}
          //   setInnerReload={setInnerReload}
          // />
          <AddStudentInGroup
            id={group?._id}
            setId={setStudentsModal}
            students={students}
            setStudent={setStudents}
            oneGroupReload={setInnerReload}
          />
        ) : (
          ""
        )}
      </div>
      {loading && <Loader />}
    </>
  );
}

export default memo(OneGroup);
