import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../config/http-common";

function EditProfile() {
  const [backendData, setBackendData] = useState([]);
  const { register, handleSubmit } = useForm();
  const [file, setFile] = useState("");
  const navigate = useNavigate();

  let fileResult = "";

  const fetchUserData = () => {
    axiosInstance
      .get(`http://localhost:4000/admin/profile/`)
      .then((response) => {
        setBackendData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  function convertToBase64(e) {
    const reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = () => {
      setFile(reader.result);
      fileResult = reader.result;
      console.log("fileResult");
    };

    reader.onerror = (error) => {
      console.log("Error:", error);
    };
  }

  const onSubmit = async (user) => {
    const userData = {
      UserName: user.UserName,
      PhoneNumber: user.PhoneNumber,
      Password: user.Password,
      Email: user.Email,
      ProfilePhoto: file,
    };
    updateAPI(userData);

    navigate("/layout/dashboard");
    
  };

  // async function updateAPI(userData) {
  //     try {
  //         const res = await axiosInstance.put('http://localhost:4000/user/updatedata/1', userData);
  //         debugger
  //
  //         return res.data;
  //     } catch (error) {
  //         console.error('Error:', error);
  //         throw error;
  //     }
  // }

  function updateAPI(userData) {
    return new Promise(function (resolve, reject) {
      {
        backendData.map((user) =>
          axiosInstance
            .put(
              `http://localhost:4000/admin/updatedata/${user.UserID}`,
              userData
            )
            .then((res) => {

              resolve(res);
            })
            .catch((err) => {
              reject(err);
            })
        );
      }
    });
  }

  function onCancel() {
    navigate("/layout");
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="container">
          <h1>Edit Your Profile</h1>
          <hr />

          <label htmlFor="username">
            <b>UserName</b>
          </label>
          {backendData.map((user) => (
            <input
              {...register("UserName")}
              type="text"
              placeholder="Enter UserName"
              required
              key={user.UserID}
              defaultValue={user.UserName}
            />
          ))}

          <label htmlFor="email">
            <b>Email</b>
          </label>
          {backendData.map((user) => (
            <input
              {...register("Email")}
              type="text"
              placeholder="Enter Email"
              required
              key={user.UserID}
              defaultValue={user.Email}
            />
          ))}

          <label htmlFor="psw">
            <b>Password</b>
          </label>
          {backendData.map((user) => (
            <input
              {...register("Password")}
              type="password"
              placeholder="Enter Password"
              required
              key={user.UserID}
              defaultValue={user.Password}
            />
          ))}

          <label htmlFor="number">
            <b>PhoneNumber</b>
          </label>
          {backendData.map((user) => (
            <input
              {...register("PhoneNumber")}
              type="text"
              placeholder="Enter Phonenumber"
              required
              key={user.UserID}
              defaultValue={user.PhoneNumber}
            />
          ))}

          <label htmlFor="photo">
            <b>Select Your Profile Photo</b>
          </label>
          <input
            onChange={convertToBase64}
            type="file"
            className="form-control"
            id="customFile"
          />
          {file === "" || file === null ? (
            ""
          ) : (
            <img width={400} height={100} src={file} />
          )}

          <br />

          <div className="clearfix , loginDiv">
            <button type="button" className="cancelbtn" onClick={onCancel}>
              Cancel
            </button>
            <button type="submit" className="signupbtn">
              Edit
            </button>
          </div>
        </div>
      </form>
    </>
  );
}

export default EditProfile;
