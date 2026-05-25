import Swiper from "swiper";
import { Pagination } from "swiper/modules";
import "swiper/swiper-bundle.css";

document.addEventListener("DOMContentLoaded", () => {
  new Swiper(".ministry-slider", {
    modules: [Pagination],
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
      el: ".ministry-pagination",
      clickable: true,
    },
  });
});
