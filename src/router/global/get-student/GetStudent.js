import React, {memo} from 'react'
import { useSelector } from "react-redux"
import "./GetStudent.css"
import female from "../../../assets/female-icon.webp"
import male from "../../../assets/male-icon.png"

function GetStudent() {
  const data = useSelector(s=> s?.getStudents)
  console.log(data[0]);
  return (
    <div className='global__router'>
        <h3 className='global__title'>O'quvchilar</h3>
        <div className='get__student-container'>
       
          {
            data?.map((item,inx)=> <div key={inx} className="get__student-card">
              <img src={item.gender === "male"?male:female} alt="" />
              <h3>{item.firstName} {item.lastName} {item.middleName}</h3>
              <p>Manzil: <b>{item.region}</b></p>
              <p>Tug'ilgan sana: <b>{item.birthYear} yil</b></p>
              <p>Tel <b>{item.tel?.map(i => i+' ')}</b></p>
              {
                !item.enrolledCourses.length && <span className='get__student-notGroup'>Guruhga qo'shilmagan</span>
              }
              {
                !item.enrolledCourses.length && <div className='get__student-extra'>
                  <p>Fan: <i>{item.wantedCourse}</i></p>
                  <p>Kun: <i>{item.wantedDay} {item.wantedTime}</i></p>
                </div>
              }
            </div>)
          }
        </div>
    </div>
  )
}

export default memo(GetStudent)