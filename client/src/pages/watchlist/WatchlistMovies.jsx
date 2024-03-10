import React, { useEffect,useState } from 'react'
import {useDispatch,useSelector} from 'react-redux';
import { setActivePage, setAllWatchlistMovies } from '../../store/slices/mainSlice';
import Navbar from '../../components/NavBar/Navbar';
import MovieList from '../../components/movielist/movieList';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { DNA } from 'react-loader-spinner';
const WatchlistMovies = () => {
    const dispatch = useDispatch();
    const [loading,setLoading] = useState(false);
    const user = JSON.parse(localStorage.getItem('userData'));
    const watchlistMovie = useSelector((state)=>state.mainSlice.watchlistMovie);
    useEffect(()=>{
      setLoading(true);
      axios.get(`https://movieapp-itix.onrender.com/movies/watchlist-movies/${user?._id}`)
      .then((res)=>{
        setLoading(false)
        dispatch(setAllWatchlistMovies(res?.data?.AllWatchlistMovies))
      })
      .catch((err)=>{
        console.log(err)
        setLoading(false)
      })
        dispatch(setActivePage('watchlist'));
    },[])
  return (
    <div className='favouriteMainPage'>
      <Navbar/>
      {watchlistMovie.length==0?
      <Link to="/home" className='btn-favmovies'>
        {loading? <DNA
                        visible={loading}
                        height="80"
                        width="80"
                        ariaLabel="dna-loading"
                        wrapperStyle={{}}
                        wrapperClass="dna-wrapper"
                    />:
          <button className='btn__favmovies'>Add to Wishlist &nbsp;<i className='fa fa-bookmark' style={{color:'blue'}}/></button>
        }

      </Link>
      :<MovieList data={watchlistMovie}/>}
    </div>
  )
}

export default WatchlistMovies
