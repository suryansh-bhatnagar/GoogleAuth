import axios from 'axios';
import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom';

const Dashboard = () => {

  const navigate = useNavigate();
  const params = useParams()
  console.log('On dashboard', params)
  const getUser = async () => {
    try {
      const response = await axios.get("http://localhost:6005/login/sucess", { withCredentials: true });

      console.log("response", response)
    } catch (error) {
      navigate("*")
    }
  }


  useEffect(() => {
    // getUser()
  }, [])
  return (
    <div style={{ textAlign: "center" }}>
      <h1>Dashboard</h1>
    </div>
  )
}

export default Dashboard