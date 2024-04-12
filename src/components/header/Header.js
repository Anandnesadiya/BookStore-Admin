import { Link, useNavigate } from "react-router-dom";
import './header.css'
import React, { useState, useEffect } from 'react';
import axiosInstance from "../../config/http-common";
function Header() {

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const [backendData, setBackendData] = useState([]);

  const base64String = backendData && backendData.length > 0 ? backendData[0].ProfilePhoto : '';

  const Logout = () => {
    localStorage.removeItem('accessToken')
    navigate('/login')
  }

  const EditProfile = () => {
    navigate('/editprofile')
    setDropdownOpen(!dropdownOpen);
  }

  const fetchUserData = () => {
    axiosInstance.get("http://localhost:4000/admin/profile/")
      .then(response => {
        setBackendData(response.data);
      })
      .catch(error => {
        console.error('Error fetching user data:', error);
      });
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <Link className="navbar-brand" to="#">Navbar</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="./dashboard">Dashboard</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="./books">Books</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="./users">UserDetails</Link>
              </li>
            </ul>

            <ul className="navbar-nav ms-auto mb-2 mb-lg-0 profile-menu">
              {backendData.map((user, index) => (
                <Link key={index + 1} onClick={EditProfile} className="headeremail">{user.Email}</Link>
              ))}
              <li className="nav-item dropdown">
                <a className="nav-link" onClick={toggleDropdown} id="navbarDropdown" role="button" aria-expanded={dropdownOpen ? 'true' : 'false'}>
                  <div className="profile-pic">
                    <img src={base64String} />
                  </div>
                  <i className="fas fa-user"></i>
                </a>
                <ul className={`dropdown-menu ${dropdownOpen ? 'show' : ''}`} aria-labelledby="navbarDropdown">
                  <li><a className="dropdown-item" onClick={EditProfile}><i className="fas fa-cog fa-fw"></i> Edit Profile</a></li>
                  <li><hr className="dropdown-divider" /></li>
                  <li><a className="dropdown-item" onClick={Logout} ><i className="fas fa-cog fa-fw"></i> Log out</a></li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Header;
