import React from 'react';
import {useSelector,useDispatch} from 'react-redux';
import { setGenre, setMovies } from '../../store/slices/mainSlice';
import axios  from 'axios';

const GenreDropdown = () => {
    const genre = useSelector((state)=>state.mainSlice.genre);
    const dispatch = useDispatch();
    const updateGenre = (genre,type)=>{
        dispatch(setGenre([genre,type]))
        axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=4aafdefd9b32d27809998bc3057a9681&sort_by=${type}`)
            .then((res) => {
                dispatch(setMovies(res?.data?.results))
            })
            .catch((err) => {
                console.log(err)
            })
    }
  return (
      <div className="dropdown show">
          <a className="btn btn-secondary dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              {genre==""?'Sort Movies By':genre[0]}
          </a>

          <div className="dropdown-menu" aria-labelledby="dropdownMenuLink">
              <p className="dropdown-item" onClick={()=>updateGenre('Release Date','primary_release_date.asc')}>Release Date</p>
              <p className="dropdown-item" onClick={()=>updateGenre('Popularity(Low to High)','popularity.asc')}>Popularity{" "}<i className='fa fa-arrow-up'/></p>
              <p className="dropdown-item" onClick={()=>updateGenre('Popularity(High to Low)','popularity.desc')}>Popularity{" "}<i className='fa fa-arrow-down'/></p>
              <p className="dropdown-item" onClick={()=>updateGenre('Rating(Low to High)','vote_average.asc')}>Rating{" "}<i className='fa fa-arrow-up'/></p>
              <p className="dropdown-item" onClick={()=>updateGenre('Rating(High to Low)','vote_average.desc')}>Rating{" "}<i className='fa fa-arrow-down'/></p>
          </div>
      </div>
  )
}

export default GenreDropdown;
