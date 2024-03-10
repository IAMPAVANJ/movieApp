import React, { useEffect } from 'react'
import {useDispatch} from 'react-redux';
import { setActivePage } from '../../store/slices/mainSlice';
import Navbar from '../../components/NavBar/Navbar';
import MovieList from '../../components/movielist/movieList';
const FavouriteMovies = () => {
    const dispatch = useDispatch();
    
    useEffect(()=>{
        dispatch(setActivePage('favourite'));

    },[])
  
    return (
    <div>
      <Navbar/>
    </div>
  )
}

export default FavouriteMovies
