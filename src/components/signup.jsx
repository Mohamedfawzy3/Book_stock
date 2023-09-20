import React, { useState } from "react";
import axios from "axios";
import style from "../stylee/signup.module.css";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState(false);
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();
  const getInfo = (e) => {
    const { name, value } = e.target;
    setUser((old) => ({
      ...old,
      [name]: value,
    }));
  };
let data
  const checkUser = async () => {
    try {
      const res = await axios.get("https://subjects-proj-data.onrender.com/all");
      setUsers(res.data);
      data=res.data;
      const existingUser = data.find((u) => u.name === user.name);
      const checkEmail = data.find((u) => u.email === user.email);
      
      if (existingUser || checkEmail) {
        setError(true);
      } else {
        setError(false);
        registerUser();
      }
    } catch (err) {
      console.log(err);
    }
  };
  const registerUser =  () => {
    try {
       axios.post("https://subjects-proj-data.onrender.com/all", user);
       if(user.name==="Admin"){
        axios.put('https://subjects-proj-data.onrender.com/state',{state:'admin' , name:user.name , email:user.email , id:"1" , password:user.password})
       }
       else{
        axios.get("https://subjects-proj-data.onrender.com/all")
        .then((res)=>{
        let arr=  (res.data.map((u)=>u.id ))
        console.log(arr.length)
          axios.put('https://subjects-proj-data.onrender.com/state',{state:'user' , name:user.name , email:user.email , id:arr.length+1 , password:user.password})
         navigate("/user")
        })
       .catch((err)=>console.log(err))
       }
     
    } catch (err) {
      console.log(err);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    checkUser();
    
  };

  return (
    <>
      <div
        className={`d-flex justify-content-center align-items-center ${style.signUp} `}
      >
        <div className={`d-flex flex-lg-row flex-column container ${style.signUpBox}`}>
          <div
            className={`text-center d-flex align-items-center justify-content-center p-3 ${style.text}`}
          >
            <div>
              <h3 className="text-light">Welcome Back!</h3>
              <p className="text-light">
                To keep connected with us please login with your personal info
              </p>
              <button className={`${style.btn} ${style.btnText}`} onClick={() => navigate("login")}>Sign in</button>
            </div>
          </div>
          <div className={`text-center p-3 w-100 ${style.forme}`}>
            <h2 className={`${style.signUph2}`}>Create Account</h2>
            <form className="gy-2 gx-3 align-items-center col-9 col-md-8 col-lg-7 m-auto" onSubmit={handleSubmit}>
              <div className="col-auto mb-3">
                <input
                  type="text"
                  className="form-control"
                  id="autoSizingInput"
                  placeholder="User Name"
                  name="name"
                  value={user.name}
                  required
                  onChange={getInfo}
                />
              </div>
              <div className="col-auto mb-3">
                <input
                  type="email"
                  className="form-control"
                  id="autoSizingInput"
                  placeholder="Enter your email"
                  name="email"
                  value={user.email}
                  required
                  onChange={getInfo}
                />
              </div>
              <div className="col-auto mb-3">
                <input
                  type="password"
                  className="form-control"
                  id="autoSizingInput"
                  placeholder="Password"
                  name="password"
                  value={user.password}
                  required
                  onChange={getInfo}
                />
              </div>
              {error && <div className="col-auto mb-3 alert alert-danger">This name or email is already  used.</div>}
              <div className="col-auto mb-3">
                <button type="submit" className={`${style.btn} ${style.btnSubmit}`} >
                  Sign Up
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;