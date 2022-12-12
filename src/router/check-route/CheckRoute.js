import React from "react";
import { Routes, Route, Navigate, useParams } from "react-router-dom";
import Receptionist from "../receptionist/Receptionist";
import Admin from "../admin/Admin";
import Teacher from "../teacher/Teacher";
import Accounter from "../accounter/Accounter";
import { useSelector } from "react-redux";
import Sidebar from "../../components/sidebar/Sidebar";
import "./CheckRoute.css"

let user = {
  token : "asdklasjdlkasjdklasjdlksad",
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
    teacher: true,
    receptionist: false,
    accounter: false,
  }
}


function CheckRoute() {
  let [path] = Object.entries(user?.degree).find((i) => i[1]);
  let params = useParams();
  let currantPath = path === "owner" ? "admin": path

  return (
    <div className="check__route">
      <Sidebar info={user.info} degree={user.degree}/>
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
      </Routes>
    </div>
  );
}

export default CheckRoute;
