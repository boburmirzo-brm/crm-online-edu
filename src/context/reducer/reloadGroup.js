import {RELOAD_GROUP} from "../action/actionType"

const reloadGroup = (state=false, action)=>{
    switch(action.type){
        case RELOAD_GROUP:
            return state = !state 
        default:
            return state
    }
}
export default reloadGroup;