import React,{useEffect,useState} from 'react'
import "./movieDetail.css";
import { useParams } from 'react-router-dom';
import{useDispatch,useSelector} from 'react-redux';
import axios  from 'axios';
import Navbar from '../../components/NavBar/Navbar'
import { deleteFromFavourite, deleteFromWatchlist, setActivePage, setOneFavouriteMovie, setOneWatchlistMovie } from '../../store/slices/mainSlice';
const MovieDetail = () => {
    const {id} = useParams();
    const user = JSON.parse(localStorage.getItem('userData'))
    const [currentMovieDetail, setMovie] = useState()
    const [movie,setNewMovie] = useState()
    const favouriteMovies = useSelector((state)=>state.mainSlice.favoriteMovie);
    const watchlistMovie = useSelector((state)=>state.mainSlice.watchlistMovie);
    const dispatch = useDispatch();
    useEffect(()=>{
        axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=4aafdefd9b32d27809998bc3057a9681`)
    .then((res)=>{
      console.log(res)
      setMovie(res?.data)
      setNewMovie(res?.data)
    })
    .catch((err)=>{
      console.log(err)
    })
    dispatch(setActivePage('movieDetails'));
    window.scrollTo(0,0)
    },[])

    const handleFavourite = ()=>{
        if(checkfav(movie)==false){
            
                    let Obj = {
                        userId:user?._id,...movie
                    }
                    axios.post('http://localhost:8080/movies/add-favourite-movies',Obj)
                    .then((res)=>{
                        console.log(res)
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
            axios.post("http://localhost:8080/movies/single-favourite-movie",obj)
            .then((res)=>{
                let id = res?.data?.data?._id;
            
                if(id!==""){
                    axios.delete(`http://localhost:8080/movies/delete-favourite-movies/${id}`)
                            .then((res)=>{
                                dispatch(deleteFromFavourite(obj))
                            })
                            .catch((err)=>{
                                console.log(err)
                            })
                }
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


                    axios.post('http://localhost:8080/movies/add-watchlist-movies',Obj)
                    .then((res)=>{
                        console.log(res)
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


            axios.post('http://localhost:8080/movies/single-watchlist-movie',obj)
            .then((res)=>{
                let id  = res?.data?.data?._id;
                axios.delete(`http://localhost:8080/movies/delete-watchlist-movies/${id}`)
                        .then((res)=>{
                            console.log(res)
                            dispatch(deleteFromWatchlist(obj))
                        })
                        .catch((err)=>{
                            console.log(err)
                        })
            })

        }
    }

    function checkfav(movie){
        if(favouriteMovies.length == 0){
            return false
        }else{
            const isFav =  favouriteMovies.some((data)=>data.id == movie?.id);
            return isFav;
        }
    }
    function checkWatch(movie){
        if(watchlistMovie.length == 0){
            return false
        }else{
            const isWatch =  watchlistMovie.some((data)=>data.id == movie?.id);
            return isWatch;
        }
    }


  return (
    <>
        <Navbar/>
    <div className="movie">
            <div className="movie__intro">
                <img className="movie__backdrop" src={`https://image.tmdb.org/t/p/original${currentMovieDetail ? currentMovieDetail.backdrop_path : ""}`} />
            </div>
            <div className="movie__detail">
                <div className="movie__detailLeft">
                    <div className="movie__posterBox">
                        <img className="movie__poster" src={`https://image.tmdb.org/t/p/original${currentMovieDetail ? currentMovieDetail.poster_path : ""}`} />
                    </div>
                </div>
                <div className="movie__detailRight">
                    <div className="movie__detailRightTop">
                        <div className="movie__name">{currentMovieDetail ? currentMovieDetail.original_title : ""}</div>
                        <div className="movie__tagline">{currentMovieDetail ? currentMovieDetail.tagline : ""}</div>
                        <div className="movie__rating">
                            {currentMovieDetail ? currentMovieDetail.vote_average: ""} <i className="fas fa-star" /> <i  className={checkfav(movie)? 'fa fa-heart favStar':'fa fa-heart'} onClick={handleFavourite}
                        style={{color:checkfav(movie)?'red':'white'}}/> <i className='fa fa-bookmark' style={{color:checkWatch(movie)?'blue':'white'}} onClick={handleWatch}/>  
                            <span className="movie__voteCount">{currentMovieDetail ? "(" + currentMovieDetail.vote_count + ") votes" : ""}</span>
                        </div>  
                        <div className="movie__runtime">{currentMovieDetail ? currentMovieDetail.runtime + " mins" : ""}</div>
                        <div className="movie__releaseDate">{currentMovieDetail ? "Release date: " + currentMovieDetail.release_date : ""}</div>
                        <div className="movie__genres">
                            {
                                currentMovieDetail && currentMovieDetail.genres
                                ? 
                                currentMovieDetail.genres.map(genre => (
                                    <><span className="movie__genre" id={genre.id}>{genre.name}</span></>
                                )) 
                                : 
                                ""
                            }
                        </div>
                    </div>
                    <div className="movie__detailRightBottom">
                        <div className="synopsisText">Synopsis</div>
                        <div>{currentMovieDetail ? currentMovieDetail.overview : ""}</div>
                    </div>
                    
                </div>
            </div>
            <div className="movie__links">
                <div className="movie__heading">Useful Links </div>
                {
                    currentMovieDetail && currentMovieDetail.homepage && <a href={currentMovieDetail.homepage} target="_blank" style={{textDecoration: "none"}}><p><span className="movie__homeButton movie__Button">Homepage <i className="newTab fas fa-external-link-alt"></i></span></p></a>
                }
                {
                    currentMovieDetail && currentMovieDetail.imdb_id && <a href={"https://www.imdb.com/title/" + currentMovieDetail.imdb_id} target="_blank" style={{textDecoration: "none"}}><p><span className="movie__imdbButton movie__Button">IMDb<i className="newTab fas fa-external-link-alt"></i></span></p></a>
                }
            </div>
            <div className="movie__heading">Production companies</div>
            <div className="movie__production">
                {
                    currentMovieDetail && currentMovieDetail.production_companies && currentMovieDetail.production_companies.map(company => (
                        <>
                            {
                                company.logo_path 
                                && 
                                <span className="productionCompanyImage">
                                    <img className="movie__productionComapany" src={"https://image.tmdb.org/t/p/original" + company.logo_path} />
                                    <span>{company.name}</span>
                                </span>
                            }
                        </>
                    ))
                }
            </div>
        </div>
        </>
  )
}

export default MovieDetail;
