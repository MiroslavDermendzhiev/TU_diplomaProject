//mongodb+srv://MiroBeroe:Miroberoe22@cluster0.ilvgk7r.mongodb.net/?retryWrites=true&w=majority
// this file contains our express app
const express = require("express");
const mongoose = require("mongoose");

const Restaurant = require("./models/restaurants");

const app = express(); // where we're going to write our express app

const enableCors = (req, resp, next) => {
  resp.setHeader("Access-Control-Allow-Origin", "*");
  resp.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  resp.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
};
//connect the project to mongoDB
mongoose
  .connect(
    "mongodb+srv://MiroslavDermendzhiev:Miroberoe22@cluster0.5gnwjnv.mongodb.net/?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("Successfully connected to MongoDB Atlas!");
  })
  .catch((error) => {
    console.log("Unable to connect to MongoDB Atlas!");
    console.error(error);
  });

app.use(enableCors);
app.use(express.json());

//saving restaurant to the database
app.post("/api/restaurants", (req, res, next) => {
  const restaurant = new Restaurant({
    // _id: { type: String, required: true},
    userId: req.body.userId,
    imageUrl: req.body.imageUrl,
    name: req.body.name,
    city: req.body.city,
  });
  restaurant
    .save()
    .then(() => {
      res.status(201).json({
        message: "Post saved successfully!",
      });
    })
    .catch((error) => {
      res.status(400).json({
        error: error,
      });
    });
});

//retrieving list of restaurants from the database
app.use("/api/restaurants", (req, res, next) => {
  Restaurant.find()
    .then((restaurant) => {
      res.status(200).json(restaurant);
    })
    .catch((error) => {
      res.status(400).json({
        error: error,
      });
    });
});

// retrieving one restaurant from the database
app.get("/api/restaurants/:id", (req, res, next) => {
  Restaurant.findOne({
    _id: req.params.id,
  })
    .then((restaurant) => {
      res.status(200).json(restaurant);
    })
    .catch((error) => {
      res.status(404).json({
        error: error,
      });
    });
});

//update an existing restaurant
app.put("/api/restaurants/:id", (req, res, next) => {
  const restaurant = new Restaurant({
    _id: req.params.id,
    userId: req.body.userId,
    imageUrl: req.body.imageUrl,
    name: req.body.name,
    city: req.body.city,
  });
  Thing.updateOne({ _id: req.params.id }, restaurant)
    .then(() => {
      res.status(201).json({
        message: "Thing updated successfully!",
      });
    })
    .catch((error) => {
      res.status(400).json({
        error: error,
      });
    });
});

//delete a restaurant
app.delete("/api/restaurants/:id", (req, res, next) => {
  Restaurant.deleteOne({ _id: req.params.id })
    .then(() => {
      res.status(200).json({
        message: "Deleted!",
      });
    })
    .catch((error) => {
      res.status(400).json({
        error: error,
      });
    });
});

module.exports = app; // exporting the app so we can use it outside this js file
