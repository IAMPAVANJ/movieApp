import {createSlice} from '@reduxjs/toolkit';


export const initialState = {
    movies:[],
    activePage:'home',
    loginOrSignup:true,
    userData:{},
    genre:[],
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
    setFavourite:(state,action)=>{
        function check(){
            for(let i in state.movies){
                if(action.payload.id==state.movies[i].id){
                    console.log(i)
                    // return false;
                }
            }
            return true;
        }

        let num=check();

        if(num===false){
            state.movies.push(action.payload)
        }
    },
    setActivePage:(state,action)=>{
        state.activePage = action.payload
    },
    setLoginOrSignup:(state,action)=>{
        state.loginOrSignup=action.payload
    },
    setUserData:(state,action)=>{
        state.userData = action.payload
    }
}
})

export const {
    setMovies,
    setFavourite,
    setActivePage,
    setLoginOrSignup,
    setGenre,
    setUserData
    } = mainSlice.actions;
export default mainSlice.reducer
