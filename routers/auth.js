const bcrypt = require("bcrypt");
const { Router } = require("express");
const { toJWT, toData } = require("../auth/jwt");
const authMiddleware = require("../auth/middleware");
const User = require("../models/").user;
const ShoppingList = require("../models").shoppinglist;
const Artwork = require("../models/").artwork;
const { SALT_ROUNDS } = require("../config/constants");

const router = new Router();

router.post("/login", async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .send({ message: "Please provide both email and password" });
    }

    const user = await User.findOne({ where: { email } });

    if (!user || !bcrypt.compareSync(password, user.password)) {
      return res.status(400).send({
        message: "User with that email not found or password incorrect",
      });
    }

    delete user.dataValues["password"]; // don't send back the password hash
    const token = toJWT({ userId: user.id });
    return res.status(200).send({ token, ...user.dataValues });
  } catch (error) {
    console.log(error);
    return res.status(400).send({ message: "Something went wrong, sorry" });
  }
});

router.post("/signup", async (req, res) => {
  const { email, password, firstName, lastName } = req.body;

  if (!email || !password || !firstName || !lastName) {
    return res.status(400).send("Please provide all the required fields");
  }

  try {
    const newUser = await User.create({
      email,
      password: bcrypt.hashSync(password, SALT_ROUNDS),
      firstName,
      lastName,
    });

    delete newUser.dataValues["password"]; // don't send back the password hash

    const token = toJWT({ userId: newUser.id });

    res.status(201).json({ token, ...newUser.dataValues });
  } catch (error) {
    if (error.name === "SequelizeUniqueConstraintError") {
      return res
        .status(400)
        .send({ message: "There is an existing account with this email" });
    }

    return res.status(400).send({ message: "Something went wrong, sorry" });
  }
});

// router.get("/me", authMiddleware, async (req, res) => {
//   // don't send back the password hash
//   delete req.user.dataValues["password"];
//   res.status(200).send({ ...req.user.dataValues });
// });

// router.post("/shoppinglist/:user", authMiddleware, async (req, res) => {
//   try {
//     const { shoppingList, userId } = req.body;
//     console.log("userId", userId);
//     console.log("request", shoppingList);
//   } catch (e) {
//     next(e);
//   }

//   res.status(200).send({ ...req.user.dataValues });
// });

module.exports = router;
