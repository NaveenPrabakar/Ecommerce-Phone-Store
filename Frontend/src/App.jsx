import { useState } from "react";
import viteLogo from "/vite.svg";
import "bootstrap/dist/css/bootstrap.css";
import "./App.css";

import SignUpForm from "./components/Signup";
import Login from "./components/Login";
import Home from "./components/Home";

function App() {
  const [step, setStep] = useState("login"); //switch between the pages
  const [success, setSuccess] = useState(""); //display success creation of account only
  const [user, setUser] = useState(null); //which user logged on

  return (
    <div className = "app-container">
      {step == "login" && <Login setStep={setStep} setSuccess={setSuccess} success={success} setUser={setUser} />}
      {step == "signup" && <SignUpForm setStep={setStep} setSuccess={setSuccess} />}
      {step == "home" && <Home setUser={setUser} user={user} />}
    </div>
  );
};

export default App;
