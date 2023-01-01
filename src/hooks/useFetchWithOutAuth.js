// @ts-nocheck
import { useState, useEffect } from "react";
import axios from "../api";

const useFetchWithOutAuth = (
  /** @type {string} */ api,
  /** @type {string} */ token
) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [fetchError, setFetchError] = useState("");
  useEffect(() => {
    if (token.length) {
      setLoading(true);
      axios
        .get(api, token)
        .then((res) => {
          setData(res.data.data);
        })
        .catch((err) => {
          setFetchError(err.response.data.msg);
        })
        .finally(() => setLoading(false));
    }
  }, [api, token]);
  return { loading, fetchError, data };
};
export { useFetchWithOutAuth };
