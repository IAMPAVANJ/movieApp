import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch} from 'react-redux';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import {Carousel} from 'react-responsive-carousel';
import "./home.css";
import { Link } from 'react-router-dom';
import Navbar from '../../components/NavBar/Navbar'
import MovieList from '../../components/movielist/movieList';
import { setActivePage, setAllFavouriteMovies, setAllWatchlistMovies, setMovies } from '../../store/slices/mainSlice';
import { DNA } from 'react-loader-spinner';
import ResponsivePagination from 'react-responsive-pagination';
import axios from 'axios';
const Home = () => {
    const dispatch = useDispatch();
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = 10;
    const data = useSelector((state)=>state?.mainSlice?.movies);
    const genre = useSelector((state)=>state?.mainSlice?.genre);
    const user = JSON.parse(localStorage.getItem('userData'))
    function getCarouselData(){
        if(genre[0]=="Release Date"){
            return data.slice(0,5);
        }
        else if(genre[0]=="Popularity(Low to High)"){
            return data.slice(5,10);
        }
        else if(genre[0]=="Popularity(High to Low)"){
            return data.slice(10,15);
        }
        else if(genre[0]=="Rating(Low to High)"){
            return data.slice(15,20);
        }else{
            return data.slice(12,17)
        }
    }
    useEffect(() => {
        axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=4aafdefd9b32d27809998bc3057a9681&page=${currentPage}`)
            .then((res) => {
                dispatch(setMovies(res?.data?.results))
            })
            .catch((err) => {
                console.log(err)
            })
    }, [currentPage])
    const carouselData = getCarouselData();
    const [loading,setLoading] = useState(false);

    useEffect(()=>{
        axios.get(`https://movieapp-itix.onrender.com/movies/favourite-movies/${user?._id}`)
        .then((res)=>{
          dispatch(setAllFavouriteMovies(res?.data?.AllFavouriteMovies))
        })
        .catch((err)=>{
          console.log(err)
        })

        axios.get(`https://movieapp-itix.onrender.com/movies/watchlist-movies/${user?._id}`)
        .then((res)=>{
          setLoading(false)
          dispatch(setAllWatchlistMovies(res?.data?.AllWatchlistMovies))
        })
        .catch((err)=>{
          console.log(err)
          setLoading(false)
        })
        dispatch(setActivePage('home'));
    },[])

    useEffect(()=>{
        setLoading(true);
        setTimeout(()=>{
            setLoading(false)
        },1200)
        
    },[data])

    

    return (
    <div className='poster'>
        <Navbar/>
       {!loading ?
       <>
       <Carousel
         showThumbs={false}
         autoFocus={true}
         autoPlay={true}
         axis='horizontal'
         emulateTouch={false}
         infiniteLoop={true}
         interval={2500}
         showStatus={false}
         swipeable={false}
        >
                {carouselData?.map((movie) => (
                    <Link key={movie?.id} to={`/movie/${movie.id}`} style={{textDecoration:'none',color:'white'}}>
                        <div className='posterImage'>
                            <img  src={`https://image.tmdb.org/t/p/original${movie && movie.backdrop_path}`} />
                        </div>
                        <div className='posterImage__overlay'>
                            <div className="posterImage__title">{movie ? movie.title: ""}</div>
                            <div className='posterImage__runtime'>
                                {movie ? movie.release_date:''}
                                <span className="posterImage__rating">
                                    {" "}{movie ? movie.vote_average.toFixed(1) : ''}{" "}
                                    <i className='fa fa-star favouriteStar' title='Rating'
                                        />
                                </span>
                            </div>
                            <div className='posterImage__description'>{movie ? movie.overview : ''}</div>
                        </div>
                    </Link>
                )
                )}
        </Carousel>
        <div>
            <MovieList data={data}/>
        </div>
           <div style={{marginBottom:"10px"}}>
            <ResponsivePagination
            current={currentPage}
            total={totalPages}
            onPageChange={setCurrentPage}
             />
           </div>
        </>
        :
        <div className='dnaSpinner'>
                    <DNA
                        visible={loading}
                        height="80"
                        width="80"
                        ariaLabel="dna-loading"
                        wrapperStyle={{}}
                        wrapperClass="dna-wrapper"
                    />
        </div>
        }
        
    </div>
  )
}

export default Home;
