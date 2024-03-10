import React, { useEffect, useState } from 'react';
import "./login.css"
import {useNavigate} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';
import { MagnifyingGlass } from 'react-loader-spinner';
const Login = () => {
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const [userData, setUserData] = useState({ email: "", password: "" });
  const [isPageLoading,setIsPageLoading] = useState(false);
  const  navigate = useNavigate();
  useEffect(()=>{
    localStorage.clear();
  },[])
  const handleSubmit = (e) => {
    e.preventDefault();
    if (userData.email == "" || userData.password == "") {
      Swal.fire({
        position: "top",
        icon: "error",
        title: "Please fill the all details",
        showConfirmButton: false,
        timer: 1200
      });
    } else {
      setIsPageLoading(true);
      axios.post("https://movieapp-itix.onrender.com/user/login", userData)
        .then((res) => {
          Swal.fire({
            position: "top",
            icon: "success",
            title: res?.data?.Message,
            showConfirmButton: false,
            timer: 1200
          });
          localStorage.setItem('userData', JSON.stringify(res?.data?.otherDetails))
          navigate("/home");
          setIsPageLoading(false);
        })
        .catch((err) => {
          Swal.fire({
            position: "top",
            icon: "error",
            title: err?.response?.data?.Message,
            showConfirmButton: false,
            timer: 1200
          })
          setIsPageLoading(false)
          console.log(err)
        })
    }
  }
  return (
    <div className='AuthContainer' style={{ backgroundColor: '#2b2d42' }}>

      {  isPageLoading ?
      <div className='initialLoader'>
      <MagnifyingGlass
      visible={true}
      height="80"
      width="80"
      ariaLabel="magnifying-glass-loading"
      wrapperStyle={{}}
      wrapperClass="magnifying-glass-wrapper"
      glassColor="#c0efff"
      color="#e15b64"
      />
      <p>Please wait till we Server wake up</p>
      <p>It will take upto 20sec for first time</p>
      </div>
      :<div className='mainLoginDiv animate__animated animate__rubberBand'>
        <div
          style={{
            fontWeight: 600,
            maxWidth: "200px",
            margin: "20px",
            fontSize: "26px",
            marginTop: "2rem",
            background: "#ae2012",
            color: "azure",
            padding: "1px 4px",
            borderRadius: "5px",
            placeSelf: 'center'
          }}
        >MovieFlix</div>
        <form className="login-form">
          <input type="email" placeholder="Email" name="username" onChange={(e) => { setUserData({ ...userData, email: e.target.value }) }} value={userData?.email} />
          <input type={show ? "text" : "password"} placeholder="Password" name="password" onChange={(e) => { setUserData({ ...userData, password: e.target.value }) }} value={userData?.password} />
          {show ? <img src="./assets/authAssets/eyes-4.svg" id="togglePassword" onClick={() => setShow(!show)} /> : <img src='./assets/authAssets/closed-eyes.svg' id="togglePassword" onClick={() => setShow(!show)} />}

          <button className='login-form-btn' onClick={(e) => handleSubmit(e)}>Log In</button>
        </form>
        <Link to="/signup" style={{textDecoration:'none'}}>
          <p className='register-btn'>
            Register Here
          </p>
        </Link>
      </div>}
    </div>
  )
}

export default Login
