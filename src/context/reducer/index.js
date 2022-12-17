import { combineReducers } from "redux";
import auth from "./auth";
import reload from "./reload";
import teacherInfo from "./teacherInfo";
import getStudents from "./getStudents";
import getOneStudent from "./getOneStudent";
import getGroups from "./getGroups";
import getTeachers from "./getTeachers";

const rootReducer = combineReducers({
  auth,
  reload,
  teacherInfo,
  getStudents,
  getOneStudent,
  getGroups,
  getTeachers,
});

export default rootReducer;
