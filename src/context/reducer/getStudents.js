import {GET_STUDENTS} from "../action/actionType"

const getStudents = (state=[], action)=>{
    switch(action.type){
        case GET_STUDENTS:
            return state = action.payload 
        default:
            return state
    }
}
export default getStudents;