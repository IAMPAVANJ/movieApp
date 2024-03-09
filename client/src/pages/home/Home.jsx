import React, { useEffect } from 'react'
import { useSelector, useDispatch} from 'react-redux';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import {Carousel} from 'react-responsive-carousel';
import "./home.css";
import { Link } from 'react-router-dom';
import Navbar from '../../components/NavBar/Navbar'
import { setActivePage } from '../../store/slices/mainSlice';
import MovieList from '../../components/movielist/movieList';
const Home = () => {
    const dispatch = useDispatch();
    const data = useSelector((state)=>state?.mainSlice?.movies);
    const carouselData = data.slice(11);

    useEffect(()=>{
        dispatch(setActivePage('home'));
    },[])

    return (
    <div className='poster'>
        <Navbar/>
        <Carousel
         showThumbs={false}
         autoFocus={true}
         autoPlay={true}
         axis='horizontal'
         emulateTouch={true}
         infiniteLoop={true}
         interval={2500}
         showStatus={false}
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
                                    <i className='fa fa-star favouriteStar' title="Add To favourite"/>&nbsp;&nbsp;
                                    <i className='fa fa-bookmark' title="Add to Watchlist"/>
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
    </div>
  )
}

export default Home
