import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2'
import {Link, useNavigate} from 'react-router-dom';
import axios from 'axios';
import { Blocks } from 'react-loader-spinner';
import { ProgressBar } from 'react-loader-spinner';
const SignUp = () => {
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false)
  const [userData, setUserData] = useState({ email: "", password: "", name: "", image: "",number:"" });
  const [isPageLoading,setIsPageLoading] = useState(false);
  const navigate = useNavigate();
  useEffect(()=>{
    localStorage.clear();
  },[])
  const handleSubmit = (e) => {
    e.preventDefault();
    if (userData.email == "" || userData.name == "" || userData.password == "" || userData.number=="") {
      Swal.fire({
        position: "top",
        icon: "error",
        title: "Please fill the all details",
        showConfirmButton: false,
        timer: 1200
      });

    }
    else if(userData.number.length>10 || userData.number.length<10){
      Swal.fire({
        position: "top",
        icon: "error",
        title: "Number Must be 10 digit",
        showConfirmButton: false,
        timer: 1200
      });
    }else {
      setIsPageLoading(true);
      axios.post("https://movieapp-itix.onrender.com/user/register", userData)
        .then((res) => {

          Swal.fire({
            position: "top",
            icon: "success",
            title: res?.data?.message,
            showConfirmButton: false,
            timer: 1200
          })
          setIsPageLoading(false);
          navigate("/")
        })
        .catch((err) => {
          Swal.fire({
            position: "top",
            icon: "error",
            title: err?.response?.data?.message,
            showConfirmButton: false,
            timer: 1200
          })
          setIsPageLoading(false);
          console.log(err)
        })
    }
  }

  const postDetails = (pics) => {
    setLoading(true)

    if (pics === undefined) {
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: "Please Select Image",
        showConfirmButton: false,
        timer: 1500
      });
      return;
    }
    if (pics.type === "image/jpeg" || pics.type === "image/png") {
      const data = new FormData();
      data.append("file", pics);
      data.append("upload_preset", "chat-app");
      data.append("cloud_name", "mycloudpavan")
      axios.post("https://api.cloudinary.com/v1_1/mycloudpavan/image/upload", data)
        .then(data => {
          setUserData({ ...userData, image: data.data.url.toString() })
          setLoading(false);
          Swal.fire({
            position: "top-center",
            icon: "success",
            title: "Image Uploaded successfully",
            showConfirmButton: false,
            timer: 1500
          });
        }).catch(err => {
          console.log(err);
          setLoading(false);
        })

    } else {
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: 'Please Select JPG or PNG Image!',
        showConfirmButton: false,
        timer: 1500
      });

      setLoading(false);
      return;
    }
  }


  return (
    <div className='AuthContainer' style={{ backgroundColor: '#2b2d42' }}>
      {isPageLoading ?<div className='initialLoader'>
      <ProgressBar
        visible={true}
        height="80"
        width="80"
        color="#4fa94d"
        ariaLabel="progress-bar-loading"
        wrapperStyle={{}}
        wrapperClass=""
        />
        <p>Wait till we buid you Profile</p>
        </div> 
       :<div className='mainLoginDiv animate__animated animate__rubberBand'>
        <div
          style={{
            fontWeight: 600,
            maxWidth: "200px",
            margin: "20px",
            fontSize: "26px",
            marginTop: "2rem",
            background: "#ffb703",
            color: "azure",
            padding: "1px 4px",
            borderRadius: "5px",
            placeSelf: 'center'
          }}
        >PavanFlix</div>
        <form className="login-form">
          <input type="text" required placeholder="Username" name="username" onChange={(e) => { setUserData({ ...userData, name: e.target.value }) }} value={userData?.name} />
          <input type="email" required placeholder="Email" name="email" onChange={(e) => { setUserData({ ...userData, email: e.target.value }) }} value={userData?.email} />
          <input type="number" required placeholder="Mobile No" name="number" onChange={(e) => { setUserData({ ...userData, number: e.target.value }) }} value={userData?.number} maxLength={10} minLength={10}/>
          <input type="file" placeholder="ChooseImage" name="Image" accept="image/*" onChange={(e) => {
            postDetails(e.target.files[0]);
          }} />
          <input required type={show ? "text" : "password"} placeholder="Password" name="password" onChange={(e) => { setUserData({ ...userData, password: e.target.value }) }} value={userData?.password} />
          {show ? <img src="./assets/authAssets/eyes-4.svg" id="togglePassword" onClick={() => setShow(!show)} /> : <img src='./assets/authAssets/closed-eyes.svg' id="togglePassword" onClick={() => setShow(!show)} />}


          {loading ? <Blocks
            height="80"
            width="80"
            color="#4fa94d"
            ariaLabel="blocks-loading"
            wrapperClass="blocks-wrapper"
            visible={loading}
          /> : <button className='login-form-btn' onClick={(e) => handleSubmit(e)}>Register</button>}
        </form>
        <Link to="/" style={{textDecoration:'none'}}>
        <p className='register-btn'>
          Go to login
        </p>
        </Link>
      </div>}
    </div>
  )
}

export default SignUp;
