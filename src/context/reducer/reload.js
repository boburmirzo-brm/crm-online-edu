import {RELOAD} from "../action/actionType"

const reload = (state=false, action)=>{
    switch(action.type){
        case RELOAD:
            return state = !state 
        default:
            return state
    }
}
export default reload;