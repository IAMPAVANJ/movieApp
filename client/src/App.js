import React, { useEffect } from 'react';
import './App.css';
import {useDispatch} from 'react-redux';
import Navbar from './components/NavBar/Navbar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/home/Home';
import axios from 'axios';
import { setMovies } from './store/slices/mainSlice';
function App() {

  const dispatch = useDispatch();
  
  useEffect(()=>{
    axios.get('https://api.themoviedb.org/3/movie/popular?api_key=4aafdefd9b32d27809998bc3057a9681')
    .then((res)=>{
      dispatch(setMovies(res?.data?.results))
    })
    .catch((err)=>{
      console.log(err)
    })
  },[])


  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/home' element={<Home />} />
          <Route path='movie/:id' element={<p>movie id</p>} />
          <Route path='movies/:type' element={<p>movie sdadid</p>} />
          <Route path="favourite" element={<p>Favourites</p>} />
          <Route path="watchlist  " element={<p>Watchlist</p>} />
          <Route path='*' element={<p>Error Page</p>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
