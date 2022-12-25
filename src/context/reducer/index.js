import { combineReducers } from "redux";
import auth from "./auth";
import reload from "./reload";
import reloadGroup from "./reloadGroup";
import reloadStudent from "./reloadStudent";
import reloadTeacher from "./reloadTeacher";
import getStudents from "./getStudents";
import getGroups from "./getGroups";
import getTeachers from "./getTeachers";

const rootReducer = combineReducers({
  auth,
  reload,
  getStudents,
  getGroups,
  getTeachers,
  reloadGroup,
  reloadStudent,
  reloadTeacher
});

export default rootReducer;
