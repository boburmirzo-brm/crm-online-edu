import { combineReducers } from "redux"
import auth from "./auth"
import reload from "./reload"
import teacherInfo from "./teacherInfo"
import getStudents from "./getStudents"

const rootReducer = combineReducers({
    auth, reload, teacherInfo, getStudents
})

export default rootReducer