const route = require('express').Router();
const { getAllFavouriteMovie, addToFavourite, deleteFromFavourite, getOneFavouriteMovie } = require('../controllers/favouriteController');


route.get("/favourite-movies/:userId",getAllFavouriteMovie);
route.post("/add-favourite-movies",addToFavourite);
route.delete("/delete-favourite-movies",deleteFromFavourite);
route.post("/single-favourite-movie",getOneFavouriteMovie)

module.exports = route;