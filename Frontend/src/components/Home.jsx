import React from "react";
import { useState } from "react";
import { Phones } from "../data/phone";
import NavBar from "./NavBar"

const Home = ({ setProf, prof }) => {
  const preview = []; //only display three phones on the phone screen

  for (let i = 0; i < 3; i++) {
    preview.push(Phones[0].products[i]);
  }

  return (
    <div>
      <NavBar />
    </div>
  );
};

export default Home;
