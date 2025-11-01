import React from "react";
import daman from '../assets/daman.png'
import adnic from '../assets/adnic.png'
import ahlia from '../assets/ahlia.png'
import takaful from '../assets/takaful.png'
import afnic from '../assets/afnic.png'
import national from '../assets/national inc.png'

const Insurance = () => {
  const partners = [
    { name: "Daman", logo: daman },
    { name: "ADNIC", logo: adnic },
    { name: "Al Ain Ahlia Insurance Co.", logo: ahlia },
    { name: "Takaful", logo: takaful },
    { name: "AFNIC", logo: afnic },
    { name: "Al Buhaira National Insurance Co.", logo:national },
  ];

  return (
    <div className="w-full bg-white flex justify-center py-30">
      <div className="max-w-7xl w-full flex flex-col md:flex-row justify-between items-start px-6 md:px-12 gap-10">
        {/* LEFT SIDE */}
        <div className="md:w-1/3">
          <h1 className="text-4xl md:text-6xl font-semibold text-[#18528f] leading-tight">
            Insurance <br /> Partners
          </h1>
        </div>

        {/* RIGHT SIDE */}
        <div className="md:w-2/3 grid grid-cols-2 md:grid-cols-3 gap-x-16 gap-y-10 items-center justify-items-center">
          {partners.map((partner, index) => (
            <img
              key={index}
              src={partner.logo}
              className="h-32 w-auto object-contain grayscale hover:grayscale-0 transition duration-300"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Insurance;
