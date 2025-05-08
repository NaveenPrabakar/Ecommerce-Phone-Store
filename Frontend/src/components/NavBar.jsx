import React from 'react';
import Home from '../assets/home.png'
import Shop from "../assets/shop.png"
import Sell from "../assets/Sell.png"
import Cart from "../assets/cart.png"
import Settings from "../assets/settings.png"

const NavBar = ({setStep, setProf, prof }) => {

    return (
        <div>
            <nav className="navbar navbar-light bg-gray-900">
                <a className="navbar-brand" href="#" onClick ={() => setStep("home")}>
                🏠
                   <span className = "text-white">Home</span>
                </a>

                <a className="navbar-brand" href="#" onClick ={() => setStep("shop")}>
                🏬
                    <span className = "text-white">Shop</span>
                </a>

                <a className="navbar-brand" href="#" onClick ={() => setStep("sell")}>
                💰
                    <span className = "text-white">Sell</span>
                </a>

                <a className="navbar-brand" href="#" onClick ={() => setStep("cart")}>
                🛒
                    <span className = "text-white">Cart</span>
                </a>

                <a className="navbar-brand" href="#" onClick ={() => setStep("settings")}>
                ⚙️
                    <span className = "text-white">Settings</span>
                </a>
            </nav>
        </div>
    );
};

export default NavBar;
