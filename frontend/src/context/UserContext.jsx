import axios from 'axios';
import React, { createContext, useState } from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


export const dataContext = createContext();

function UserContext({ children }) {
  let [userData, setUserData] = useState(null);

  const serverUrl = "http://localhost:5000";

  const navigate = useNavigate()

  const getUserdata = async () => {
    try {
      const { data } = await axios.get(serverUrl + "/api/getuserdata",{
        withCredentials:true
      });
      setUserData(data);
    } catch (error) {
      navigate('/login')
      console.error(error);
    }
  };

  const value = {
    serverUrl,
    userData,
    setUserData,
    getUserdata
  
  };


  useEffect(()=>{
    getUserdata()
  },[])

  return (
    <dataContext.Provider value={value}>
      {children}
    </dataContext.Provider>
  );
}

export default UserContext;