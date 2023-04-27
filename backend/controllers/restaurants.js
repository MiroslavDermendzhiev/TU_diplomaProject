const Restaurants = require("../models/restaurants");
const fs = require("fs");

//show all restaurants
exports.findAll = (req, res, next) => {
  Restaurants.find()
    .then((restaurants) => {
      res.status(200).json(restaurants);
    })
    .catch((error) => {
      res.status(400).json({
        error: error,
      });
    });
};

//find one restaurant
exports.findOne = (req, res, next) => {
  console.log(req.params.id);

  Restaurants.findOne({ _id: req.params.id }).then((restaurants) => {
    res.status(200).json(restaurants);
  });
};

//create new Restaurnat
exports.newRestaurant = (req, res, next) => {
  const url = `${req.protocol}://${req.get("host")}`;
  const parsedRestaurantPayload = JSON.parse(req.body.restaurants);
  const restaurants = new Restaurants({
    userId: parsedRestaurantPayload.userId,
    name: parsedRestaurantPayload.name,
    imageUrl: url + "/images/" + req.file.filename,
    city: parsedRestaurantPayload.city,
  });
  restaurants
    .save() // method tah we use to save the data to the database; save method returns a promise
    .then(() => {
      //promise, that sends the responce back to the frontend
      res.status(201).json({
        //201 created
        message: "Restaurant saved successfully!",
      });
    })
    .catch((error) => {
      //catching any errors
      res.status(400).json({
        //400 bad request error
        error: error,
      });
    });
};

//update Restaurant
exports.updateRestaurants = (req, res, next) => {
  let restaurants = new Restaurants({ _id: req.params._id });
  if (req.file) {
    const url = req.protocol + "://" + req.get("host");
    const parsedRestaurantsPayload = JSON.parse(req.body.restaurants);
    restaurants = {
      _id: req.params.id,
      userId: parsedRestaurantsPayload.userId,
      name: parsedRestaurantsPayload.name,
      city: parsedRestaurantsPayload.city,
      imageUrl: url + "/images/" + req.file.filename,
    };
  } else {
    restaurants = {
      _id: req.params.id,
      userId: req.body.userId,
      name: req.body.name,
      city: req.body.city,
      imageUrl: url + "/images/" + req.file.filename,
    };
  }

  Restaurants.updateOne({ _id: req.params.id }, restaurants)
    .then(() => {
      res.status(201).json({
        message: "Restaurant updated successfully!",
      });
    })
    .catch((error) => {
      res.status(400),
        json({
          error: error,
        });
    });
};

// delete restaurant
exports.deleteRestaurant = (req, res, next) => {
  Restaurants.findOne({ _id: req.params.id }).then((restaurants) => {
    const filename = restaurants.imageUrl.split("/images/")[1];
    fs.unlink("images/" + filename, () => {
      Restaurants.deleteOne({ _id: req.params.id })
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
  });
};
