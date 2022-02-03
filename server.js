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
    host: "127.0.0.1",
    port: 5432,
    user: "",
    password: "",
    database: "smart-brain",
  },
});

const app = express();

app.use(express.json());
app.use(cors());


app.post("/signin", signIn.handleSignIn(db, bcrypt));
app.post("/register", register.handleRegister(db, bcrypt));
app.get("/profile/:id", profile.handleProfileGet(db));
app.put("/image", image.handleImage(db));
app.post("/imageurl", image.handleApiCall);

app.listen(process.env.PORT || 3000, () => {
  console.log(`App is running on port ${process.env.PORT}`);
});
