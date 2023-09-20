import React, { useEffect, useState } from "react";
import { RiArrowDropRightLine } from "react-icons/ri";
import style from "../stylee/setting.module.css";
import axios from "axios";
const Settings = () => {
  const [activeIndex, setActiveIndex] = useState(2);
  const [isActive, setIsActive] = useState(true);
  const [element, setElement] = useState(2);
  const [state, setState] = useState();
  const [inputValue, setInpValue] = useState({});
  const [current, setCurrent] = useState();
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successChangeMessage, setSuccessChangeMessage] = useState("");
  const [errorChangeMessage, setErrorChangeMessage] = useState("");
  let [update ,setUpdate ]=useState()
  const handleClick = (id) => {
    setActiveIndex(activeIndex === id ? -1 : id);
    setElement(id);
  };
  let getInfo = (e) => {
    console.log(e);
    let { name, value } = e.target;
    setInpValue((old) => ({
      ...old,
      [name]: value,
    }));
    console.log(inputValue);
    console.log(current.password);
  };
  let ChangePass = () => {
    console.log(inputValue);
    if (inputValue.pass1 === current.password) {
      axios.get(`https://subjects-proj-data.onrender.com/all/${current.id}`)
      .then((res)=>{
      setCurrent((old)=>({...old,password:inputValue.pass2}))
        axios.put(`https://subjects-proj-data.onrender.com/all/${current.id}`, {
          ...res.data,
          password: inputValue.pass2,
        })
        .then(() => {
          setSuccessChangeMessage("Password changed");
          setErrorChangeMessage("");
        })
        .catch((err) => {
          console.log(err);
          setErrorChangeMessage("Something went wrong");
          setSuccessChangeMessage("");
        });
      })
      .catch(err=>console.log(err))
      
    } else {
      console.log("error");
      setErrorMessage("Incorrect password");
      setSuccessMessage("");
    }
  };
  let Delete_fun = () => {
    if (state === "admin") {
      axios
        .delete(`https://subjects-proj-data.onrender.com/all/${inputValue.userID}`)
        .then(() => {
          setSuccessMessage("User deleted successfuly");
          setErrorMessage("");
        })
        .catch((err) => {
          console.log(err);
          setErrorMessage("User not found");
          setSuccessMessage("");
        });
    } else {
      if (inputValue.password === current.password) {
        axios
          .delete(`https://subjects-proj-data.onrender.com/all/${current.id}`)
          .then(() => {
            setSuccessMessage("User deleted");
            setErrorMessage("");
          })
          .catch((err) => {
            console.log(err);
            setErrorMessage("Something went wrong");
            setSuccessMessage("");
          });
      } else {
        
        setErrorMessage("Incorrect password");
        setSuccessMessage("");
      }
    }
  };

  let st;
  const getstate = () => {
    axios
      .get("https://subjects-proj-data.onrender.com/state")
      .then((res) => {
        setCurrent(res.data);
        st = res.data.state;
        setState(st);
       
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getstate();
  }, []);

  return (
    <div className={style.body}>
      <div className="container">
        <h3 className={`text-center f-weignt-bold ${style.header}`}>
          Setting
        </h3>
        <ul className={style.ul}>
          <li
            id="1"
            className={`d-flex justify-content-between align-items-center ${style.li}`}
            onClick={() => handleClick(1)}
          >
            {state === "admin" ? <span>Delete user</span> : <span>Delete my account</span>}
            <span
              className={`${style.dropRight} ${isActive && element === 1 ? style.active : ""}`}
            >
              <RiArrowDropRightLine />
            </span>
          </li>
          {activeIndex === 1 && state === "admin" && (

            <div className="pb-3">
              <div class="col-auto">
                <label for="inputPassword0" class="col-form-label">
                  User Id:
                </label>
              </div>
              <div class="col-auto">
                <input
                  type="number"
                  id="inputPassword0"
                  class="form-control"
                  aria-describedby="passwordHelpInline"
                  name="userID"
                  onChange={getInfo}
                />
                {successMessage && <div className="alert alert-success mt-3">{successMessage}</div>}
                {errorMessage && <div className="alert alert-danger mt-3">{errorMessage}</div>}
                <button
                  type="submit"
                  className="btn btn-danger mt-3 d-flex mx-auto"
                  id="inputPassword0"
                  onClick={Delete_fun}
                >
                  Delete
                </button>
              </div>
            </div>
          )}
          {activeIndex === 1 && state === "user" && (
            <div className="pb-3">
              <form action="" method="get">
                <div class="col-auto">
                  <label for="inputPassword0" class="col-form-label">
                    Password:
                  </label>
                </div>
                <div class="col-auto">
                  <input
                    type="password"
                    id="inputPassword0"
                    class="form-control"
                    aria-describedby="passwordHelpInline"
                    name="password"
                    onChange={getInfo}
                  />
                </div>
                {successMessage && <div className="alert alert-success mt-2">{successMessage}</div>}
                {errorMessage && <div className="alert alert-danger mt-2">{errorMessage}</div>}
                <button
                  type="submit"
                  className="btn btn-danger mt-3 d-flex mx-auto"
                  onClick={Delete_fun}
                >
                  Delete
                </button>
              </form>
            </div>
          )}
          <li
            id="2"
            className={`d-flex justify-content-between align-items-center ${style.li}`}
            onClick={() => handleClick(2)}
          >
            Change Password
            <span
              className={`${style.dropRight} ${isActive && element === 2 ? style.active : ""}`}
            >
              <RiArrowDropRightLine />
            </span>
          </li>
          {activeIndex === 2 && (
            <div className="pb-3">
              <div class=" g-3 align-items-center">
                <div class="col-auto">
                  <label for="inputPassword6" class="col-form-label">
                    Old Password:
                  </label>
                </div>
                <div class="col-auto">
                  <input
                    type="password"
                    id="inputPassword6"
                    class="form-control"
                    aria-describedby="passwordHelpInline"
                    name="pass1"
                    onChange={getInfo}
                  />
                </div>
                <div class="col-auto"></div>
                <div class="col-auto ">
                  <label for="inputPassword" class="col-form-label">
                    New Password:
                  </label>
                </div>
                <div class="col-auto">
                  <input
                    type="password"
                    id="inputPassword"
                    class="form-control"
                    aria-describedby="passwordHelpInline"
                    required
                    name="pass2"
                    onChange={getInfo}
                  />
                </div>
                <span id="passwordHelpInline" class="form-text">
                  Must be 8-20 characters long.
                </span>
              
                {successChangeMessage && <div className="alert alert-success mt-2">{successChangeMessage}</div>}
                {errorChangeMessage && <div className="alert alert-danger mt-2">{errorChangeMessage}</div>}
                <button type="submit" className="btn btn-success mt-3 d-flex mx-auto" onClick={ChangePass}>
                  Change
                </button>
              </div>
            </div>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Settings;