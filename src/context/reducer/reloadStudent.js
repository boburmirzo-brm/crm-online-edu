import {RELOAD_STUDENT} from "../action/actionType"

const reloadStudent = (state=false, action)=>{
    switch(action.type){
        case RELOAD_STUDENT:
            return state = !state 
        default:
            return state
    }
}
export default reloadStudent;