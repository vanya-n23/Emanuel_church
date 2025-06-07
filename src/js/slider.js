import Swiper from "swiper";
import "swiper/swiper-bundle.css";

document.addEventListener("DOMContentLoaded", () => {
  new Swiper(".ministry-slider", {
    slidesPerView: 1.2,
    spaceBetween: 16,
    breakpoints: {
      640: {
        slidesPerView: 2,
      },
      1024: {
        slidesPerView: 4,
      },
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });
});
