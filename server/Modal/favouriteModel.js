const mongoose = require('mongoose');
const FavouriteSchema =  mongoose.Schema({
        userId:{type:String,required:true},
        adult: { type: Boolean, required: false },
        backdrop_path: { type: String, required: false },
        id: { type: Number, required: true, unique: true }, 
        overview: { type: String, required: true },
        popularity: { type: Number, required: false },
        poster_path: { type: String, required: false },
        release_date: { type: Date, required: true },
        title: { type: String, required: true },
        vote_average: { type: Number, required: false },
      }
)
const Favourite = mongoose.model('favourite',FavouriteSchema);
module.exports = Favourite;
