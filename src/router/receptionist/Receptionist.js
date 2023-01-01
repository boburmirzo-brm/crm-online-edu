import React from 'react'
import photo from "../../assets/receptionst.png"

function Receptionist() {
  return (
    <div>
      <div className='greeting'>
        <h2><b>Assalomu Alaykum</b> Algoritmga Hush Kelibsiz!</h2>
        <div className='greeting__container'>
          <div>
            <img src={photo} alt="" />
          </div>
          <div>
            <h3>Tizim haqida</h3>
            <ul>
              <li>Barcha <b>O'quvchilar</b> va <b>Guruhlar</b> haqida batafsil ma'lumot egasiz</li>
              <li><b>O'quvchilar</b> va <b>Guruhlar</b>ni boshqarish imkoniyatiga egasiz</li>
              </ul>
            </div>
          </div>
      </div>
    </div>
  )
}

export default Receptionist