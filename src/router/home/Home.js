import React from 'react'
import {useSelector} from "react-redux"
import { Link } from "react-router-dom"


function Home() {
  let state = useSelector(s=>s)
  return (
    <div>
      <h2>Home</h2>
      <Link to={`/login`}>Login for member</Link>
      <br />
      <Link to={`/register-student`}>register student</Link>

    </div>
  )
}

export default Home