import { useState, useEffect } from "react";
import axios from "../api";
import { getToken } from "../auth/getToken";

const useFetch = (/** @type {string} */ api, /** @type {boolean} */ reload) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [fetchError, setFetchError] = useState("");
  useEffect(() => {
    if (getToken()) {
      setLoading(true);
      axios
        .get(api, getToken())
        .then((res) => {
          setData(res.data.data);
        })
        .catch((err) => {
          setFetchError(err.response.data.msg);
        })
        .finally(() => setLoading(false));
    }
  }, [api, reload]);
  return { loading, fetchError, data };
};
export { useFetch };
