const route = require('express').Router();
const { addToWatchlist,
    deleteFromWatchlist,
    getAllWatchlistMovie,
    getOneWatchlistMovie } = require('../controllers/watchlistController');


route.get("/watchlist-movies/:userId",getAllWatchlistMovie);
route.post("/add-watchlist-movies",addToWatchlist);
route.delete("/delete-watchlist-movies/:id",deleteFromWatchlist);
route.post("/single-watchlist-movie",getOneWatchlistMovie)

module.exports = route;