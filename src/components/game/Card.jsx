import React from "react";

const Card = ({ card, handleChoice, flipped, disabled }) => {
  const handleClick = () => {
    if (!disabled) {
      handleChoice(card);
    }
  };

  return (
    <div
      className={`relative card w-32 h-32 sm:w-40 sm:h-40 md:w-44 md:h-44 cursor-pointer`}
      onClick={handleClick}
    >
      <div
        className={`absolute inset-0 transition-transform duration-300 ${
          flipped ? "flipped" : ""
        }`}
      >
        <img
          src={`${card.src}`}
          alt="card"
          loading="lazy"
          className="w-full h-full object-cover border-2 border-richblack-5 rounded-sm front"
        />
        <img
          src="/images/js.png"
          alt="cover"
          loading="lazy"
          className="w-full h-full object-cover border-2 border-richblack-5 rounded-sm back"
        />
      </div>
    </div>
  );
};

export default Card;
