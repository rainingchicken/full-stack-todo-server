const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

async function signup(req, res) {
  try {
    //get email and password off req body
    const { email, password } = req.body;

    //hash password
    const hashedPassword = bcrypt.hashSync(password, 8);

    //create user with that data
    await User.create({ email, password: hashedPassword });
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(400);
  }
}

async function login(req, res) {
  // get email and password off rq body
  const { email, password } = req.body;
  try {
    //find user with requested email
    const user = await User.findOne({ email });
    if (!user) return res.sendStatus(401);

    //compare sent in password with found user password hash
    const passwordMatch = bcrypt.compareSync(password, user.password);
    if (!passwordMatch) return res.sendStatus(401);

    //create jwt token
    const exp = Date.now() + 1000 * 60 * 60 * 24 * 30;

    const token = jwt.sign({ sub: user._id, exp }, process.env.SECRET);

    //set the cookie
    res.cookie("Authorization", token, {
      expires: new Date(exp),
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
    });

    //sendit
    res.sendStatus(200);
  } catch (error) {
    res.sendStatus(400);
  }
}

function checkAuth(req, res) {
  try {
    res.sendStatus(200);
  } catch (error) {
    res.sendStatus(400);
  }
  // console.log(req.user);
}

function logout(req, res) {
  try {
    res.clearCookie("Authorization");
    res.sendStatus(200);
  } catch (error) {
    res.sendStatus(400);
  }
}

module.exports = {
  signup,
  login,
  logout,
  checkAuth,
};
