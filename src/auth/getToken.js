// @ts-nocheck
import {storageName} from "../persist/index"
export const getToken = ()=>{
    let token = JSON.parse(localStorage.getItem(`persist:${storageName}`))
    if(token?.has_interop_upgraded){
        return {
            headers: {
                token: JSON.parse(token?.has_interop_upgraded)?.os.join("")
            }
        }
    }
}
