import {RELOAD_TEACHER} from "../action/actionType"

const reloadTeacher = (state=false, action)=>{
    switch(action.type){
        case RELOAD_TEACHER:
            return state = !state 
        default:
            return state
    }
}
export default reloadTeacher;