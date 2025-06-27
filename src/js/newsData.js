import Swiper from "swiper";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

document.addEventListener("DOMContentLoaded", async () => {
  const newsContainer = document.getElementById("news-slides");
  let swiper = null;

  try {
    const response = await fetch("/data/news.json");
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

    const newsData = await response.json();

    if (!newsData.length) {
      newsContainer.innerHTML = "<p>Новин поки немає.</p>";
      return;
    }

    newsContainer.innerHTML = "";

    newsData.forEach((item, index) => {
      const slide = createNewsSlide(item, index);
      newsContainer.appendChild(slide);
    });

    initializeSwiper();
    setupEventHandlers();
  } catch (error) {
    console.error("Помилка при завантаженні новин:", error);
    newsContainer.innerHTML = `
      <div class="error">
        <p>Помилка при завантаженні новин.</p>
        <button onclick="location.reload()">Спробувати знову</button>
      </div>
    `;
  }

  function createNewsSlide(item, index) {
    const slide = document.createElement("div");
    slide.className = "swiper-slide";
    slide.setAttribute("data-slide-index", index);

    const imageUrl = item.image;

    slide.innerHTML = `
      <article class="news-card">
        <div class="news-image">
          <img src="${imageUrl}" alt="${item.title}" loading="lazy" />
          <div class="news-overlay">
            <button class="view-full-post" data-url="${item.instagramUrl}">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
                <path d="M12 2.2c3.2 0 3.6 0 4.9.1 1.2.1 1.8.2 2.2.4.6.2 1 .5 1.4.9.4.4.7.8.9 1.4.2.4.3 1 .4 2.2.1 1.3.1 1.7.1 4.9s0 3.6-.1 4.9c-.1 1.2-.2 1.8-.4 2.2-.2.6-.5 1-.9 1.4-.4.4-.8.7-1.4.9-.4.2-1 .3-2.2.4-1.3.1-1.7.1-4.9.1s-3.6 0-4.9-.1c-1.2-.1-1.8-.2-2.2-.4-.6-.2-1-.5-1.4-.9-.4-.4-.7-.8-.9-1.4-.2-.4-.3-1-.4-2.2-.1-1.3-.1-1.7-.1-4.9s0-3.6.1-4.9c.1-1.2.2-1.8.4-2.2.2-.6.5-1 .9-1.4.4-.4.8-.7 1.4-.9.4-.2 1-.3 2.2-.4 1.3-.1 1.7-.1 4.9-.1zm0-2.2C8.7 0 8.3 0 7 .1 5.7.2 4.8.4 4.1.7c-.7.3-1.4.7-2 1.3C1.5 2.6 1.1 3.3.8 4c-.3.7-.5 1.6-.6 2.9C.1 8.3.1 8.7.1 12s0 3.7.1 5c.1 1.3.3 2.2.6 2.9.3.7.7 1.4 1.3 2 .6.6 1.3 1 2 1.3.7.3 1.6.5 2.9.6 1.3.1 1.7.1 5 .1s3.7 0 5-.1c1.3-.1 2.2-.3 2.9-.6.7-.3 1.4-.7 2-1.3.6-.6 1-1.3 1.3-2 .3-.7.5-1.6.6-2.9.1-1.3.1-1.7.1-5s0-3.7-.1-5c-.1-1.3-.3-2.2-.6-2.9-.3-.7-.7-1.4-1.3-2-.6-.6-1.3-1-2-1.3-.7-.3-1.6-.5-2.9-.6C15.7.1 15.3.1 12 .1z"/>
                <circle cx="12" cy="12" r="3.2"/>
                <circle cx="18.4" cy="5.6" r="1.5"/>
              </svg>
              <span>Повний пост</span>
            </button>
          </div>
          <div class="news-type">${getNewsTypeLabel(item.type)}</div>
        </div>
        <div class="news-content">
          <time class="news-date">${formatDate(item.date)}</time>
          <h3 class="news-subtitle">${item.title}</h3>
          <p class="news-description">${item.description}</p>
          <div class="news-actions">
            <a href="${
              item.instagramUrl
            }" target="_blank" rel="noopener" class="news-link">
              <span>Переглянути в Instagram</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2.2c3.2 0 3.6 0 4.9.1 1.2.1 1.8.2 2.2.4.6.2 1 .5 1.4.9.4.4.7.8.9 1.4.2.4.3 1 .4 2.2.1 1.3.1 1.7.1 4.9s0 3.6-.1 4.9c-.1 1.2-.2 1.8-.4 2.2-.2.6-.5 1-.9 1.4-.4.4-.8.7-1.4.9-.4.2-1 .3-2.2.4-1.3.1-1.7.1-4.9.1s-3.6 0-4.9-.1c-1.2-.1-1.8-.2-2.2-.4-.6-.2-1-.5-1.4-.9-.4-.4-.7-.8-.9-1.4-.2-.4-.3-1-.4-2.2-.1-1.3-.1-1.7-.1-4.9s0-3.6.1-4.9c.1-1.2.2-1.8.4-2.2.2-.6.5-1 .9-1.4.4-.4.8-.7 1.4-.9.4-.2 1-.3 2.2-.4 1.3-.1 1.7-.1 4.9-.1zm0-2.2C8.7 0 8.3 0 7 .1 5.7.2 4.8.4 4.1.7c-.7.3-1.4.7-2 1.3C1.5 2.6 1.1 3.3.8 4c-.3.7-.5 1.6-.6 2.9C.1 8.3.1 8.7.1 12s0 3.7.1 5c.1 1.3.3 2.2.6 2.9.3.7.7 1.4 1.3 2 .6.6 1.3 1 2 1.3.7.3 1.6.5 2.9.6 1.3.1 1.7.1 5 .1s3.7 0 5-.1c1.3-.1 2.2-.3 2.9-.6.7-.3 1.4-.7 2-1.3.6-.6 1-1.3 1.3-2 .3-.7.5-1.6.6-2.9.1-1.3.1-1.7.1-5s0-3.7-.1-5c-.1-1.3-.3-2.2-.6-2.9-.3-.7-.7-1.4-1.3-2-.6-.6-1.3-1-2-1.3-.7-.3-1.6-.5-2.9-.6C15.7.1 15.3.1 12 .1z"/>
                <circle cx="12" cy="12" r="3.2"/>
                <circle cx="18.4" cy="5.6" r="1.5"/>
              </svg>
            </a>
          </div>
        </div>
      </article>
    `;

    return slide;
  }

  function initializeSwiper() {
    const swiperElement = document.querySelector(".news-swiper");
    if (!swiperElement) {
      console.error("Swiper element not found");
      return;
    }

    const slides = document.querySelectorAll(".swiper-slide");
    if (slides.length === 0) {
      console.warn("No slides found for Swiper");
      return;
    }

    if (swiper) {
      swiper.destroy(true, true);
      swiper = null;
    }

    try {
      swiper = new Swiper(".news-swiper", {
        modules: [Navigation, Pagination],
        slidesPerView: 1,
        spaceBetween: 20,
        centeredSlides: false,
        grabCursor: true,
        loop: false,
        autoplay: false,
        resistance: true,
        resistanceRatio: 0,
        pagination: {
          el: ".swiper-pagination",
          clickable: true,
          dynamicBullets: true,
        },
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
        breakpoints: {
          768: {
            slidesPerView: 2,
            spaceBetween: 30,
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 40,
          },
        },
        on: {
          init: function () {
            console.log(
              "News Swiper initialized with",
              this.slides.length,
              "slides"
            );
          },
        },
      });

      console.log("News Swiper created successfully");
    } catch (error) {
      console.error("Error creating News Swiper:", error);
    }
  }

  function getNewsTypeLabel(type) {
    const types = {
      service: "Богослужіння",
      event: "Подія",
      announcement: "Оголошення",
      prayer: "Молитва",
      community: "Спільнота",
    };
    return types[type] || "Новини";
  }

  function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString("uk-UA", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }

  function setupEventHandlers() {
    document.addEventListener("click", (e) => {
      if (e.target.closest(".view-full-post")) {
        e.preventDefault();
        const button = e.target.closest(".view-full-post");
        const instagramUrl = button.dataset.url;
        window.open(instagramUrl, "_blank", "noopener,noreferrer");
      }
    });
  }

  let resizeTimeout;
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      if (swiper) {
        swiper.update();
      }
    }, 250);
  });
});
