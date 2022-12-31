import React, { useEffect, useRef } from "react";
import { Routes, Route, Navigate, useParams } from "react-router-dom";
import Receptionist from "../receptionist/Receptionist";
import Admin from "../admin/Admin";
import Teacher from "../teacher/Teacher";
import Accounter from "../accounter/Accounter";
import Sidebar from "../../components/sidebar/Sidebar";
import "./CheckRoute.css";
import { GLOBAL_ROUTERS } from "../../static/router";
import { useFetch } from "../../hooks/useFetch";
import Loader from "../../components/loader/Loader";
import { useDispatch, useSelector } from "react-redux";
import { getStudentsAction,getGroupsAction,getTeachersAction } from "../../context/action/action";
import OneStudent from "../global/one-student/OneStudent";
import OneGroup from "../global/one-group/OneGroup";
import OneTeacher from "../global/one-teacher/OneTeacher";

function CheckRoute() {
  const user = useSelector(s=>s?.has_interop_upgraded)
  let [path] = Object.entries(user?.degree).find((i) => i[1]);
  let params = useParams();
  let changePath = params["*"].split("/").slice(1).join("") &&
    "/" + params["*"].split("/").slice(1).join("/");
  let currantPath = path === "owner" ? "admin" + changePath : path + changePath;
  const content = useRef()
  useEffect(()=> {
    content.current.scrollTo({
      top: 0,
      // behavior: 'smooth',
  });
  }, [currantPath])

  const reloadGroup = useSelector(s=>s?.reloadGroup)
  const reloadStudent = useSelector(s=>s?.reloadStudent)
  const reloadTeacher = useSelector(s=>s?.reloadTeacher)

  const dispatch = useDispatch();

  const students = useFetch("/api/students", reloadStudent);
  const groups = useFetch("/api/groups",reloadGroup);
  const teachers = useFetch("/api/teachers",reloadTeacher);

  useEffect(() => {
    dispatch(getStudentsAction(students?.data));
  }, [students, dispatch, reloadStudent]);
  
  useEffect(() => {
    dispatch(getGroupsAction(groups?.data));
  }, [groups, dispatch, reloadGroup]);

  useEffect(() => {
    dispatch(getTeachersAction(teachers?.data));
  }, [teachers ,dispatch, reloadTeacher]);
  console.log();
  return (
    <div className="check__route">
      {teachers.loading && <Loader />}
      <Sidebar info={user.info} degree={user.degree} />
      <div ref={content} className="check__content">
        <Routes>
          {params["*"] !== currantPath && (
            <Route
              path={`/${params["*"]}`}
              element={<Navigate replace to={`/check/${currantPath}`} />}
            />
          )}
          <Route path="/admin" element={<Admin />} />
          <Route path="/receptionist" element={<Receptionist />} />
          <Route path="/teacher" element={<Teacher />} />
          <Route path="/accounter" element={<Accounter />} />
          <Route path={`${path}/get-student/:id`} element={<OneStudent/>}/>
          <Route path={`${path}/get-group/:id`} element={<OneGroup/>}/>
          <Route path={`${path}/get-teacher/:id`} element={<OneTeacher/>}/>

          {GLOBAL_ROUTERS?.map((item, inx) => {
            if(item[params["*"].split("/")[0]]){
              return (
                <Route key={inx} path={path + item.path} element={item.element} />
              )
            }
          })}
        </Routes>
      </div>
    </div>
  );
}

export default CheckRoute;
