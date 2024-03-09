import React, { useState } from 'react';
import {useDispatch} from 'react-redux';
import"./login.css"
import { setLoginOrSignup } from '../../../store/slices/mainSlice';
import axios from 'axios';
import Swal from 'sweetalert2';
import {useNavigate} from 'react-router-dom';
const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [show,setShow] = useState(false);
    const handleIt =()=> dispatch(setLoginOrSignup(false));
    const [userData,setUserData] = useState({email:"",password:""});

    const handleSubmit = (e) => {
      e.preventDefault();
      if(userData.email=="" || userData.password == ""){
        Swal.fire({
          position: "top",
          icon: "error",
          title: "Please fill the all details",
          showConfirmButton: false,
          timer: 1200
        });
        navigate("/home");
      }else{
        axios.post("http://localhost:8080/user/login",userData)
        .then((res)=>{
          console.log(res);
          Swal.fire({
            position: "top",
            icon: "success",
            title: res?.data?.Message,
            showConfirmButton: false,
            timer: 1200
          });
          localStorage.setItem('userdate',JSON.stringify(res?.data?.otherDetails))

        })
        .catch((err)=>{
          Swal.fire({
            position: "top",
            icon: "error",
            title: err?.response?.data?.message,
            showConfirmButton: false,
            timer: 1200
          })
          console.log(err)
        })
      }
    }
  return (
   
      <div className='mainLoginDiv'>
            <div
              style={{
                fontWeight: 600,
                maxWidth:"200px",
                margin: "20px",
                fontSize:"26px",
                marginTop:"2rem",
                background: "#ffb703",
                color: "azure",
                padding: "1px 4px",
                borderRadius: "5px",
                placeSelf:'center'
              }}
            >PavanFlix</div>
          <form class="login-form">
              <input type="email" placeholder="Email" name="username" onChange={(e)=>{setUserData({...userData,email:e.target.value})}} value={userData?.email}/>
              <input type={show?"text":"password"} placeholder="Password" name="password" onChange={(e)=>{setUserData({...userData,password:e.target.value})}} value={userData?.password}/>
              {show ? <img src="./assets/authAssets/eyes-4.svg"  id="togglePassword" onClick={()=>setShow(!show)}/> :<img src='./assets/authAssets/closed-eyes.svg' id="togglePassword" onClick={()=>setShow(!show)}/>}

              <button className='login-form-btn' onClick={(e)=>handleSubmit(e)}>Log In</button>
          </form>
          <p  onClick={handleIt} className='register-btn'>
            Register Here
          </p>
      </div>
  )
}

export default Login
