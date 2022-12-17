import React, {memo} from 'react'
import { useSelector } from 'react-redux';


function GetTeacher() {
  const teachers = useSelector(s=>s?.getTeachers)
  return (
    <div>
        <h3 className='global__title'>O'qituvchilar</h3>
        {
          teachers?.map((item)=> <div key={item._id}>
            {item?.firstName}
            <hr />
          </div>)
        }
    </div>
  )
}

export default memo(GetTeacher)