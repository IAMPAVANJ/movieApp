import React,{useEffect,useState} from 'react';
import Skeleton , {SkeletonTheme} from 'react-loading-skeleton';
import {useSelector,useDispatch} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import "./casd.css";
import {Link} from 'react-router-dom';
import axios from 'axios';
import { deleteFromFavourite, deleteFromWatchlist, setOneFavouriteMovie, setOneWatchlistMovie } from '../../store/slices/mainSlice';



const Card = ({movie}) => {
    const [isLoading,setIsLoading] = useState(true);
    const favouriteMovies = useSelector((state)=>state.mainSlice.favoriteMovie);
    const watchlistMovie = useSelector((state)=>state.mainSlice.watchlistMovie);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = JSON.parse(localStorage.getItem('userData'));
    function checkfav(movie){
        if(favouriteMovies.length == 0){
            return false
        }else{
            const isFav =  favouriteMovies.some((data)=>data.id == movie.id);
            return isFav;
        }
    }
    function checkWatch(movie){
        if(watchlistMovie.length == 0){
            return false
        }else{
            const isWatch =  watchlistMovie.some((data)=>data.id == movie.id);
            return isWatch;
        }
    }
    
    useEffect(()=>{
        if(user=={}){
            navigate("/")
        }
    },[])

    const handleFavourite = ()=>{
        if(checkfav(movie)==false){
            
                    let Obj = {
                        userId:user?._id,...movie
                    }
                    axios.post('https://movie-app-ds4w.vercel.app/movies/add-favourite-movies',Obj)
                    .then((res)=>{
                        dispatch(setOneFavouriteMovie(Obj))
                    })
                    .catch((err)=>{
                        console.log(err)
                    })

        }else{
            let obj = {
                userId:user?._id,
                id:movie.id
            }
            axios.delete(`https://movie-app-ds4w.vercel.app/movies/delete-favourite-movies/${movie._id}`)
                    .then((res)=>{
                        dispatch(deleteFromFavourite(obj))
                    })
                    .catch((err)=>{
                        console.log(err)
                    })
        }
    }

    const handleWatch = ()=>{
        if(checkWatch(movie)==false){
            
                    let Obj = {
                        userId:user?._id,...movie
                    }
                    axios.post('https://movie-app-ds4w.vercel.app/movies/add-watchlist-movies',Obj)
                    .then((res)=>{
                        dispatch(setOneWatchlistMovie(Obj))
                    })
                    .catch((err)=>{
                        console.log(err)
                    })

        }else{
            let obj = {
                userId:user?._id,
                id:movie.id
            }
            axios.delete(`https://movie-app-ds4w.vercel.app/movies/delete-watchlist-movies/${movie._id}`)
                    .then((res)=>{
                        console.log(res)
                        dispatch(deleteFromWatchlist(obj))
                    })
                    .catch((err)=>{
                        console.log(err)
                    })
        }
    }

    useEffect(()=>{
        setTimeout(() => {
            setIsLoading(false);
        }, 1000);
    },[])

    return (
    <div>
      {isLoading ? 
        <div className='cards'>
             <SkeletonTheme color="#202020" highlightColor="#444">
                <Skeleton height={300} duration={2} />
            </SkeletonTheme>
        </div>
        : 
            <div className='cards' style={{textDecoration:'none', color:'white'}}>
                <Link to={`/movie/${movie.id}`} style={{textDecoration:'none', color:'white'}}>
                    <img className='cards__img' src={`https://image.tmdb.org/t/p/original${movie ? movie.poster_path:'' }`}/>
                </Link>  
                <div className='cards__overlay'>
                    <Link to={`movie/${movie.id}`} style={{textDecoration:'none', color:'white'}}>
                        <div className='cards__title'>{movie?movie.title:""}</div>
                        <div className='cards__runtime'>{movie?movie.release_date:""}</div>
                    </Link>
                
                    <div className='cards__icons'>
                        <span className='cards__rating'>{movie? movie.vote_average.toFixed(1):''}</span>
                        <i className='fa fa-star favouriteStar'/>
                        <i  className={checkfav(movie)? 'fa fa-heart favStar':'fa fa-heart'} onClick={handleFavourite}
                        style={{color:checkfav(movie)?'red':'white'}}
                        />
                        <i className='fa fa-bookmark' style={{color:checkWatch(movie)?'blue':'white'}} onClick={handleWatch}/>
                    </div>
                </div>
                 <div className='cards_description'>{movie ? movie.overview.slice(0,118)+"...":""}</div>
            </div>
    }
    </div>
  )
}

export default Card;
