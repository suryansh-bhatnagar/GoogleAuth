const { response, json } = require('express');
const course = require('../model/courseSchema');

exports.createCourse = async (req, res) => {
    try {
        // Get email and password from request body
        const { courseTitle, courseDuration } = req.body

        // Check if email or password is missing
        if (!courseTitle || !courseDuration) {
            // Return 400 Bad Request status code with error message
            return res.status(400).json({
                success: false,
                message: `Please Fill up All the Required Fields`,
            })
        }

        const newCourse = await course.create({
            courseTitle, courseDuration
        });

        return res.status(200).json({
            success: true,
            course: newCourse
        })

    } catch (error) {
        console.error(error)
        // Return 500 Internal Server Error status code with error message
        return res.status(500).json({
            success: false,
            message: `Cannot create course Please Try Again`,
        })
    }
}
exports.getAllCourse = async (req, res) => {

    try {

        const allCourses = await course.find({}).exec();
        return res.status(200).json({
            success: true,
            courses: allCourses,
        })

    } catch (error) {
        console.error(error)
        // Return 500 Internal Server Error status code with error message
        return res.status(500).json({
            success: false,
            message: `Cannot retrieve all courses Please Try Again`,
        })
    }
}