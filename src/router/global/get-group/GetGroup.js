// @ts-nocheck
import React, { useState, memo, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {
  getOneGroupAction,
  reloadAction,
} from "../../../context/action/action";
import "./GetGroup.css";
import bugalteriya from "../../../assets/Bug'alteriya.jpg";
import dtmTest from "../../../assets/DTM ga tayyorgarlik.jpg";
import english from "../../../assets/english.jpg";
import it from "../../../assets/it.jpg";
import matematika from "../../../assets/matematika.jpg";
import russia from "../../../assets/russia.jpg";

function GetGroup({addStudent,studentID}) {
  const groups = useSelector((s) => s?.getGroups);
  const dispatch = useDispatch();
  const [active, setActive] = useState(false)
  const [type, setType] = useState("all")
  const [filterData, setFilterData] = useState([])

  useEffect(()=>{
    if (type === "all"){
      return setFilterData(groups.filter(i=> i.isActive === active))
    }
    setFilterData(groups.filter(i=> i.major === type && i.isActive === active))
  }, [type,groups,active])

  // console.log(filterData);

  const [images] = useState({
    it: it,
    russia: russia,
    english: english,
    matematika: matematika,
    "DTM ga tayyorgarlik": dtmTest,
    "Bug'alteriya": bugalteriya,
  });
  const addStudentThisGroup = (groupId)=>{
    let data = { groupID: groupId, studentID }
    console.log(data);
  }
  return (
    <div className="global__router">
      <div className="get__navbar">
        <h3>Guruhlar</h3>
        <ul className="get__collection">
          <li onClick={()=>setActive(false)} className={`get__item ${active? "" :"get__item-active"}`}>
            Yangi Guruhlar <span>{groups?.yangiGuruhlar(false).uzunlik}</span>
          </li>
          <li onClick={()=>setActive(true)} className={`get__item ${active? "get__item-active":""}`}>
            Aktiv Guruhlar <span>{groups?.yangiGuruhlar(true).uzunlik}</span>
          </li>
        </ul>
      </div>
      <div className="get__controller">
        <ul className="get__controller-collection">
          <li onClick={()=> setType("all")} className={`get__controller-item ${type==="all"?"get__controller-active":""}`}>
            Barchasi <span>{groups?.yangiGuruhlar(active).uzunlik}</span>
          </li>
          <li onClick={()=> setType("it")} className={`get__controller-item ${type==="it"?"get__controller-active":""} `}>
            IT <span>{groups?.yangiGuruhlar(active).majorIt.length}</span>
          </li>
          <li onClick={()=> setType("english")} className={`get__controller-item ${type==="english"?"get__controller-active":""}`}>
            English <span>{groups?.yangiGuruhlar(active).majorEnglish.length}</span>
          </li>
          <li onClick={()=> setType("russia")} className={`get__controller-item ${type==="russia"?"get__controller-active":""}`}>
            Russian <span>{groups?.yangiGuruhlar(active).majorRussia.length}</span>
          </li>
          <li onClick={()=> setType("DTM ga tayyorgarlik")} className={`get__controller-item ${type==="DTM ga tayyorgarlik"?"get__controller-active":""}`}>
            DTM <span>{groups?.yangiGuruhlar(active).majorDTM.length}</span>
          </li>
          <li onClick={()=> setType("Bug'alteriya")} className={`get__controller-item ${type==="Bug'alteriya"?"get__controller-active":""}`}>
            Bug'alteriya <span>{groups?.yangiGuruhlar(active).majorEconomics.length}</span>
          </li>
          <li onClick={()=> setType("matematika")} className={`get__controller-item ${type==="matematika"?"get__controller-active":""}`}>
            Matematika <span>{groups?.yangiGuruhlar(active).majorMath.length}</span>
          </li>
        </ul>
      </div>
      <div className="get__group-container">
        {filterData?.length ? (
          filterData?.map((item) => {
            const {
              _id: groupId,
              major,
              level,
              // teacherInfo: { firstName, lastName },
              room: { number },
              enrolledStudents,
              day,
              time,
            } = item;
            return (
              <div className="get__group-card" key={groupId}>
                <img src={images[major]} alt={major + " " + level} />
                <h3>
                  {major.capitalLetter()} {level}
                </h3>
                <p>
                  O'qituvchi:{" "}
                  <b>
                    {/* {firstName} {lastName} */}
                  </b>
                </p>
                <p>
                  Guruh xona: <b>{number}-xona</b>
                </p>
                <p>
                  O'quvchilar soni: <b>{enrolledStudents.length} ta</b>
                </p>
                <p>
                  Kun: <i>{day}</i>
                </p>
                <p>
                  Vaqt: <i>{time}</i>
                </p>
                {!enrolledStudents.length ? (
                  <span className="get__student-notGroup">
                    O'quvchi guruhga qo'shilmagan
                  </span>
                ) : (
                  ""
                )}
                <hr className="hr"/>
                {
                  addStudent ? <>
                    <br />
                    <button onClick={()=> addStudentThisGroup(groupId)} className="btn-py">Guruhga qo'shish</button>
                  </>:   <div className="get__group-btn">
                  <Link
                    onClick={() => dispatch(getOneGroupAction(item))}
                    to={groupId}
                  >
                    <button>Batafsil</button>
                  </Link>
                  <button style={{ background: "crimson" }}>O'chirish</button>
                </div>
                }
             
              </div>
            );
          })
        ) : (
          <p>Guruhlar mavjud emas!</p>
        )}
      </div>
    </div>
  );
}

export default memo(GetGroup);
