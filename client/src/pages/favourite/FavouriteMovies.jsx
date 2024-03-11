import React, { useEffect, useState } from 'react'
import {useDispatch,useSelector} from 'react-redux';
import { setActivePage, setAllFavouriteMovies } from '../../store/slices/mainSlice';
import Navbar from '../../components/NavBar/Navbar';
import MovieList from '../../components/movielist/movieList';
import axios from 'axios';
import {Navigate} from 'react-router-dom';
import"./favourite.css";
import { Link } from 'react-router-dom';
import { DNA } from 'react-loader-spinner';
const FavouriteMovies = () => {
    const dispatch = useDispatch();
    const [loading,setLoading] = useState(false);
    const user = JSON.parse(localStorage.getItem('userData'));
    const favMovies = useSelector((state)=>state.mainSlice.favoriteMovie)    
    useEffect(()=>{
      setLoading(true);
      axios.get(`https://movieapp-itix.onrender.com/user/movies/favourite-movies/${user?._id}`)
      .then((res)=>{
        setLoading(false)
        dispatch(setAllFavouriteMovies(res?.data?.AllFavouriteMovies))
      })
      .catch((err)=>{
        console.log(err)
        setLoading(false)
      })
      if(!user){
        <Navigate to="/"/>
      }
        dispatch(setActivePage('favourite'));
    },[])
  
    return (
    <div className='favouriteMainPage'>
      <Navbar/>
      {favMovies.length==0?
      <Link to="/home" className='btn-favmovies'>
        {loading? <DNA
                        visible={loading}
                        height="80"
                        width="80"
                        ariaLabel="dna-loading"
                        wrapperStyle={{}}
                        wrapperClass="dna-wrapper"
                    />:
          <button className='btn__favmovies'>Add to Favourite<i className='fa fa-heart'/></button>
        }

      </Link>
      :<MovieList data={favMovies}/>}
    </div>
  )
}

export default FavouriteMovies
