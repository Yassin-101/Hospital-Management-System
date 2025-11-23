import React, { useContext, useRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../Context/AppContext";

const TopDoctors = () => {
  const navigate = useNavigate();
  const { doctors } = useContext(AppContext);
  const carouselRef = useRef(null);
  const [cardWidth, setCardWidth] = useState(0);

  // Measure card width (including gap)
  useEffect(() => {
    if (carouselRef.current) {
      const card = carouselRef.current.querySelector(".doctor-card");
      if (card) {
        const gap = 24; // same as Tailwind gap-6
        setCardWidth(card.offsetWidth + gap);
      }
    }
  }, [doctors]);

  // ✅ Auto-scroll every 3 seconds
  useEffect(() => {
    const container = carouselRef.current;
    if (!container || !cardWidth) return;

    const moveCards = () => {
      const maxScrollLeft = container.scrollWidth - container.clientWidth;
      let newScrollLeft = container.scrollLeft + cardWidth * 3;

      if (newScrollLeft >= maxScrollLeft - 5) {
        newScrollLeft = 0; // reset to start
      }

      container.scrollTo({
        left: newScrollLeft,
        behavior: "smooth",
      });
    };

    const interval = setInterval(moveCards, 3000);
    return () => clearInterval(interval);
  }, [cardWidth]);

  const scrollLeft = () => {
    if (carouselRef.current && cardWidth) {
      carouselRef.current.scrollBy({
        left: -cardWidth * 3,
        behavior: "smooth",
      });
    }
  };

  const scrollRight = () => {
    if (carouselRef.current && cardWidth) {
      carouselRef.current.scrollBy({
        left: cardWidth * 3,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="bg-[#18528f] py-16 flex flex-col items-center text-white relative overflow-hidden">
      <h1 className="text-5xl font-semibold mb-2">Seha Doctors</h1>
      <p className="text-md opacity-90 mb-8 text-center w-[80%] md:w-[40%]">
        Simply browse through our extensive list of trusted doctors.
      </p>

      <div className="relative w-full flex flex-col items-center">
        {/* CAROUSEL */}
        <div
          ref={carouselRef}
          className="flex gap-6 overflow-x-hidden no-scrollbar py-6"
          style={{
            width: "100%",
            maxWidth: "1200px",
            justifyContent: "center",
          }}
        >
          {doctors.slice(0, 12).map((item, index) => (
            <div
              key={index}
              onClick={() => navigate(`/appointments/${item._id}`)}
              className="doctor-card flex-shrink-0 w-[280px] bg-gradient-to-b from-blue-100 to-white rounded-2xl overflow-hidden cursor-pointer shadow-lg hover:-translate-y-2 transition-all duration-500"
              style={{ scrollSnapAlign: "start" }}
            >
              <img
                className="w-full h-64 object-cover"
                src={item.image}
                alt={item.name}
              />
              <div className="p-4 text-center text-gray-900">
                <p className="text-lg font-medium">{item.name}</p>
                <p className="text-sm text-gray-600">{item.speciality}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Control Row */}
        <div className="w-full max-w-[1200px] flex justify-between items-center mt-6 px-4">
          {/* Left Buttons */}
          <div className="flex gap-4">
            <button
              onClick={scrollLeft}
              className="bg-white text-blue-800 w-10 h-10 rounded-full shadow-md hover:bg-blue-100 transition text-xl flex items-center justify-center"
            >
              &#8592;
            </button>
            <button
              onClick={scrollRight}
              className="bg-white text-blue-800 w-10 h-10 rounded-full shadow-md hover:bg-blue-100 transition text-xl flex items-center justify-center"
            >
              &#8594;
            </button>
          </div>

          {/* Right Button */}
          <button
            onClick={() => {
              navigate(`/doctors`);
              scrollTo(0, 0);
            }}
            className="text-white underline text-xl cursor-pointer flex items-center gap-1 hover:text-blue-200 "
          >
            See All Doctors ↗
          </button>
        </div>
      </div>
    </div>
  );
};

export default TopDoctors;
