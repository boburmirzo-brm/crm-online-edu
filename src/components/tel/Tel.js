import React from 'react'
import "./Tel.css"
import {AiOutlinePhone} from "react-icons/ai"
function Tel({tel}) {
  return (
        tel?.map((phone, inx)=>  <a 
            key={inx} 
            className="tel__title"
            href={`tel:${phone}`}>
        <span>{phone}</span>
        <AiOutlinePhone/>
    </a>)
  )
}
export default Tel