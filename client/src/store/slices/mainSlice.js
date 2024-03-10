import {createSlice} from '@reduxjs/toolkit';


export const initialState = {
    movies:[],
    activePage:'home',
    userData:{},
    genre:[],
    favoriteMovie:[],
    watchlistMovie:[],
}

export const mainSlice = createSlice({
name:"main",
initialState,
reducers:{
    setMovies:(state,action)=>{
        state.movies=action.payload
    },
    setGenre:(state,action)=>{
        state.genre=action.payload
    },
    setActivePage:(state,action)=>{
        state.activePage = action.payload
    },
    setUserData:(state,action)=>{
        state.userData = action.payload
    },
    //----------------------------fav-----------------------//
    setAllFavouriteMovies:(state,action)=>{
        state.favoriteMovie = action.payload
    },
    setOneFavouriteMovie:(state,action)=>{
        let data = state.favoriteMovie.every((movie)=>movie.id !== action.payload.id);
        if(data){
            state.favoriteMovie.push(action.payload)
        }
    },
    deleteFromFavourite:(state,action)=>{
        const data = state.favoriteMovie.filter((movie)=>movie.id !== action.payload.id);
        state.favoriteMovie = data
    },
//---------------------------watchlist-----------------//
    setAllWatchlistMovies:(state,action)=>{
        state.watchlistMovie = action.payload
    },
    setOneWatchlistMovie:(state,action)=>{
        let data = state.watchlistMovie.every((movie)=>movie.id !== action.payload.id);
        if(data){
            state.watchlistMovie.push(action.payload)
        }
    },
    deleteFromWatchlist:(state,action)=>{
        const data = state.watchlistMovie.filter((movie)=>movie.id !== action.payload.id);
        state.watchlistMovie = data
    },

}
})

export const {
    setMovies,
    setFavourite,
    setActivePage,
    setLoginOrSignup,
    setGenre,
    setUserData,
    setAllFavouriteMovies,
    setOneFavouriteMovie,
    deleteFromFavourite,
    setAllWatchlistMovies,
    setOneWatchlistMovie,
    deleteFromWatchlist
    } = mainSlice.actions;
export default mainSlice.reducer
