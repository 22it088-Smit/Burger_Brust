import React from "react";

const MenuCard = ({ id, title, price, imgSrc, description }) => {
  return (
    <div
      className="group relative space-y-2 p-4 bg-white dark:bg-gray-800 shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] dark:shadow-[rgba(255,_255,_255,_0.1)_0px_3px_8px] rounded-md cursor-pointer hover:bg-primary transition duration-300 ease-in-out flex flex-col justify-between"
      key={id}
    >
      <div className="flex justify-between items-center">
        <div className="flex-grow pr-4">
          {/* Text content */} 
          <h1 className="font-semibold text-2xl text-primary group-hover:text-black dark:group-hover:text-white">
            {title}
          </h1>
          <p className="text-gray-600 dark:text-gray-300 group-hover:text-white text-sm">{description}</p>
        </div>
        <div className="w-24 h-24 flex-shrink-0">
          {/* Image container */}
          <img
            className="w-full h-full object-contain group-hover:scale-110 transition duration-300 ease-in-out"
            src={imgSrc}
            alt={title}
          />
        </div>
      </div>
      
      {/* Price */} 
      <div className="mt-4">
         <h3 className="font-semibold text-2xl text-secondary group-hover:text-white">{price}</h3>
      </div>

    </div>
  );
};

export default MenuCard;
