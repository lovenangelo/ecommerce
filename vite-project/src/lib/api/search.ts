import axiosClient from "../axios";

const getSearchResults = async (search: string) => {
  return await axiosClient.get("/api/search", {
    params: {
      search: search,
    },
  });
};

export const getNextData = async (url: string) => {
  return await axiosClient.get(url);
};

export default getSearchResults;
