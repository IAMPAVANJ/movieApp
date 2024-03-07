import React, { useEffect } from 'react';
import './App.css';
import Navbar from './components/NavBar/Navbar';
import {useDispatch} from 'react-redux';
import { increment } from './store/slices/mainSlice';
function App() {
  const dispatch = useDispatch();
  useEffect(()=>{
    dispatch(increment(2));
    //eslint-disable-next-line
  },[])
  return (
    <div>
      <Navbar/>
    </div>
  );
}

export default App;
