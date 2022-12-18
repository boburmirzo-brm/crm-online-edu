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

// let user = {
//   token: "asdklasjdlkasjdklasjdlksad",
//   info: {
//     username: "bobur0668",
//     firstName: "Boburmirzo",
//     lastName: "RasulovRasulov",
//     middleName: "Ma'ruf ugli",
//     major: "it",
//   },
//   degree: {
//     owner: false,
//     admin: false,
//     teacher: false,
//     receptionist: true,
//     accounter: false,
//   },
// };

function CheckRoute() {
  const user = useSelector(s=>s?.auth)
  let [path] = Object.entries(user?.degree).find((i) => i[1]);
  let params = useParams();
  let changePath =
    params["*"].split("/").slice(1).join("") &&
    "/" + params["*"].split("/").slice(1).join("/");
  let currantPath = path === "owner" ? "admin" + changePath : path + changePath;

  const content = useRef()
  useEffect(()=> {
    content.current.scrollTo({
      top: 0,
      // behavior: 'smooth',
  });
  }, [currantPath])
  

  const reload = useSelector(s=>s?.reload)

  const dispatch = useDispatch();

  const students = useFetch("/api/students", reload);
  const groups = useFetch("/api/groups",reload);
  const teachers = useFetch("/api/teachers",reload);

  useEffect(() => {
    dispatch(getStudentsAction(students?.data));
    dispatch(getGroupsAction(groups?.data));
    dispatch(getTeachersAction(teachers?.data));
  }, [groups,students,dispatch, reload]);
  return (
    <div className="check__route">
      {students.loading && <Loader />}
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

          {GLOBAL_ROUTERS?.map((item, inx) => (
            <Route key={inx} path={path + item.path} element={item.element} />
          ))}
        </Routes>
      </div>
    </div>
  );
}

export default CheckRoute;
