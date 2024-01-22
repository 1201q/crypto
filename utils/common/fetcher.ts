import axios from "axios";

const fetcher = async (url: string) => {
  const URL = process.env.NEXT_PUBLIC_API_URL + url;
  return axios.get(URL).then((res) => res.data);
};

export default fetcher;
