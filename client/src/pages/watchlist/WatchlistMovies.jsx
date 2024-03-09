import React, { useEffect } from 'react'
import {useDispatch} from 'react-redux';
import { setActivePage } from '../../store/slices/mainSlice';
const WatchlistMovies = () => {
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(setActivePage('watchlist'));
    },[])
  return (
    <div>
      
    </div>
  )
}

export default WatchlistMovies
