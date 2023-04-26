const mongoose = require("mongoose");

const restaurantSchema = mongoose.Schema({
  userId: { type: String, required: true },
  imageUrl: { type: String, required: true },
  name: { type: String, required: true },
  city: { type: String, required: true },
});

module.exports = mongoose.model('Restaurant', restaurantSchema);