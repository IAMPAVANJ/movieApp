import {createSlice} from '@reduxjs/toolkit';


export const initialState = {
    value:0
}

export const mainSlice = createSlice({
name:"main",
initialState,
reducers:{
    increment:(state,action)=>{
        state.value+=action.payload
    }
}
})

export const {increment} = mainSlice.actions;
export default mainSlice.reducer
