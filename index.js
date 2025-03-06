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
app.post("/recipes", async (req, res) => {
    try {
        const recipe = new Recipe(req.body);
        const saveRecipe = await recipe.save();
        if(!saveRecipe)
            res.status(404).json({ error: "Error occurred while saving new Recipe. Please check data format and try again." });
        else 
            res.status(200).json({ message: "New Recipe saved successfully.", "Recipe-Data": saveRecipe });
    } catch (error) {
        res.status(500).json({ error: "Some error occurred with the request to add recipe to DB. Please try again."})
    }
})

app.listen(PORT, () => {
  console.log("Server is running on PORT:", PORT);
});
