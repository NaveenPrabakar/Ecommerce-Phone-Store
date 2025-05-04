import { useState } from "react";
import viteLogo from "/vite.svg";
import "bootstrap/dist/css/bootstrap.css";
import "./App.css";

import SignUpForm from "./components/Signup";
import Login from "./components/Login";
import Home from "./components/Home";
import Shop from "./components/Shop";
import Purchasing from "./components/Purchasing";
import Admin from "./components/Admin";
import Sell from "./components/Sell";

function App() {
  const [step, setStep] = useState("login"); //switch between the pages
  const [success, setSuccess] = useState(""); //display success creation of account only
  const [prof, setProf] = useState(null); //which user logged on
  const [cart, setCart] = useState([]); //Items in cart
  const [addItem, setItem] = useState(); //Item to be added to cart

  return (
    <div className = "app-container">
      {step == "login" && <Login setStep={setStep} setSuccess={setSuccess} success={success} setProf={setProf} />}
      {step == "signup" && <SignUpForm setStep={setStep} setSuccess={setSuccess} />}
      {step == "home" && <Home setStep={setStep} setProf={setProf} prof={prof} />}
      {step == "admin" && <Admin setStep={setStep} setProf={setProf} prof={prof} setItem={setItem}/>}
      {step == "shop" && <Shop setStep={setStep} setProf={setProf} prof={prof} setItem={setItem}/>}
      {step == "purchasing" && <Purchasing setStep={setStep} setProf={setProf} prof={prof} setCart={setCart} cart={cart} addItem={addItem}/>}
      {step == "sell" && <Sell setStep={setStep} setProf={setProf} prof={prof} />}   
    </div>
  );
};

export default App;
