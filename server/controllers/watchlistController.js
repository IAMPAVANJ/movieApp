
const Watchlist = require("../Modal/watchlistModel");
const addToWatchlist = async(req,res)=>{
    try{
            const addMovie = new Watchlist({
                ...req.body
           } )
            await addMovie.save();

            return res.status(201).json({
                Message:"Added to Favourite",
                addMovie
            })
       
        
    }catch(err){
        return res.status(400).json({
            Message:err.stack,
            error:"error"
        })
    }
}

const deleteFromWatchlist= async(req,res)=>{
    try{
        const deleteMovie = await Watchlist.findOneAndDelete(
            {_id:req.params.id},
        );
        return res.status(200).json({
            Message:"Movie Removed from Watchlist",
            deleteMovie
        })
    }catch(err){
        return res.status(400).json({
            Message:err.message,
        })
    }
}

const getAllWatchlistMovie = async(req,res)=>{
    try{
        const AllWatchlistMovies = await Watchlist.find({userId:req.params.userId});
        return res.status(200).json({
            message:"Success",
            AllWatchlistMovies
        })
    }catch(err){
        return res.status(400).json({
            message:err.message
        })
    }
}

const getOneWatchlistMovie = async(req,res)=>{
    try{
        const data = await Watchlist.findOne({$and:[
            {userId:req.body.userId},
            {id:req.body.id}
        ]})
        if(data){
            return res.status(200).json({
                success:true,
                message:"Data found",
                data
            })
        }else{
            return res.status(200).json({
                success:false,
                message:"Data not found",
                data
            })
        }
    }catch(err){
        return res.status(400).json({
            message:err.message
        })
    }
}

module.exports = {
                addToWatchlist,
                deleteFromWatchlist,
                getAllWatchlistMovie,
                getOneWatchlistMovie
            }