import { combineReducers } from "redux"
import auth from "./auth"
import reload from "./reload"
import teacherInfo from "./teacherInfo"

const rootReducer = combineReducers({
    auth, reload, teacherInfo
})

export default rootReducer