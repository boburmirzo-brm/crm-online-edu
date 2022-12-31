import { useState } from "react";
import axios from "../api";
import { getToken } from "../auth/getToken";

const usePost = (api, postData, reload) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  setLoading(true);
  axios
    .post(api, postData, getToken())
    .then((res) => {
      setData(res.data.data);
    })
    .catch()
    .finally(() => setLoading(false));
  return { loading, data };
};
export { usePost };
