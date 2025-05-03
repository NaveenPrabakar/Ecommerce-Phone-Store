import React from 'react';
import Home from '../assets/home.png'
import Shop from "../assets/shop.png"
import Sell from "../assets/Sell.png"
import Cart from "../assets/cart.png"
import Settings from "../assets/settings.png"

const NavBar = ({setStep, setProf, prof }) => {
    return (
        <div>
            <nav className="navbar navbar-light bg-light">
                <a className="navbar-brand" href="#">
                    <img src={Home} width="30" height="30" className="d-inline-block align-top" alt="Home"/>
                   Home
                </a>

                <a className="navbar-brand" href="#">
                    <img src={Shop} width="30" height="30" className="d-inline-block align-top" alt="Home"/>
                   Shop
                </a>

                <a className="navbar-brand" href="#">
                    <img src={Sell} width="30" height="30" className="d-inline-block align-top" alt="Home"/>
                   Sell
                </a>

                <a className="navbar-brand" href="#">
                    <img src={Cart} width="30" height="30" className="d-inline-block align-top" alt="Home"/>
                   Cart
                </a>

                <a className="navbar-brand" href="#">
                    <img src={Settings} width="30" height="30" className="d-inline-block align-top" alt="Home"/>
                   Settings
                </a>
            </nav>
        </div>
    );
};

export default NavBar;
