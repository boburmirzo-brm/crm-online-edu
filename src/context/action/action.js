import {SIGN_IN,SIGN_OUT,RELOAD,TEACHER_INFO} from "./actionType"

export const auth = (payload)=>{
    return { type: SIGN_IN, payload }
}

export const logOut = ()=>{
    return { type: SIGN_OUT }
}

export const reloadType = ()=>{
    return { type: RELOAD }
}

export const teacherInfoType = (payload)=>{
    return { type: TEACHER_INFO,payload }
}