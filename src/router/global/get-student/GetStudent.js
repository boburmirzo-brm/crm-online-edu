import React from 'react'
import {useFetch} from "../../../hooks/useFetch"

function GetStudent() {
  const {loading, data} = useFetch("/api/students")
  
  return (
    <div>
        <h2>GetStudent</h2>
        {
          data?.map((item,inx)=> <div key={inx}>
            <p>{item.firstName}</p>
            <p>{item.lastName}</p>
            <hr />
          </div>)
        }
    </div>
  )
}

export default GetStudent