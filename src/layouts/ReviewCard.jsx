import React from "react";
import { RiDoubleQuotesL } from "react-icons/ri";
import { FaStar } from "react-icons/fa";

const ReviewCard = ({ id, name, desc, rating }) => {
  return (
    <div
      className="w-full md:w-2/4 text-center mx-auto space-y-3 bg-tertiary dark:bg-gray-800 p-5 rounded-lg mb-3 cursor-pointer shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] dark:shadow-[rgba(255,_255,_255,_0.1)_0px_3px_8px]"
      key={id}
    >
      <RiDoubleQuotesL size={65} className="mx-auto text-primary" />
      <p className="text-gray-700 dark:text-gray-300">{desc}</p>
      <div className="flex justify-center gap-1">
        {[...Array(5)].map((_, index) => (
          <FaStar
            key={index}
            className="text-xl"
            color={index < rating ? "#ffc107" : "#e4e5e9"}
          />
        ))}
      </div>
      <h2 className="font-semibold text-2xl text-secondary dark:text-gray-200">{name}</h2>
    </div>
  );
};

export default ReviewCard; 