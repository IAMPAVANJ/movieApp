const express = require('express');
const app = express();
const cors = require('cors');
const UserRoutes = require('./Routes/userRoutes');
const FavouriteMovies = require("./Routes/favouriteRoute");
const WatchlistMovies = require("./Routes/watchlistRoutes");
const WakeUpCall = require("./Routes/wakeUpRoute");
const connect = require('./dbConnection/Connection');
const port = 8080;
const dotenv = require('dotenv');
dotenv.config();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:false}));

connect();

app.use("/user",UserRoutes);
app.use("/movies",FavouriteMovies);
app.use("/movies",WatchlistMovies);
app.use("/call",WakeUpCall);



app.listen(port,()=>{
    console.log(`Server is up at ${port}`)
})

