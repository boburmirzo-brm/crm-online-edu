import { combineReducers } from "redux";
import auth from "./auth";
import reload from "./reload";
import teacherInfo from "./teacherInfo";
import getStudents from "./getStudents";
import getOneStudent from "./getOneStudent";
import getGroups from "./getGroups";
import getTeachers from "./getTeachers";
import getOneGroup from "./getOneGroup";

const rootReducer = combineReducers({
  auth,
  reload,
  teacherInfo,
  getStudents,
  getOneStudent,
  getGroups,
  getTeachers,
  getOneGroup,
});

export default rootReducer;
