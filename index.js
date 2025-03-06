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
    if (!saveRecipe)
      res.status(404).json({
        error:
          "Error occurred while saving new Recipe. Please check data format and try again.",
      });
    else
      res.status(200).json({
        message: "New Recipe saved successfully.",
        "Recipe-Data": saveRecipe,
      });
  } catch (error) {
    res.status(500).json({
      error:
        "Some error occurred with the request to add recipe to DB. Please try again.",
    });
  }
});

//Route to fetch all the recipes from dataBase.
app.get("/recipes", async (req, res) => {
  try {
    const recipeData = await Recipe.find();
    if (!recipeData)
      res.status(404).json({
        error:
          "Either some error occured or there is no entry present in the DB.",
      });
    else
      res.status(200).json({
        message: "All Recipes fetched successfully.",
        "Recipe-Data": recipeData,
      });
  } catch (error) {
    res.status(500).json({
      error: "Some error occured with the request itself. Please try again.",
    });
  }
});

//Route to fetch Recipe Data by it's title.
app.get("/recipes/title/:title", async (req, res) => {
  try {
    const recipeData = await Recipe.findOne({ title: req.params.title });
    if (!recipeData)
      res
        .status(404)
        .json({
          error:
            "No recipe exists with the given title. Please try again with proper data.",
        });
    else
      res
        .status(200)
        .json({
          message: "Recipe with given title fetched successfully.",
          "Recipe-Data": recipeData,
        });
  } catch (error) {
    res
      .status(500)
      .json({
        error: "Some error occured with the request itself. Please try again.",
      });
  }
});

//Route to fetch Recipe Data by it's author.
app.get("/recipes/author/:authorName", async (req, res) => {
  try {
    const recipeData = await Recipe.findOne({ author: req.params.authorName });
    if (!recipeData)
      res
        .status(404)
        .json({
          error:
            "No recipe exists with the given Author. Please try again with proper data.",
        });
    else
      res
        .status(200)
        .json({
          message: "Recipe with given Author fetched successfully.",
          "Recipe-Data": recipeData,
        });
  } catch (error) {
    res
      .status(500)
      .json({
        error: "Some error occured with the request itself. Please try again.",
      });
  }
});

//Route to fetch all Recipe Data what have "Easy" difficulty.
app.get("/recipes/difficulty-easy", async (req, res) => {
  try {
    const recipeData = await Recipe.find({ difficulty: "Easy" });
    if (!recipeData)
      res
        .status(404)
        .json({
          error:
            "No recipe exists with the given difficulty. Please try again with proper data.",
        });
    else
      res
        .status(200)
        .json({
          message: "Recipe with given difficulty fetched successfully.",
          "Recipe-Data": recipeData,
        });
  } catch (error) {
    res
      .status(500)
      .json({
        error: "Some error occured with the request itself. Please try again.",
      });
  }
});

//Route to update the difficulty level of a recipe with it's ID
app.post("/recipes/update-difficulty/:recipeId", async (req, res) => {
  try {
    const recipeData = await Recipe.findByIdAndUpdate(
      req.params.recipeId,
      { difficulty: "Easy" },
      { new: true }
    );
    if(!recipeData)
        res.status(404).json({ error: "Either the recipe with given ID doesn't exist. Or some data error. Please try again with proper data."})
    else
        res.status(200).json({ message: "Data updated successfully.", "New-Recipe-Data": recipeData});
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({
        error: "Some error occured with the request itself. Please try again.",
      });
  }
});

//Route to update the prep time and cook time of a recipe with it's title.
app.post("/recipes/update-timings/:recipeTitle", async (req, res) => {
  try {
    const recipeData = await Recipe.findOneAndUpdate(
      { title: req.params.recipeTitle },
      { prepTime: 40, cookTime: 45 },
      { new: true }
    );
    if(!recipeData)
        res.status(404).json({ error: "Either the recipe with given ID doesn't exist. Or some data error. Please try again with proper data."})
    else
        res.status(200).json({ message: "Data updated successfully.", "New-Recipe-Data": recipeData});
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({
        error: "Some error occured with the request itself. Please try again.",
      });
  }
});

//Route to update the difficulty level of a recipe with it's ID
app.delete("/recipes/:recipeId", async (req, res) => {
    try {
      const recipeData = await Recipe.findByIdAndDelete(req.params.recipeId);
      if(!recipeData)
          res.status(404).json({ error: "Either the recipe with given ID doesn't exist. Or some data error. Please try again with proper data."})
      else
          res.status(200).json({ message: "Recipe Deleted Successfully." });
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({
          error: "Some error occured with the request itself. Please try again.",
        });
    }
  });

app.listen(PORT, () => {
  console.log("Server is running on PORT:", PORT);
});
