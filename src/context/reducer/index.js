import { combineReducers } from "redux";
import auth from "./auth";
import reload from "./reload";
import teacherInfo from "./teacherInfo";
import getStudents from "./getStudents";
import getOneStudent from "./getOneStudent";
import getGroups from "./getGroups";

const rootReducer = combineReducers({
  auth,
  reload,
  teacherInfo,
  getStudents,
  getOneStudent,
  getGroups,
});

export default rootReducer;
