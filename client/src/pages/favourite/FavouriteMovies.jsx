import React, { useEffect } from 'react'
import {useDispatch} from 'react-redux';
import { setActivePage } from '../../store/slices/mainSlice';
const FavouriteMovies = () => {
    const dispatch = useDispatch();
    
    useEffect(()=>{
        dispatch(setActivePage('favourite'));
    },[])
  
    return (
    <div>
      
    </div>
  )
}

export default FavouriteMovies
