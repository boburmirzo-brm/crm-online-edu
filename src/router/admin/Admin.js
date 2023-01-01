import React from 'react'
import photo from "../../assets/admin.png"

function Admin() {
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
              <li>Barcha <b>O'quvchilar</b> va <b>O'qituvchilar</b> haqida batafsil ma'lumot egasiz</li>
              <li>Barcha <b>Guruhlar</b> haqida batafsil ma'lumot egasiz</li>
              <li><b>O'qituvchi</b> va <b>Receptionist</b>ni tizimga qo'sha olasiz yoki aksi</li>
              </ul>
            </div>
          </div>
      </div>
    </div>
  )
}

export default Admin