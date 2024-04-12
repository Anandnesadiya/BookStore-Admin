import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

function Login() {

  const { register, handleSubmit } = useForm();
  const [data, setData] = useState("");

  const navigate = useNavigate();

  function onSignUp() {
    return navigate("/signup");
  }

  const onSubmit = (user) => {
    const userData = {
      Email: user.Email,
      Password: user.Password,
      OTP: user.OTP
    };

    loginAPI(userData).then((res) => {
      console.log(res);
      localStorage.setItem('accessToken', res.accesstoken)
       navigate("/layout/dashboard");
    }).catch((err) => {
      console.log(err);
      navigate("/login")
    })
    console.log(userData);
  };

  async function loginAPI(userData) {
    try {
      const res = await fetch("http://localhost:4000/admin/login/", {
        method: "POST",

        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(userData)
      });

      if (!res.ok) {
        throw new Error('Failed to sign up');
      }
      return res.json();


    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  }


  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="container">
          <h1>Login</h1>
          <hr />

          <label htmlFor="email"><b>Email</b></label>
          <input {...register("Email")} type="text" placeholder="Enter Email" required />

          <label htmlFor="psw"><b>Password</b></label>
          <input {...register("Password")} type="password" placeholder="Enter Password" required />

          <label htmlFor="number"><b>OTP</b></label>
          <input {...register("OTP")} type="text" placeholder="Enter OTP" required />

          <br />

          <div className="clearfix , loginDiv" >
            <button type="button" className="signupbtn" onClick={onSignUp}>SignUp</button>
            <button type="submit" className="loginbtn">Login</button>
          </div>
        </div>
      </form>
    </>
  );
}

export default Login;