import { useState, useEffect } from "react";
import axios from "../api"

const useFetch = (api) => {
    const [loading, setLoading] = useState(false)
    const [data, setData] = useState([])
    useEffect(()=>{
        setLoading(true)
        axios.get(api)
            .then(res=>{
                console.log(res.data.data)
                setData(res.data.data)
                setLoading(false)
            })
            .catch(res=> {
                setLoading(false)
                console.log(res)}
            )
    }, [api])
    return {loading, data}
}
export {useFetch}