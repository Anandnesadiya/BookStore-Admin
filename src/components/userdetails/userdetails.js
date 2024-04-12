import React, { useEffect, useState } from 'react';
import axiosInstance from '../../config/http-common';
import "./userdetails.css"
function Userdetails() {
  const [backendData, setBackendData] = useState([]);

  const getUserData = () => {
    axiosInstance.get("http://localhost:4000/admin/getdata/")
      .then(response => {
        setBackendData(response.data);
      })
      .catch(error => {
        console.error('Error fetching user data:', error);
      });
  };

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <>
      <h1 id='userdetailsh1'>UserDetails</h1>
      <div>
        <ul>
          <table className='userdetailtable'>
            <thead>
              <tr className='tablerow'>
                <th className='tablehead'>UserName</th>
                <th className='tablehead'>Password</th>
                <th className='tablehead'>Email</th>
                <th className='tablehead'>PhoneNumber</th>
              </tr>
            </thead>
            <tbody>
              {backendData.map((user, index) => (
                <tr key={index + 1}>
                  <td className='tablecolumn'>{user.UserName}</td>
                  <td className='tablecolumn'>{user.Password}</td>
                  <td className='tablecolumn'>{user.Email}</td>
                  <td className='tablecolumn'>{user.PhoneNumber}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </ul>
      </div>
    </>
  );
}

export default Userdetails;
