import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import CourseItem from './CourseItem';
import { AuthContext } from '../Context/AuthContext';
import { SERVER_URL } from '../Constants';

const Dashboard = () => {

  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const params = useParams()
  const { token } = useContext(AuthContext);
  console.log('On dashboard', params)
  const getUser = async () => {
    try {
      const response = token === null ? await axios.get(`${SERVER_URL}/login/sucess`, { withCredentials: true }) : await axios.get(`${SERVER_URL}/login/sucess`, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        }
      });

      console.log("response", response)
    } catch (error) {
      navigate("*")
    }
  }

  const getAllCourses = async () => {
    const response = await axios.get(`${SERVER_URL}/course/getAll`, {
      courseTitle: "React bootcamp",
      courseDuration: "300 hours"
    })
    setCourses(response.data.courses);
    console.log("All courses", response)
  }


  useEffect(() => {
    getUser()
    getAllCourses()
  }, [])
  return (
    <div className=' w-1/3 mx-auto my-16 flex flex-col gap-6'>
      <h1 className='text-3xl font-semibold text-center'>Welcome to freeCodeCamp.org</h1>
      <div className='text-center'>
        <p>"I have not failed. I've just found 10,000 ways</p>
        <p>that won't work."</p>
        <p className='italic text-sm'>-Thomas A. Edison</p>

      </div>
      {courses?.map((course) => <CourseItem course={course} />)}

    </div>
  )
}

export default Dashboard