import {GET_GROUPS} from "../action/actionType"

const getGroups = (state=[], action)=>{
    switch(action.type){
        case GET_GROUPS:
            return state = action.payload 
        default:
            return state
    }
}
export default getGroups;