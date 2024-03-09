import React from 'react'
import {useSelector} from 'react-redux';
import "./userAuth.css"
import Login from '../../components/auth/login/login'
import SignUp from '../../components/auth/signUp/signUp';
const UserAuth = () => {
  const isUser = useSelector((state)=>state.mainSlice.loginOrSignup)
  return (
    <div className='AuthContainer' style={{backgroundColor:'#2b2d42'}}>  
    {    isUser ? 
       <Login/>
        : <SignUp/>}
    </div>
  )
}

export default UserAuth
