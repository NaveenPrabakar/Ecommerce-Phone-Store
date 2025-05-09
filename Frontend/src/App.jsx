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
import Settings from "./components/Settings";
import Cart from "./components/Cart";
import Rotate from "./components/Rotate"
import Edit from "./components/Edit"
import About from "./components/About"

function App() {
  const [step, setStep] = useState("login"); //switch between the pages
  const [success, setSuccess] = useState(""); //display success creation of account only
  const [prof, setProf] = useState(null); //which user logged on
  const [cart, setCart] = useState([]); //Items in cart
  const [addItem, setItem] = useState(); //Item to be added to cart
  const [id, setId] = useState(0); //set the id for the phone

  return (
    <div className = "app-container">
      {step == "login" && <Login setStep={setStep} setSuccess={setSuccess} success={success} setProf={setProf} />}
      {step == "signup" && <SignUpForm setStep={setStep} setSuccess={setSuccess} />}
      {step == "home" && <Home setStep={setStep} setProf={setProf} prof={prof} setId={setId} />}
      {step == "admin" && <Admin setStep={setStep} setProf={setProf} prof={prof} setItem={setItem}/>}
      {step == "shop" && <Shop setStep={setStep} setProf={setProf} prof={prof} setItem={setItem}/>}
      {step == "purchasing" && <Purchasing setStep={setStep} setProf={setProf} prof={prof} setCart={setCart} cart={cart} addItem={addItem}/>}
      {step == "sell" && <Sell setStep={setStep} setProf={setProf} prof={prof} cart={cart} setId={setId} />} 
      {step == "cart" && <Cart setStep={setStep} setProf={setProf} cart={cart} setCart={setCart} />}
      {step == "settings" && <Settings setStep={setStep} setProf={setProf} prof={prof} />} 
      {step == "rotate" && <Rotate setStep={setStep} setProf={setProf} prof={prof} setId={setId} id={id} />} 
      {step == "edit" && <Edit setStep={setStep} setProf={setProf} prof={prof} id={id} />}
      {step == "about" && <About setStep={setStep} setProf={setProf} prof={prof} />}
    </div>
  );
};

export default App;
