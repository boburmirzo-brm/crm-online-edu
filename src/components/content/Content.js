import React, {memo, useState, useEffect} from 'react'
import "./Content.css"
import axios from '../../api/index';
import { FiTrash } from "react-icons/fi"

function Content({content,setContentReload}) {
    const [title, setTitle] = useState("")

    const handleSubmit = (e)=>{
        e.preventDefault()
        axios.patch(`/api/contents/${content[0]?._id}`, {
            title
        }).then(()=>{
            setContentReload(p=>!p)
            setTitle("")
        }).catch(err=>{
            console.log(err);
        })
    }
    const handleDeleteContent = (id)=>{
        axios.delete(`/api/contents/${content[0]?._id}`, {
            method: "DELETE",
            params: {id}
        })
        .then(()=>{
            setContentReload(p=>!p)
        }).catch(err=>{
            console.log(err);
        })
    }
  return (
    <div className='content'>
        <form onSubmit={handleSubmit} className="content__form">
            <input required value={title} onChange={e=>setTitle(e.target.value)} type="text" />
            <button>Qo'shish</button>
        </form>
        <ul className="content__container">
            {
                content[0]?.titles?.reverse()?.map(({id,title}, inx)=> <li key={inx} className='content__item'>
                    <b>{content[0]?.titles.length-inx}. </b>
                    <span>{title}</span>
                    <button onClick={()=> handleDeleteContent(id)}><FiTrash/></button>
                </li> )
            }
        </ul>
    </div>
  )
}

export default Content