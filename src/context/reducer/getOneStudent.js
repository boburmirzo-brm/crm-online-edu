import {GET_ONE_STUDENT} from "../action/actionType"

const getOneStudent = (state=null, action)=>{
    switch(action.type){
        case GET_ONE_STUDENT:
            return state = action.payload 
        default:
            return state
    }
}
export default getOneStudent;