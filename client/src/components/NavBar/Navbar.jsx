import React, { useEffect,useLayoutEffect,useState } from 'react'
import { Link,useNavigate } from 'react-router-dom';
import {useSelector,useDispatch} from 'react-redux';
import "./navbar.css";
import GenreDropdown from '../genreDropDown/GenreDropdown';
const Navbar = () => {
  const activePage = useSelector((state)=>state.mainSlice.activePage);
  const navigate = useNavigate();
  const [user,setUserData] = useState({name:'',email:'',image:''})
  useLayoutEffect(()=>{
    let data = localStorage.getItem('userData');
        if(!data){
        navigate("/")
        }else{
          const {image,name,email} = JSON.parse(localStorage.getItem('userData'));
          setUserData({...user,name:name,email:email,image:image})
        }
},[])
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark" style={{ background: "#023047" }}>
        <div className="container-fluid">
          <p className="navbar-brand">
            <div
              style={{
                fontWeight: 600,
                margin: "1px",
                background: "#ffb703",
                color: "azure",
                padding: "1px 4px",
                borderRadius: "5px"
              }}
            >PavanFlix</div>
          </p>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <Link to="/home" style={{textDecoration:"none"}}>
                <li className="nav-item">
                  <p className={`nav-link ${activePage=='home'?'active':''} customcss-nav-p`} >Home</p>
                </li>
              </Link>
              <Link to="/favourite" style={{textDecoration:"none"}}>
              <li className="nav-item">
                <p className={`nav-link ${activePage=='favourite'?'active' : ""} customcss-nav-p`}>Favourites</p>
              </li>
              </Link>
              <Link to="/watchlist" style={{textDecoration:"none"}}>
              <li className="nav-item">
                <p className={`nav-link ${activePage=='watchlist'?'active' : ""} customcss-nav-p`} >Watchlist</p>
              </li>
              </Link>
            </ul>
            {activePage=='home' &&<GenreDropdown/>}
            <li  class="nav-item me-5 cursor-pointer" data-bs-toggle="modal" data-bs-target="#exampleModal" style={{cursor:'pointer'}}
            >
              <img src={user.image!==""?user.image :'https://toppng.com//public/uploads/preview/donna-picarro-dummy-avatar-115633298255iautrofxa.png'}
                alt='user'
                style={{
                  width: "50px",
                  height: "50px",
                  borderRadius: "50%"
                }}
              />
              
              <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                  <div class="modal-content">
                    <div class="modal-header">
                      <h5 class="modal-title" id="exampleModalLabel">Profile</h5>
                      <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                      <img src={user.image !== "" ? user.image : 'https://toppng.com//public/uploads/preview/donna-picarro-dummy-avatar-115633298255iautrofxa.png'}
                        alt='user'
                        style={{
                          width: "150px",
                          height: "150px",
                          borderRadius: "50%"
                        }}
                      />
                      <div className='modalName'>{user.name}</div>
                      <div className='modalEmail'>{user.email}</div>
                    </div>
                    <div class="modal-footer">
                      <Link to="/">
                        <button className='btn btn-danger'>Log out</button>
                      </Link>
                      <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    </div>
                  </div>
                </div>
              </div>


            </li>
          </div>
        </div>
      </nav>
    </div>
  )
}

export default Navbar
