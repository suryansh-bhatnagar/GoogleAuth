require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
require("./db/conn")
const PORT = 6005;
const session = require("express-session");
const passport = require("passport");
const OAuth2Strategy = require("passport-google-oauth2").Strategy;
const userdb = require("./model/userSchema")
const bcrypt = require("bcrypt");
const { signup, login, isAuth } = require("./controllers/auth");
const { createCourse, getAllCourse } = require("./controllers/course");
const { FRONTEND_URL } = require("./Constants");
const clientid = process.env.CLIENT_ID
const clientsecret = process.env.CLIENT_SECRET



app.use(cors({
    origin: FRONTEND_URL,
    methods: "GET,POST,PUT,DELETE",
    credentials: true
}));
app.use(express.json());

// setup session
app.use(session({
    secret: "YOUR SECRET KEY",
    resave: false,
    saveUninitialized: true
}))

// setuppassport
app.use(passport.initialize());
app.use(passport.session());

passport.use(
    new OAuth2Strategy({
        clientID: clientid,
        clientSecret: clientsecret,
        callbackURL: "/auth/google/callback",
        scope: ["profile", "email"]
    },
        async (accessToken, refreshToken, profile, done) => {
            try {
                let user = await userdb.findOne({ googleId: profile.id });

                if (!user) {
                    user = new userdb({
                        googleId: profile.id,
                        displayName: profile.displayName,
                        email: profile.emails[0].value,
                        image: profile.photos[0].value
                    });

                    await user.save();
                }

                return done(null, user)
            } catch (error) {
                return done(error, null)
            }
        }
    )
)

passport.serializeUser((user, done) => {
    done(null, user);
})

passport.deserializeUser((user, done) => {
    done(null, user);
});

// initial google ouath login
app.get("/auth/google", passport.authenticate("google", { scope: ["profile", "email"] }));

app.get("/auth/google/callback", passport.authenticate("google", {
    successRedirect: `${FRONTEND_URL}/dashboard`,
    failureRedirect: `${FRONTEND_URL}/login`
}))

// Manual  Endpoint
app.post('/auth/signup', signup);
app.post('/auth/login', login);
app.post('/course/create', createCourse)
app.get('/course/getAll', getAllCourse)



app.get("/login/sucess", isAuth, async (req, res) => {
    if (req.user) {
        res.status(200).json({ message: "user Login", user: req.user })
    } else {
        res.status(400).json({ message: "Not Authorized" })
    }
})

app.get("/logout", (req, res, next) => {
    req.logout(function (err) {
        if (err) { return next(err) }
        res.redirect(FRONTEND_URL);
    })
})

app.listen(PORT, () => {
    console.log(`server start at port no ${PORT}`)
})