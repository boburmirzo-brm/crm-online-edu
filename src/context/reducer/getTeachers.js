import {GET_TEACHERS} from "../action/actionType"

const getTeachers = (state=[], action)=>{
    switch(action.type){
        case GET_TEACHERS:
            return state = action.payload 
        default:
            return state
    }
}
export default getTeachers;