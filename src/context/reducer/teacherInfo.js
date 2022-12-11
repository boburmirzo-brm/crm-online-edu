import {TEACHER_INFO} from "../action/actionType"

const teacherInfo = (state=null, action)=>{
    switch(action.type){
        case TEACHER_INFO:
            return state = action.payload 
        default:
            return state
    }
}
export default teacherInfo;