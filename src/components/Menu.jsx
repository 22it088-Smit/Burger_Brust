import React from "react";
import MenuCard from "../layouts/MenuCard";
import img1 from "../assets/img/menu1.png";
import img2 from "../assets/img/menu-2.png";
import img3 from "../assets/img/menu-3.png";
import img4 from "../assets/img/menu-4.png";
import img5 from "../assets/img/menu-5.png";
import img6 from "../assets/img/menu-6.png";
import img7 from "../assets/img/menu-7.png";
import img8 from "../assets/img/menu-8.png";
import img9 from "../assets/img/menu-9.png";




const Menu = () => {
  const menuItems = [
    {
      id: 1,
      title: "Classic Burger",
      price: "₹300",
      imgSrc: img1,
      description: "A juicy grilled patty with lettuce, tomato, and cheese."
    },
    {
      id: 2,
      title: "Cheese Blast",
      price: "₹350",
      imgSrc: img2,
      description: "Loaded with triple cheese and smoky sauce."
    },
    {
      id: 3,
      title: "Spicy Delight",
      price: "₹290",
      imgSrc: img3,
      description: "Hot jalapeños and spicy mayo for a fiery kick."
    },
    {
      id: 4,
      title: "crispy chicken",
      price: "₹380",
      imgSrc: img4,
      description: " Golden-fried chicken breast with lettuce, mayo, and a crunchy, satisfying bite."
    },
    {
      id: 5,
      title: "triple chicken",
      price: "₹490",
      imgSrc: img5,
      description: "Hot jalapeños and spicy mayo for a fiery kick."
    },
    {
      id: 6,
      title: "double chicken",
      price: "₹430",
      imgSrc: img6,
      description: "Hot jalapeños and spicy mayo for a fiery kick."
    },
    {
      id: 7,
      title: "double chhese burger",
      price: "₹400",
      imgSrc: img7,
      description: "Hot jalapeños and spicy mayo for a fiery kick."
    },
    {
      id: 8,
      title: "korean chilli chicken",
      price: "₹350",
      imgSrc: img8,
      description: "Hot jalapeños and spicy mayo for a fiery kick."
    },
    {
      id: 9,
      title: "pery pery chicken",
      price: "₹320",
      imgSrc: img9,
      description: "Hot jalapeños and spicy mayo for a fiery kick."
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 dark:bg-gray-900">
      {menuItems.map((item) => (
        <MenuCard
          key={item.id}
          id={item.id}
          title={item.title}
          price={item.price}
          imgSrc={item.imgSrc}
          description={item.description}
        />
      ))}
    </div>
  );
};

export default Menu;