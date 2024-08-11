import { useEffect, useState } from "react";
import { PLANETS_URL } from "../utils/constants";

const useGetHomeWorldData = (homeworldAPI) => {
  const [homeWorldData, setHomeWorldData] = useState(null);

  const getHomeWorldData = async () => {
    const response = await fetch(homeworldAPI);
    const jsonData = await response.json();

    console.log(jsonData);

    setHomeWorldData(jsonData);
  };

  useEffect(() => {
    getHomeWorldData();
  }, []);

  return homeWorldData;
};

export default useGetHomeWorldData;
