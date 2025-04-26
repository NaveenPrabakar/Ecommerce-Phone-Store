import { useState } from "react";
import viteLogo from "/vite.svg";
import "bootstrap/dist/css/bootstrap.css";
import "./App.css";

import SignUpForm from "./components/Signup";
import Login from "./components/Login";

function App() {
  const [step, setStep] = useState("login");

  return (
    <div className = "app-container">
      {step == "login" && <Login setStep={setStep} />}
      {step == "signup" && <SignUpForm setStep={setStep} />}
    </div>
  );
};

export default App;
