import { combineReducers } from "redux";
import auth from "./auth";
import reload from "./reload";
import reloadGroup from "./reloadGroup";
import reloadStudent from "./reloadStudent";
import reloadTeacher from "./reloadTeacher";
import getStudents from "./getStudents";
import getOneStudent from "./getOneStudent";
import getGroups from "./getGroups";
import getTeachers from "./getTeachers";
import getOneGroup from "./getOneGroup";

const rootReducer = combineReducers({
  auth,
  reload,
  getStudents,
  getOneStudent,
  getGroups,
  getTeachers,
  getOneGroup,
  reloadGroup,
  reloadStudent,
  reloadTeacher
});

export default rootReducer;
