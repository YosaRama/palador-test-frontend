import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:8000",
  timeout: 40000,
  headers: {
    Accept: "application/json, text/plain, */*",
    "Content-Type": "application/json; charset=utf-8",
  },
});

export const fetcher = async (url) => {
  return await instance.get(url).then(async (res) => {
    var results = await res.data;

    if (!results) {
      throw Error(results.message);
    }

    return results;
  });
};

export default instance;
