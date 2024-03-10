import React, { Suspense, lazy, useEffect } from 'react';
import './App.css';
import {useDispatch,useSelector} from 'react-redux';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/home/Home';
import axios from 'axios';
import { setMovies } from './store/slices/mainSlice';
import Login from './components/auth/login/login';
import SignUp from './components/auth/signUp/signUp';
import MovieDetail from './pages/movieDetails/movieDetail';
import ProtectedRoutes from './components/protectedRoutes/ProtectedRoutes';
import ProtectedRoute from './components/protectedRoutes/ProtectedRoutes';
const FavouriteMovies = lazy(()=>import('./pages/favourite/FavouriteMovies'))
const WatchlistMovies = lazy(()=>import('./pages/watchlist/WatchlistMovies'))
function App() {

  const dispatch = useDispatch();
  const GenreType = useSelector((state)=>state.mainSlice.genre); 

  useEffect(()=>{
    axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=4aafdefd9b32d27809998bc3057a9681&page=2&sort_by=${GenreType[1]}`)
    .then((res)=>{
      dispatch(setMovies(res?.data?.results))
    })
    .catch((err)=>{
      console.log(err)
    })

  },[])


  return (
    <div className='App'>
      <BrowserRouter>
        <Suspense>
        <Routes>
          <Route path="/" element={<Login/>}/>
          <Route path="/signup" element={<SignUp/>}/>
          <Route path='/home' element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        } />
          <Route path='/movie/:id' element={
          <ProtectedRoute>
            <MovieDetail/>
          </ProtectedRoute>
          } />/
          <Route path="/favourite" element={<ProtectedRoute>
            <FavouriteMovies/>
          </ProtectedRoute>} />
          <Route element={<ProtectedRoutes/>}/>
          <Route path="/watchlist" element={<ProtectedRoute>
            <WatchlistMovies/>
          </ProtectedRoute>} />
          <Route path='*' element={<p>Error Page</p>} />
        </Routes>
        </Suspense>
      </BrowserRouter>
    </div>
  );
}

export default App;
