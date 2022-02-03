const express = require("express");
const cors = require("cors");
const bcrypt = require("bcrypt");
const knex = require("knex");

const register = require('./controllers/register');
const signIn = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const db = knex({
  client: "pg",
  connection: {
    connectionString: process.env.DATABASE_URL,
    ssl: true
  },
});

const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => res.json('it is working'))
app.post("/signin", signIn.handleSignIn(db, bcrypt));
app.post("/register", register.handleRegister(db, bcrypt));
app.get("/profile/:id", profile.handleProfileGet(db));
app.put("/image", image.handleImage(db));
app.post("/imageurl", image.handleApiCall);

app.listen(process.env.PORT || 3000, () => {
  console.log(`App is running on port ${process.env.PORT}`);
});
