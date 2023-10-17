const mongoose = require("mongoose");

const staedteSchema = new mongoose.Schema({
  ort: String,
  ortUrl: String,
  hauptort: String,
  hauptortUrl: String,
  bundesland: String,
  bundeslandUrl: String,
  latitude: Number,
  longitude: Number,
  short_code: String,
});

const StaedteListe = mongoose.model("staedte_geo", staedteSchema);

module.exports = StaedteListe;
