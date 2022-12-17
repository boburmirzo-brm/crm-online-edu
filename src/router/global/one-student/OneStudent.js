import React, {memo} from 'react'
import { useSelector } from "react-redux";

function OneStudent() {
  const one = useSelector((s) => s?.getOneStudent);
  // console.log(one);
  return (
    <div className='global__router'>
        <h3 className='global__title'>O'quvchi haqida batafsil malumotlar</h3>
        <h3>{one?.firstName}</h3>
    </div>
  )
}

export default memo(OneStudent)