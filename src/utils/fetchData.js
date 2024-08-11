import axios from "axios";

export const fetchApiData = async (url) => {
  let allData = [];
  let totalCount = 0;
  let nextUrl = url;

  try {
    while (nextUrl) {
      const response = await axios.get(nextUrl);
      const { count, next, results } = response.data;

      if (totalCount === 0) {
        totalCount = count;
      }

      allData = [...allData, ...results];
      nextUrl = next;
    }

    return { allData, totalCount };
  } catch (error) {
    throw new Error(error.message);
  }
};
