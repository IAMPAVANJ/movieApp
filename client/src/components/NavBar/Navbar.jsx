import React, { useEffect } from 'react'
import { Link,useNavigate } from 'react-router-dom';
import {useSelector,useDispatch} from 'react-redux';
import "./navbar.css";
import { setActivePage } from '../../store/slices/mainSlice';
import GenreDropdown from '../genreDropDown/GenreDropdown';
const Navbar = () => {
  const activePage = useSelector((state)=>state.mainSlice.activePage);
  const navigate = useNavigate();

  useEffect(()=>{
    let data = localStorage.getItem('userData');
        if(!data){
        navigate("/")
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
              <Link to="watchlist" style={{textDecoration:"none"}}>
              <li className="nav-item">
                <p className={`nav-link ${activePage=='watchlist'?'active' : ""} customcss-nav-p`} >Watchlist</p>
              </li>
              </Link>
            </ul>
            {activePage=='home' &&<GenreDropdown/>}
            <li className="nav-item me-5">
              <img src='https://toppng.com//public/uploads/preview/donna-picarro-dummy-avatar-115633298255iautrofxa.png'
                alt='user'
                style={{
                  width: "50px",
                  height: "50px",
                  borderRadius: "50%"
                }}
              />
            </li>
          </div>
        </div>
      </nav>
    </div>
  )
}

export default Navbar
