import React from 'react'

const Navbar = () => {
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark" style={{ background: "#023047" }}>
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
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
          </a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="#">Home</a>
              </li>
              <li className="nav-item">
                <a className="nav-link">Link</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">Link</a>
              </li>
            </ul>
            <form className="d-flex" role="search">
              <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
              <button className="btn btn-outline-light" type="submit">Search</button>
            </form>
            <li className="nav-item">
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
