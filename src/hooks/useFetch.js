import { useState, useEffect } from "react";
import axios from "../api"

const useFetch = (api) => {
    const [loading, setLoading] = useState(false)
    const [data, setData] = useState([])
    useEffect(()=>{
        setLoading(true)
        axios.get(api)
            .then(res=>{
                setData(res.data.data)
                setLoading(false)
            })
            .catch(res=> {
                setLoading(false)
                }
            )
    }, [api])
    return {loading, data}
}
export {useFetch}