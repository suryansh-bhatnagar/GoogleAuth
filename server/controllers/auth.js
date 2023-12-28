const userdb = require("../model/userSchema")
const bcrypt = require("bcrypt");
const { request } = require("express");
const jwt = require("jsonwebtoken")
require("dotenv").config();


exports.isAuth = async (req, res, next) => {
    try {

        if (!req.user) {
            console.log('Inside !req.user')

            // Extracting JWT from request cookies, body or header
            const token = req.header("Authorization").replace("Bearer ", "");
            // If JWT is missing, return 401 Unauthorized response
            if (!token) {
                return res.status(401).json({ success: false, message: `Token Missing` });
            }

            try {
                // Verifying the JWT using the secret key stored in environment variables
                const decode = await jwt.verify(token, process.env.JWT_SECRET);
                console.log(decode);
                // Storing the decoded JWT payload in the request object for further use
                req.user = decode;
            } catch (error) {
                // If JWT verification fails, return 401 Unauthorized response
                return res
                    .status(401)
                    .json({ success: false, message: "token is invalid" });
            }
        }
        // If JWT is valid, move on to the next middleware or request handler
        next();
    } catch (error) {
        // If there is an error during the authentication process, return 401 Unauthorized response
        return res.status(401).json({
            success: false,
            message: `Something Went Wrong While Validating the Token`,
        });
    }
}
exports.login = async (req, res) => {
    try {
        // Get email and password from request body
        const { email, password } = req.body

        // Check if email or password is missing
        if (!email || !password) {
            // Return 400 Bad Request status code with error message
            return res.status(400).json({
                success: false,
                message: `Please Fill up All the Required Fields`,
            })
        }

        // Find user with provided email
        const user = await userdb.findOne({ email })

        // If user not found with provided email
        if (!user) {
            // Return 401 Unauthorized status code with error message
            return res.status(401).json({
                success: false,
                message: `User is not Registered with Us Please SignUp to Continue`,
            })
        }

        // Generate JWT token and Compare Password
        if (await bcrypt.compare(password, user.password)) {
            const token = jwt.sign(
                { email: user.email, id: user._id, displayName: user.displayName },
                process.env.JWT_SECRET,
                {
                    expiresIn: "24h",
                }
            )


            return res.status(200).json({
                success: true,
                token,
                user,
                message: `User Login Success`,
            })
        } else {
            return res.status(401).json({
                success: false,
                message: `Password is incorrect`,
            })
        }
    } catch (error) {
        console.error(error)
        // Return 500 Internal Server Error status code with error message
        return res.status(500).json({
            success: false,
            message: `Login Failure Please Try Again`,
        })
    }
}


exports.signup = async (req, res) => {
    const { displayName, email, password } = req.body;

    try {
        if (!email || !password || !displayName) {
            return res.status(400).json({ message: 'All fields are required' });
        }
        let existingUser = await userdb.findOne({ email });

        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await userdb.create({
            displayName,
            email,
            password: hashedPassword,
            image: `https://api.dicebear.com/5.x/initials/svg?seed=${displayName}`
        });

        // Generate JWT and send it back to the frontend
        // For example: const token = generateToken(newUser);
        return res.status(200).json({ message: "User signed in successfully", user: newUser })
    } catch (error) {
        res.status(500).json({ message: 'Signup failed' });
    }
}

