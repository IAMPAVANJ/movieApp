import React,{useEffect,useState} from 'react';
import Skeleton , {SkeletonTheme} from 'react-loading-skeleton';
import "./casd.css";
import {Link} from 'react-router-dom';



const Card = ({movie}) => {
    const [isLoading,setIsLoading] = useState(true);

    useEffect(()=>{
        setTimeout(() => {
            setIsLoading(false);
        }, 3000);
    },[])

    return (
    <div>
      {isLoading ? 
        <div className='cards'>
             <SkeletonTheme color="#202020" highlightColor="#444">
                <Skeleton height={300} duration={2} />
            </SkeletonTheme>
        </div>
        : 
        <Link to={`movie/${movie.id}`} style={{textDecoration:'none', color:'white'}}>
            <div className='cards'>
                <img className='cards__img' src={`https:image.tmdb.org/t/p/original${movie ? movie.poster_path:'' }`}/>
                <div className='cards__overlay'>
                    <div className='cards__title'>{movie?movie.title:""}</div>
                    <div className='cards__runtime'>{movie?movie.release_date:""}</div>
                    <span className='cards__rating'>{movie? movie.vote_average:''}</span>
                    <i className='fa fa-star'/>
                </div>
                <div className='cards_description'>{movie ? movie.overview.slice(0,118)+"...":""}</div>
            </div>
        </Link>  
    }
    </div>
  )
}

export default Card;
