import React from 'react'
import "./Teacher.css"
import { useSelector } from "react-redux"
import OneTeacher from '../global/one-teacher/OneTeacher'

function Teacher() {
  const user = useSelector(s=>s?.has_interop_upgraded)
  return (
    <div className='teacher'>
        <OneTeacher teacherID={user?.info?._id } teacherSelf={true} />
    </div>
  )
}

export default Teacher