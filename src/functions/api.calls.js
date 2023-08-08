import axios from "axios";

/* API CALLS */
  /* GET all */ 
  const fetchAll = async (url) => {
    try {
      const { data } = await axios.get(url);
      return data;
    } catch (error) {
      console.log(error);
    }
  };

  /* GET one */
  const fetchOne = async (url) => {
    try {
      const { data } = await axios.get(url);
      return data;
    } catch (error) {
      console.log("Could not fetch specific data: ", error);
    }
  };

  /* PUT one */ 
  const updateOne = async (url, body) => {
    try {
      await axios.put(url, body);
    } catch (error) {
      console.log("Could not update specific entry: ", error);
    }
  };

  /* POST one */ 
  const postOne = async (url, body) => {
    try {
      await axios.post(url, body);
      console.log("Created successfully")
    } catch (error) {
      console.log("Could not create new entry: ", error);
    }
  };

  export {
    fetchAll,
    fetchOne,
    updateOne,
    postOne,
  }