import React from "react";
import logo from "../assets/logo.gif";
import Login from "./Login";
import {useState } from "react";

const SignUpForm = ({setStep, setSuccess}) => {

  const [profile, setprofile] = useState({ //creating profile
    Name: "",
    Email:"",
    password:"",
    admin: false,
    sell: [],
    mail: [],
    cart: []

  });

  const [error, setError] = useState(""); //display the error

  const fill = (e) => { //update the information
    const { name, value } = e.target;
    setprofile({...profile, [name]: value});
  };

  const submit = async () => {
    if(profile.Name.length == 0){
      setError("Please fill out your name");

      return;
    }
    else if(profile.Email.length == 0){
      setError("Please fill out your email");

      return;
    }

    else if(profile.password.length == 0){
      setError("Please enter a password");

      return;
    }

    try{
      const response = await fetch("http://localhost:8080/signup", {// send the request to sign up
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(profile),
      });

      if(response.status == 400){
        setError("Email is already in use");
      }
      else if(response.status == 200){
        setSuccess("Welcome to Phones Glore! Log in with your new Account!");
        setStep("login");
      }
    }
    catch(e){
      setError("Unable to signup at this time");
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
                        Sign up
                      </p>

                      {error && <div className="alert alert-danger">{error}</div>}

                      <form className="mx-1 mx-md-4">
                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                          <div className="form-outline flex-fill mb-0">
                            <input
                              type="text"
                              id="form3Example1c"
                              className="form-control"
                              name="Name"
                              value={profile.Name}
                              onChange={fill}
                            />
                            <label
                              className="form-label"
                              htmlFor="form3Example1c"
                            >
                              Your Name
                            </label>
                          </div>
                        </div>

                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                          <div className="form-outline flex-fill mb-0">
                            <input
                              type="email"
                              id="form3Example3c"
                              className="form-control"
                              name= "Email"
                              value={profile.Email}
                              onChange={fill}
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
                              value= {profile.password}
                              onChange={fill}
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
                            className="btn btn-primary btn-lg"
                            onClick={submit}
                          >
                            Register
                          </button>
                        </div>

                        <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                          <button
                            type="button"
                            className="btn btn-primary btn-lg"
                            onClick ={() => setStep("login")}
                          >
                            Already have an account? Login!
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

export default SignUpForm;
