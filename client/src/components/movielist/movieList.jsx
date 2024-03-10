import React, { useState } from 'react'
import Card from '../card/Card';
import "./movieList.css"
import {useSelector} from 'react-redux';

const MovieList = ({data}) => {
    const activePage = useSelector((state)=>state.mainSlice.activePage);
    function activePageData(){
        if(activePage=="home"){
            return "POPULAR";
        }
        if(activePage == 'favourite'){
            return "FAVOURITE"
        }
        if(activePage == 'watchlist'){
            return "WATCHLIST"
        }
    }
  return (
    <div className='movie__list'>
        <h2 className='list__title'>{activePageData()}</h2>
        <div className='list__cards'>
            {
                data?.map((movie)=>{
                    return(
                        <Card key={movie?.id} movie={movie}/>
                    )
                })
            }
        </div>

    </div>
  )
}

export default MovieList
