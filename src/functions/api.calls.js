import axios from "axios";

/* API CALLS */
  /* GET all */ 
  const fetchAll = async (url) => {
    try {
      const { data } = await axios.get(url);
      return data;
    } catch (error) {
      console.log("Could not fetch all data: ",error);
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
      const response = await axios.post(url, body)
      return response
    } catch (error) {
      console.log("Could not create new entry: ", error)
      throw error
    }
  };
  
  /* DELETE one */
  const deleteOne = async (url) => {
    try {
      await axios.delete(url);
    } catch (error) {
      console.log("Could not fetch specific data: ", error);
    }
  };

  export {
    fetchAll,
    fetchOne,
    updateOne,
    postOne,
    deleteOne
  }