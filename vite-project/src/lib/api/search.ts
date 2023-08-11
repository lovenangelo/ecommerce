import axiosClient from "../axios";

const getSearchResults = async (base: string | null, search: string) => {
  if (search.length !== 0)
    return await axiosClient.get(base ?? "/api/search", {
      params: {
        search: search,
      },
    });
};

export default getSearchResults;
