import {createSlice} from '@reduxjs/toolkit';


export const initialState = {
    movies:[],
    activePage:'home'
}

export const mainSlice = createSlice({
name:"main",
initialState,
reducers:{
    setMovies:(state,action)=>{
        state.movies=action.payload
    },
    setFavourite:(state,action)=>{
        console.log(action.payload.id)
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
    }
}
})

export const {setMovies,setFavourite,setActivePage} = mainSlice.actions;
export default mainSlice.reducer
