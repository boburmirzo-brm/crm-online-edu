import React from 'react'
import "./OneGroup.css"
import { useSelector } from "react-redux"

function OneGroup() {
  const group = useSelector(s=>s?.getOneGroup)
  console.log(group);
  return (
    <div className='one__group'>
      <h2 className='one__group-title'>Guruh haqida batafsil malumot</h2>
      <div className='one__group-head'>
        <div className='one__group-item'>
          <p>Yo'nalish</p>
          <select disabled style={{textTransform:"uppercase"}}  name="" id="">
            <option value="">{group?.major} </option>
          </select>
          <select disabled name="" id="">
            <option value="">{group?.level} </option>
          </select>
        </div>
        <div className='one__group-item'>
          <p>O'qituvchi</p>
          <select disabled name="" id="">
            <option value="">{group?.teacherInfo.firstName} {group?.teacherInfo.lastName}</option>
          </select>
        </div>
        <div className='one__group-item'>
          <p>Kun</p>
          <select disabled name="" id="">
            <option value="">{group?.day} </option>
          </select>
        </div>
        <div className='one__group-item'>
          <p>Vaqti</p>
          <select disabled name="" id="">
            <option value="">{group?.time}</option>
          </select>
        </div>
        <div className='one__group-item'>
          <p>Xona</p>
          <input disabled type="text" defaultValue={group?.room.number} />
        </div>
        <button className='one__group-btnSuccess'>Guruhni o'zgartirish</button>
        {
          !group?.enrolledStudents.length ? <button className='one__group-btnDanger'>Guruhni o'chirish</button>:
          !group?.isActive ?
          <button className='one__group-btnInfo'>Guruhni faollashtish</button> : <></>
        }
      
      </div>
      <div className="one__group-body">
          {
             !group?.enrolledStudents.length && <p className='one__group-warning'>O'quvchalar hali qo'shilmagan</p>
          }
          {
            group?.enrolledStudents?.map(({firstName,lastName,middleName,_id},inx)=>  <div key={_id} className="one__group-card">
            <span>{inx+1}</span>
            <p>{firstName} {lastName} {middleName}</p>
            <button className='one__group-btnDanger'>Guruhdan chiqarib yuborish</button>
          </div> )
          }
          <div style={{textAlign:"right", marginTop: "30px"}}>
            <button className='one__group-btnSuccess'>Guruhga o'quvchi qo'shish</button>
          </div>
      </div>
    </div>
  )
}

export default OneGroup