import { useState } from "react";
import viteLogo from "/vite.svg";
import "bootstrap/dist/css/bootstrap.css";
import "./App.css";

import SignUpForm from "./components/Signup";
import Login from "./components/Login";

function App() {
  const [step, setStep] = useState("login"); //switch between the pages
  const [success, setSuccess] = useState(""); //display success creation of account only

  return (
    <div className = "app-container">
      {step == "login" && <Login setStep={setStep} setSuccess={setSuccess} success={success} />}
      {step == "signup" && <SignUpForm setStep={setStep} setSuccess={setSuccess} />}
    </div>
  );
};

export default App;
