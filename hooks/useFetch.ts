import axios from "axios";

export const useFetch = (url: string, params: any) => {
  return async () => {
    const { data } = await axios.get(url, { params });
    return data;
  };
};
