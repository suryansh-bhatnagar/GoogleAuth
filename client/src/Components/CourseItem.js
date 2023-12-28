import React from 'react'
import DevicesSharpIcon from '@mui/icons-material/DevicesSharp';

const CourseItem = ({ course }) => {
    return (
        <div className='flex gap-2 bg-gray-200 px-2 py-3 border border-black '>
            <DevicesSharpIcon />
            <p>{course.courseTitle}</p>
            <p>({course.courseDuration})</p>
        </div>
    )
}

export default CourseItem