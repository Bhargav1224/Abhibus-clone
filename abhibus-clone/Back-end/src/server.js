const express = require("express");
const passport = require("./config/passport");
const connect = require("./config/db");

const app = express();

app.use(express.json());
//-----------------CRUD operation on user Schema ----------------
const userController = require('./controllers/user.controller');
app.use('/users',userController)

//-----------------CRUD operation on user Schema ----------------
const routeController = require('./controllers/route.controller');
app.use('/routes',routeController)

//-----------------CRUD operation on user Schema ----------------
const busController = require('./controllers/bus.controller');
app.use('/buses',busController)


//------------Creating GOOGLE OAUTH  Using passport js -----------------------
app.use(passport.initialize());
app.use(passport.session());


passport.serializeUser(function (user, done) {
    done(null, "user");
});

passport.deserializeUser(function (id, done) {
    done(null, "user");
});

app.get(
    "/auth/google",
    passport.authenticate("google", {
        scope: [
            "https://www.googleapis.com/auth/userinfo.profile",
            "https://www.googleapis.com/auth/userinfo.email",
        ],
    }),
);

app.get(
    "/auth/google/callback",
    passport.authenticate("google", { failureRedirect: "/login" }),
    function (req, res) {
        const { user, token } = req.user;
        res.status(200).json({
            user: user,
            token: token,
            message: "you are authenticated",
        });
    },
);

//--------Staring the server ---------------------
const start = async () => {
	await connect();
	app.listen(8000, () => {
		console.log("Listening on port 8000");
	});
};

module.exports = start;
