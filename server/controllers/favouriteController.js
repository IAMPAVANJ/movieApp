
const Favourite = require("../Modal/favouriteModel");
const addToFavourite = async(req,res)=>{
    try{
            const addMovie = new Favourite({
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

const deleteFromFavourite = async(req,res)=>{
    try{
        const deleteMovie = await Favourite.findOneAndDelete(
            {_id:req.params.id},
        );
        return res.status(200).json({
            Message:"Movie Removed from favourites",
            deleteMovie
        })
    }catch(err){
        return res.status(400).json({
            Message:err.message,
        })
    }
}

const getAllFavouriteMovie = async(req,res)=>{
    try{
        const AllFavouriteMovies = await Favourite.find({userId:req.params.userId});
        return res.status(200).json({
            message:"Success",
            AllFavouriteMovies
        })
    }catch(err){
        return res.status(400).json({
            message:err.message
        })
    }
}

const getOneFavouriteMovie = async(req,res)=>{
    const {userId} = req.body;
    console.log(userId)
    try{
        const data = await Favourite.findOne({$and:[
            {userId:req.body.userId},
            {id:req.body.id}
        ]})
        console.log(data)
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
                addToFavourite,
                deleteFromFavourite,
                getAllFavouriteMovie,
                getOneFavouriteMovie
            }