import express from "express";
import db from "../db/conn.mjs";
import { ObjectId } from "mongodb";

const router = express.Router();

// This section will help you get a list of all the recipes.
router.get("/", async (req, res) => {
  let collection = await db.collection("recipes");
  let results = await collection.find({}).toArray();
  res.send(results).status(200);
});

// This section will help you get a single recipe by id
router.get("/:id", async (req, res) => {
  let collection = await db.collection("recipes");
  let query = { _id: new ObjectId(req.params.id) };
  let result = await collection.findOne(query);

  if (!result) res.send("Not found").status(404);
  else res.send(result).status(200);
});

// This section will help you create a new recipe.
router.post("/", async (req, res) => {
  let newDocument = {
    title: req.body.title,
    ingredients: req.body.ingredients,
    instructions: req.body.instructions,
    servings: req.body.servings
  };
  let collection = await db.collection("recipes");
  let result = await collection.insertOne(newDocument);
  res.send(result).status(204);
});

// This section will help you update a recipe by id.
router.patch("/:id", async (req, res) => {
  const query = { _id: new ObjectId(req.params.id) };
  const updates =  {
    $set: {
      title: req.body.title,
      ingredients: req.body.ingredients,
      instructions: req.body.instructions,
      servings: req.body.servings
    }
  };

  let collection = await db.collection("recipes");
  let result = await collection.updateOne(query, updates);

  res.send(result).status(200);
});

// This section will help you delete a recipe
router.delete("/:id", async (req, res) => {
  const query = { _id: new ObjectId(req.params.id) };

  const collection = db.collection("recipes");
  let result = await collection.deleteOne(query);

  res.send(result).status(200);
});


export default router;