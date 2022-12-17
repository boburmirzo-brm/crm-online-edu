import React, {memo} from 'react'
import { useSelector } from 'react-redux';

function GetGroup() {
  const groups = useSelector(s=>s?.getGroups)

  return (
    <div className='global__router'>
        <h3 className='global__title'>Guruhlar</h3>
        {
          groups?.map((item)=> <div key={item._id}>
            <h3>{item.major} {item.level}</h3>
            <hr />
          </div>)
        }
    </div>
  )
}

export default memo(GetGroup)