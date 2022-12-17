import React, { useEffect } from "react";
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
import { useDispatch } from "react-redux";
import { getStudentsAction,getGroupsAction } from "../../context/action/action";
import OneStudent from "../global/one-student/OneStudent";

let user = {
  token: "asdklasjdlkasjdklasjdlksad",
  info: {
    username: "bobur0668",
    firstName: "Boburmirzo",
    lastName: "RasulovRasulov",
    middleName: "Ma'ruf ugli",
    major: "it",
  },
  degree: {
    owner: false,
    admin: false,
    teacher: false,
    receptionist: true,
    accounter: false,
  },
};

function CheckRoute() {
  let [path] = Object.entries(user?.degree).find((i) => i[1]);
  let params = useParams();
  let changePath =
    params["*"].split("/").slice(1).join("") &&
    "/" + params["*"].split("/").slice(1).join("/");
  let currantPath = path === "owner" ? "admin" + changePath : path + changePath;

  const dispatch = useDispatch();

  const students = useFetch("/api/students");
  const groups = useFetch("/api/groups");

  useEffect(() => {
    dispatch(getStudentsAction(students.data));
    dispatch(getGroupsAction(groups.data));
  }, [groups,students,dispatch]);
  return (
    <div className="check__route">
      {students.loading && <Loader />}
      <Sidebar info={user.info} degree={user.degree} />
      <div className="check__content">
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
