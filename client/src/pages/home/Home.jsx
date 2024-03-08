import React, { useEffect } from 'react'
import {useDispatch,useSelector} from 'react-redux';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import {Carousel} from 'react-responsive-carousel';
import "./home.css";
import { setFavourite, setMovies } from '../../store/slices/mainSlice';
import { Link } from 'react-router-dom';
const Home = () => {
    const dispatch = useDispatch();
    const data = useSelector((state)=>state?.mainSlice?.movies);
    const carouselData = data.slice(11);

    console.log(carouselData)
  

    return (
    <div className='poster'>
        <Carousel
         showThumbs={false}
         autoFocus={true}
         autoPlay={true}
         axis='horizontal'
         emulateTouch={true}
         infiniteLoop={true}
         interval={2000}
         showStatus={false}
        >
                {carouselData?.map((movie) => (
                    <Link to={`/movie/${movie.id}`} style={{textDecoration:'none',color:'white'}}>
                        <div className='posterImage'>
                            <img  src={`https://image.tmdb.org/t/p/original${movie && movie.backdrop_path}`} />
                        </div>
                        <div className='posterImage__overlay'>
                            <div className="posterImage__title">{movie ? movie.title: ""}</div>
                            <div className='posterImage__runtime'>
                                {movie ? movie.release_date:''}
                                <span className="posterImage__rating">
                                    {movie ? movie.vote_average.toFixed(1) : ''}{" "}
                                    <i className='fa fa-star' />
                                </span>
                            </div>
                            <div className='posterImage__description'>{movie ? movie.overview : ''}</div>
                        </div>
                    </Link>
                )
                )}
        </Carousel>
    </div>
  )
}

export default Home
