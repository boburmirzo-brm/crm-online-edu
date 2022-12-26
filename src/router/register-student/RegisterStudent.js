import React, {useState} from "react";
import "./RegisterStudent.css";
import RegisterStudentComp from "../../components/register-student-comp/RegisterStudentComp";
import {FaLaptopCode} from "react-icons/fa"
import {GiNotebook} from "react-icons/gi"

function RegisterStudent() {
  const [modal, setModal] = useState(true)
  document.body.style.overflow = modal?"hidden":"auto"
  return (
    <div className="regStuRoute_Container">
      {
        modal ? <div className="greeting__modal">
        <div className="greeting__modal-shadow"></div>
        <div className="greeting__modal-content">
          <div>
          <h3>Kurs haqida qisqacha</h3>
          <i>O'qish hafta uch kun ikki soatdan bo'ladi.</i>
          <i>Tajribali ustozlar darslarni qiziqarli va samarali holatda o'tishadi.</i>
          <i>Har bosqich yakunida imtihon olinadi.</i>
          <br />
          <hr className="hr"/>
          <br />
          <h4 style={{color:"crimson"}}>Diqqat qiling !</h4>
          <ul>
            <li>Malumotlarni to'liq to'ldiring</li>
            <li>Ism va familyani to'liq kiriting</li>
            <li>Telefon raqamni ham to'ldiring</li>
            <li>O'qishni hohlayotgan faningizni ham to'ldiring</li>
          </ul>
          <button onClick={()=> setModal(false)} className="form__btn">Hammasini tushundim</button>
          </div>
          <GiNotebook/>
          <FaLaptopCode/>
        </div>
      </div> : <></>
      }
      
    
      <RegisterStudentComp isReceptionist={false} />
    </div>
  );
}

export default RegisterStudent;
