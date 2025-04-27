import React from "react";
import logo from "../assets/logo.gif";
import {useState } from "react";

const Login = ({setStep ,setSuccess,success, setUser}) => {

  const [user, setUser] = useState({ //creating profile
      Email:"",
      password:"",
    });

  const [error, setError] = useState("");

  const filled = (e) => { //update the information
    const { name, value } = e.target;
    setUser({...user, [name]: value});
  };

  const go = async () =>{

    setSuccess("");
    if(user.Email.length == 0){
      setError("Please fill in Email.")
      return;
    }
    else if(user.password.length == 0){
      setError("Please fill in password.")
      return;
    }

    const result = await fetch("http://localhost:8080/login",{// send the request to log in
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });

    if(result.status == 400){
      setError("Email does not exist");
    }
    else if(result.status == 401){
      setError("Password is incorrect");
    }
    else if(result.status == 200){
      const data = await result.json(); 
      setUser(data);
      console.log("Login successful", data);

      setStep("home"); //switch to the home page
      
      //switch to the home page
    }
    else{
      setError("Unknown error");
    }

  }




  return (
    //bootstrap template for sign up
    <div>
      <section className="vh-100">
        <div className="container h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-lg-12 col-xl-11">
              <div className="bg-black card text-white" style={{ borderRadius: "25px" }}>
                <div className="card-body p-md-5">
                <h1 className="text-center">
                    Phones Glore!
                  </h1>
                  <div className="row justify-content-center">
                    <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                      <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">
                        Login In
                      </p>

                      {error && <div className="alert alert-danger">{error}</div>}
                      {success && <div className= "alert alert-success">{success}</div>}

                      <form className="mx-1 mx-md-4">
                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                          <div className="form-outline flex-fill mb-0">
                            <input
                              type="email"
                              id="form3Example3c"
                              className="form-control"
                              name= "Email"
                              value={user.Email}
                              onChange={filled}
                            />
                            <label
                              className="form-label"
                              htmlFor="form3Example3c"
                            >
                              Your Email
                            </label>
                          </div>
                        </div>

                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                          <div className="form-outline flex-fill mb-0">
                            <input
                              type="password"
                              id="form3Example4c"
                              className="form-control"
                              name= "password"
                              value={user.password}
                              onChange={filled}
                            />
                            <label
                              className="form-label"
                              htmlFor="form3Example4c"
                            >
                              Password
                            </label>
                          </div>
                        </div>

                        <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                          <button
                            type="button"
                            className="btn btn-primary btn-lg hover:bg-red-500"
                            onClick={go}
                          >
                            Login
                          </button>
                        </div>

                        <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                          <button
                            type="button"
                            className="btn btn-primary btn-lg hover:bg-red-500"
                            onClick ={() => setStep("signup")}
                          >
                            Don't have an account? SignUp!
                          </button>
                        </div>

                      </form>
                    </div>
                    <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
                      <img
                        src={logo}
                        className="img-fluid"
                        alt="Sample image"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Login;
