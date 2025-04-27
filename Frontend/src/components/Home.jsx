import React from "react";
import { useState } from "react";
import { Phones } from "../data/phone";

const Home = ({ setProf, prof }) => {
  const preview = []; //only display three phones on the phone screen

  for (let i = 0; i < 3; i++) {
    preview.push(Phones[0].products[i]);
  }

  return (
    <div>
      <header className="bg-blue-500 shadow-md p-4 text-sm items-center justify-center">
        <h2 className="text-left font-serif">Hi {prof.Name}!</h2>
      </header>

      <div className="bg-green-500 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 sm:grid-cols-4 gap-6 p-6">
        {preview.map((c) => (
          <div
            key={c.id}
            className="bg-white rounded-lg shadow-md p-4 text-sm items-center justify-center hover:bg-black hover:text-white"
          >
            <img
              src={c.thumbnail}
              alt={c.title}
              className="flex justify-center items-center"
            />
            <div className="flex justify-between mt-4">
              <h3 className="text-sm font-semibold text-gray-700">
                Model: {c.title}
              </h3>
              <h3 className="text-green-700 font-extrabold text-sm">
                ${c.price}
              </h3>
            </div>

            <div className="flex justify-between mt-4">
              <h3 className="text-sm font-semibold text-black-600">
                Brand: {c.brand}
              </h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
