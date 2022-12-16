import React, {memo} from 'react'
import "./Loader.css"

function Loader() {
  return (
    <div className='lds__loader'>
        <div className="lds-spinner"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
    </div>
  )
}

export default memo(Loader)