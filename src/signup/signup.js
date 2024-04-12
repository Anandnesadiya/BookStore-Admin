import "./signup.css";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

function Signup() {

  const { register, handleSubmit } = useForm();
  const [data, setData] = useState("");
  const [file, setFile] = useState("");
  const navigate = useNavigate();

  let fileResult = "";

  function convertToBase64(e) {
    const reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = () => {
      setFile(reader.result)
      fileResult = reader.result;
      console.log("fileResult");
    }

    reader.onerror = error => {
      console.log("Error:", error);
    }
  };

  const onSubmit = (user) => {
    const userData = {
      UserName: user.UserName,
      PhoneNumber: user.PhoneNumber,
      Password: user.Password,
      Email: user.Email,
      ProfilePhoto: file
    };

    signUpAPI(userData)
    navigate("/login");
    console.log(userData);
  };

  async function signUpAPI(userData) {
    try {
      const res = await fetch("http://localhost:4000/admin/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(userData)
      });
      if (!res.ok) {
        debugger
        throw new Error('Failed to sign up');
      }

      return res.json();
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  }

  function onCancel() {
    return navigate('/login')
  }


  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="container">
          <h1>Create Your Account</h1>
          <p>Please fill this form to create an account.</p>
          <hr />

          <label htmlFor="username"><b>UserName</b></label>
          <input {...register("UserName")} type="text" placeholder="Enter UserName" required />

          <label htmlFor="email"><b>Email</b></label>
          <input {...register("Email")} type="text" placeholder="Enter Email" required />

          <label htmlFor="psw"><b>Password</b></label>
          <input {...register("Password")} type="password" placeholder="Enter Password" required />

          <label htmlFor="number"><b>PhoneNumber</b></label>
          <input {...register("PhoneNumber")} type="text" placeholder="Enter PhoneNumber" required />

          <label htmlFor="photo"><b>Select Your Profile Photo</b></label>
          <input onChange={convertToBase64} type="file" className="form-control" id="customFile" />
          {file === "" || file === null ? "" : <img width={400} height={100} src={file} />}

          <br />

          <div className="clearfix , loginDiv" >
            <button type="button" className="cancelbtn" onClick={onCancel}>Cancel</button>
            <button type="submit" className="signupbtn">Sign Up</button>
          </div>

        </div>
      </form>
    </>
  );
}

export default Signup;