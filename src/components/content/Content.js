import React, { memo, useState, useEffect } from "react";
import "./Content.css";
import axios from "../../api/index";
import { FiTrash } from "react-icons/fi";
import { getToken } from "../../auth/getToken";

function Content({ content, setContentReload }) {
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .patch(
        `/api/contents/${content[0]?._id}`,
        {
          title,
        },
        getToken()
      )
      .then(() => {
        setContentReload((p) => !p);
        setTitle("");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleDeleteContent = (id) => {
    setLoading(true);
    axios
      .delete(`/api/contents/${content[0]?._id}`, {
        ...getToken(),
        params: { id },
      })
      .then(() => {
        setContentReload((p) => !p);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  return (
    <div className="content">
      <h3 className="content__title">O'tilgan mavzular</h3>
      <form onSubmit={handleSubmit} className="content__form">
        <input
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          type="text"
        />
        <button>Qo'shish</button>
      </form>
      <ul className="content__container">
        {reverseArray(content[0]?.titles)?.map(({ id, title }, inx) => (
          <li key={inx} className="content__item">
            <b>{content[0]?.titles.length - inx}. </b>
            <span>{title}</span>
            <button
              disabled={loading}
              className="btn-danger"
              onClick={() => handleDeleteContent(id)}
            >
              <FiTrash />
            </button>
          </li>
        ))}
        {!content[0]?.titles.length && (
          <p style={{ color: "crimson" }}>Hali mavzular kiritilmagan</p>
        )}
      </ul>
    </div>
  );
}

export default memo(Content);

function reverseArray(arr) {
  var newArr = [];
  for (var i = 0, j = arr.length - 1; i < arr.length; i++, j--) {
    newArr[i] = arr[j];
  }
  return newArr;
}
