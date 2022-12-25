import { useState, useEffect } from "react";
import axios from "../api";

const useFetch = (/** @type {string} */ api, /** @type {boolean} */ reload) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  useEffect(() => {
    setLoading(true);
    axios
      .get(api)
      .then((res) => {
        setData(res.data.data);
      })
      .catch()
      .finally(() => setLoading(false));
  }, [api, reload]);
  return { loading, data };
};
export { useFetch };
