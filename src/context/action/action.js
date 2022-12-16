import {SIGN_IN,SIGN_OUT,RELOAD,TEACHER_INFO,GET_STUDENTS} from "./actionType"

export const authAction = (payload)=>{
    return { type: SIGN_IN, payload }
}

export const logOutAction = ()=>{
    return { type: SIGN_OUT }
}

export const reloadAction = ()=>{
    return { type: RELOAD }
}

export const teacherInfoAction = (payload)=>{
    return { type: TEACHER_INFO,payload }
}
export const getStudentsAction = (payload)=>{
    return { type: GET_STUDENTS, payload }
}