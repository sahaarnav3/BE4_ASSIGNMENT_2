const express = require("express");
const app = express();
require("dotenv").config();
const PORT = process.env.PORT || 3000;

const { initialiseDatabase } = require("./db/db.connect");
const Recipe = require("./models/recipe.models");

app.use(express.json());

initialiseDatabase();

//Homepage
app.get("/", (req, res) => {
  res.send("<h1>Welcome..!</h1>");
});

//Route to create a new Recipe Entry..
app.post("")

app.listen(PORT, () => {
  console.log("Server is running on PORT:", PORT);
});
