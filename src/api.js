const express = require("express");
const serverless = require("serverless-http");
const cors = require("cors");
const bcrypt = require("bcrypt");
const knex = require("knex");

const register = require("./controllers/register");
const signIn = require("./controllers/signin");
const profile = require("./controllers/profile");
const image = require("./controllers/image");

const db = knex({
  client: "pg",
  connection: {
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false,
    },
  },
});

const app = express();

app.use(express.json());
app.use(cors());
const router = express.Router();


router.get("/", (req, res) => res.json("it is working"));
router.post("/signin", signIn.handleSignIn(db, bcrypt));
router.post("/register", register.handleRegister(db, bcrypt));
router.get("/profile/:id", profile.handleProfileGet(db));
router.put("/image", image.handleImage(db));
router.post("/imageurl", image.handleApiCall);

app.listen(process.env.PORT || 3000, () => {
  console.log(`App is running on port ${process.env.PORT}`);
});
