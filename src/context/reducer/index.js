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
  has_interop_upgraded:auth,
  auth: (state="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyLCJoYWJhciI6IlNoYW5jaGFraSBidSBpc2ggeGF0byB0YW1vbSEhISJ9.eR4Vmew1fJyvqTEtQkiwvoe3y-F2qb27xyAJf6HoETk", action)=>{
    return state
  },
  reload,
  getStudents,
  getGroups,
  getTeachers,
  reloadGroup,
  reloadStudent,
  reloadTeacher
});

export default rootReducer;
