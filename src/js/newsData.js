import Swiper from "swiper";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { getLanguage, LANGUAGE_CHANGED_EVENT, translate } from "./i18n";

// Constants
const SWIPER_CONFIG = {
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
      // Swiper initialized
    },
  },
};

const DATE_LOCALES = {
  ua: "uk-UA",
  sk: "sk-SK",
  en: "en-US",
};

const NEWS_IMAGES = {
  "sunday-service": new URL(
    "../assets/contacts/sunday-service.jpg",
    import.meta.url
  ).href,
  "music-ministry": new URL(
    "../assets/contacts/music-ministry.jpg",
    import.meta.url
  ).href,
  "small-group": new URL("../assets/contacts/small-group.jpg", import.meta.url)
    .href,
  "prayer-evening": new URL(
    "../assets/contacts/prayer-evening.jpg",
    import.meta.url
  ).href,
  "youth-events": new URL(
    "../assets/contacts/youth-events.jpg",
    import.meta.url
  ).href,
  "women-meeting": new URL(
    "../assets/contacts/women-meeting.jpg",
    import.meta.url
  ).href,
  "church-easter": new URL(
    "../assets/contacts/church-easter.jpg",
    import.meta.url
  ).href,
  "comminity-picknick": new URL(
    "../assets/contacts/comminity-picknick.jpg",
    import.meta.url
  ).href,
};

const INSTAGRAM_ICON_PATH = "M12 2.2c3.2 0 3.6 0 4.9.1 1.2.1 1.8.2 2.2.4.6.2 1 .5 1.4.9.4.4.7.8.9 1.4.2.4.3 1 .4 2.2.1 1.3.1 1.7.1 4.9s0 3.6-.1 4.9c-.1 1.2-.2 1.8-.4 2.2-.2.6-.5 1-.9 1.4-.4.4-.8.7-1.4.9-.4.2-1 .3-2.2.4-1.3.1-1.7.1-4.9.1s-3.6 0-4.9-.1c-1.2-.1-1.8-.2-2.2-.4-.6-.2-1-.5-1.4-.9-.4-.4-.7-.8-.9-1.4-.2-.4-.3-1-.4-2.2-.1-1.3-.1-1.7-.1-4.9s0-3.6.1-4.9c.1-1.2.2-1.8.4-2.2.2-.6.5-1 .9-1.4.4-.4.8-.7 1.4-.9.4-.2 1-.3 2.2-.4 1.3-.1 1.7-.1 4.9-.1zm0-2.2C8.7 0 8.3 0 7 .1 5.7.2 4.8.4 4.1.7c-.7.3-1.4.7-2 1.3C1.5 2.6 1.1 3.3.8 4c-.3.7-.5 1.6-.6 2.9C.1 8.3.1 8.7.1 12s0 3.7.1 5c.1 1.3.3 2.2.6 2.9.3.7.7 1.4 1.3 2 .6.6 1.3 1 2 1.3.7.3 1.6.5 2.9.6 1.3.1 1.7.1 5 .1s3.7 0 5-.1c1.3-.1 2.2-.3 2.9-.6.7-.3 1.4-.7 2-1.3.6-.6 1-1.3 1.3-2 .3-.7.5-1.6.6-2.9.1-1.3.1-1.7.1-5s0-3.7-.1-5c-.1-1.3-.3-2.2-.6-2.9-.3-.7-.7-1.4-1.3-2-.6-.6-1.3-1-2-1.3-.7-.3-1.6-.5-2.9-.6C15.7.1 15.3.1 12 .1z";

// Helper functions
function getNewsTypeLabel(type) {
  const label = translate(`news.types.${type}`);
  return label === `news.types.${type}` ? translate("news.defaultType") : label;
}

function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString(DATE_LOCALES[getLanguage()], {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function getNewsImage(imageKey) {
  return NEWS_IMAGES[imageKey] || imageKey;
}

function createInstagramIcon(size = 24, fill = "white") {
  return `
    <svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="${fill}">
      <path d="${INSTAGRAM_ICON_PATH}"/>
      <circle cx="12" cy="12" r="3.2"/>
      <circle cx="18.4" cy="5.6" r="1.5"/>
    </svg>
  `;
}

function createNewsSlide(item, index) {
  const title = translate(`news.items.${item.id}.title`);
  const description = translate(`news.items.${item.id}.description`);
  const slide = document.createElement("div");
  slide.className = "swiper-slide";
  slide.setAttribute("data-slide-index", index);

  slide.innerHTML = `
    <article class="news-card">
      <div class="news-image">
        <img src="${getNewsImage(item.image)}" alt="${title}" loading="lazy" />
        <div class="news-overlay">
          <button class="view-full-post" data-url="${item.instagramUrl}">
            ${createInstagramIcon()}
            <span>${translate("news.fullPost")}</span>
          </button>
        </div>
        <div class="news-type">${getNewsTypeLabel(item.type)}</div>
      </div>
      <div class="news-content">
        <time class="news-date">${formatDate(item.date)}</time>
        <h3 class="news-subtitle">${title}</h3>
        <p class="news-description">${description}</p>
        <div class="news-actions">
          <a href="${item.instagramUrl}" target="_blank" rel="noopener" class="news-link">
            <span>${translate("news.viewInstagram")}</span>
            ${createInstagramIcon(16, "currentColor")}
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
    return null;
  }

  const slides = document.querySelectorAll(".swiper-slide");
  if (slides.length === 0) {
    return null;
  }

  try {
    const swiper = new Swiper(".news-swiper", SWIPER_CONFIG);
    return swiper;
  } catch (error) {
    return null;
  }
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

function setupResizeHandler(getSwiper) {
  let resizeTimeout;
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      const swiper = getSwiper();
      if (swiper) {
        swiper.update();
      }
    }, 250);
  });
}

async function loadNewsData() {
  const response = await fetch("/data/news.json");
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return response.json();
}

function renderNews(newsData, container) {
  container.innerHTML = "";
  newsData.forEach((item, index) => {
    const slide = createNewsSlide(item, index);
    container.appendChild(slide);
  });
}

function showErrorMessage(container) {
  container.innerHTML = `
    <div class="error">
      <p>${translate("news.error")}</p>
      <button onclick="location.reload()">${translate("news.retry")}</button>
    </div>
  `;
}

function showEmptyMessage(container) {
  container.innerHTML = `<p>${translate("news.empty")}</p>`;
}

// Main function
document.addEventListener("DOMContentLoaded", async () => {
  const newsContainer = document.getElementById("news-slides");
  let newsData = [];
  let swiper = null;
  let state = "loading";

  function renderCurrentLanguage() {
    if (state === "error") {
      showErrorMessage(newsContainer);
      return;
    }

    if (state === "empty") {
      showEmptyMessage(newsContainer);
      return;
    }

    if (state !== "loaded") {
      return;
    }

    if (swiper) {
      swiper.destroy(true, true);
    }

    renderNews(newsData, newsContainer);
    swiper = initializeSwiper();
  }

  document.addEventListener(LANGUAGE_CHANGED_EVENT, renderCurrentLanguage);

  try {
    newsData = await loadNewsData();

    if (!newsData.length) {
      state = "empty";
      showEmptyMessage(newsContainer);
      return;
    }

    state = "loaded";
    renderCurrentLanguage();
    setupEventHandlers();
    setupResizeHandler(() => swiper);
  } catch (error) {
    state = "error";
    showErrorMessage(newsContainer);
  }
});
