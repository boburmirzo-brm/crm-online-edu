// @ts-nocheck
import {storageName} from "../index"
export const getToken = ()=>{
    let token = JSON.parse(localStorage.getItem(`persist:${storageName}`))
    if(token?.auth){
        return {
            headers: {
                token: JSON.parse(token?.auth)?.token
            }
        }
    }
}
