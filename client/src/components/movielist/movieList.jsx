import React, { useState } from 'react'
import Card from '../card/Card';
import "./movieList.css"

const MovieList = ({data}) => {
  return (
    <div className='movie__list'>
        <h2 className='list__title'>POPULAR</h2>
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
