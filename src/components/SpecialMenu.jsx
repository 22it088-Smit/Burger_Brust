import React from "react";
import img1 from "../assets/img/menu2.jpg";
import img2 from "../assets/img/menu3.jpg";
import img3 from "../assets/img/menu4.jpg";
import SpecialMenuCard from "../layouts/SpecialMenuCard";

const SpecialMenu = () => {
  return (
    <div className="dark:bg-gray-900 dark:text-secondary">
      <div className=" min-h-screen flex flex-col justify-center items-center md:px-32 px-5 pt-16 md:pt-0">
        {/* heading  */}
        <h1 className=" font-semibold text-4xl text-center text-secondary dark:text-gray-200 my-8">
          Special Menu
        </h1>

        {/* card section  */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-14 md:gap-5">
          <SpecialMenuCard img={img1} title="Delight Burger" price="₹120" />
          <SpecialMenuCard img={img2} title="Jamboree Burger" price="₹140" />
          <SpecialMenuCard img={img3} title="Serenade Burger" price="₹160" />
        </div>
      </div>
    </div>
  );
};

export default SpecialMenu;
