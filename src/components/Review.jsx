import React, { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ReviewCard from "../layouts/ReviewCard";
import AddReview from "./AddReview";

const Review = () => {
  const [reviews, setReviews] = useState([
    {
      id: 1,
      desc: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Magnam illo inventore tempore ut natus id aliquid voluptas quasi culpa, voluptates, nisi dolores voluptatem nam. Voluptatibus aperiam vitae consectetur maiores! Eos?",
      name: "Alex Thompson",
      rating: 5,
    },
    {
      id: 2,
      desc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Veniam delectus, perferendis officiis at fuga voluptate voluptatem soluta alias sit atque.",
      name: "Emily Rodriguez",
      rating: 4,
    },
    {
      id: 3,
      desc: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Deleniti, blanditiis!",
      name: "Jordan Patel",
      rating: 5,
    },
    {
      id: 4,
      desc: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Magnam illo inventore tempore ut natus id aliquid voluptas quasi culpa, voluptates, nisi dolores voluptatem nam. Voluptatibus aperiam vitae consectetur maiores! Eos?",
      name: "Morgan Harper",
      rating: 4,
    },
    {
      id: 5,
      desc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Veniam delectus, perferendis officiis at fuga voluptate voluptatem soluta alias sit atque.",
      name: "Jordan Morales",
      rating: 5,
    },
  ]);
  const [showAddReview, setShowAddReview] = useState(false);

  const handleReviewSubmit = (newReview) => {
    const review = {
      id: reviews.length + 1,
      name: newReview.name,
      desc: newReview.review,
      rating: newReview.rating,
    };
    setReviews([...reviews, review]);
    setShowAddReview(false); // Hide the form after submission
  };

  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    pauseOnHover: true,
    arrows: false,
    responsive: [
      {
        breakpoint: 1023,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
        },
      },
    ],
  };

  return (
    <div className="dark:bg-gray-900 dark:text-secondary" id="review">
      {/* heading  */}
      <div className="flex flex-col items-center pt-24">
        <h1 className="font-semibold text-4xl text-center text-secondary dark:text-gray-200 mb-4">
          Our Reviews
        </h1>
        <button
          onClick={() => setShowAddReview(!showAddReview)}
          className="bg-primary text-white py-2 px-6 rounded-lg hover:bg-primary-dark transition duration-300"
        >
          {showAddReview ? "Hide Review Form" : "Add Your Review"}
        </button>
      </div>

      {/* Add Review Form */}
      {showAddReview && (
        <div className="container mx-auto px-4 py-8">
          <AddReview onReviewSubmit={handleReviewSubmit} />
        </div>
      )}

      {/* review card section  */}
      <div className="py-10 mx-4 md:mx-0">
        <Slider {...settings}>
          {reviews.map((item) => (
            <ReviewCard 
              key={item.id} 
              name={item.name} 
              desc={item.desc} 
              rating={item.rating}
            />
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default Review; 