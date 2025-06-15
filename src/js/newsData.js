import Swiper from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

document.addEventListener("DOMContentLoaded", async () => {
  const newsContainer = document.getElementById("news-container");

  try {
    const response = await fetch("/data/news.json");
    const newsData = await response.json();

    if (!newsData.length) {
      newsContainer.innerHTML = "<p>Новин поки немає.</p>";
      return;
    }

    newsData.forEach((item) => {
      const slide = document.createElement("div");
      slide.className = "swiper-slide";

      const wrapper = document.createElement("div");
      wrapper.className = "instagram-wrapper";

      const blockquote = document.createElement("blockquote");
      blockquote.className = "instagram-media";
      blockquote.setAttribute("data-instgrm-permalink", item.url);
      blockquote.setAttribute("data-instgrm-version", "14");
      blockquote.style.margin = "auto";

      wrapper.appendChild(blockquote);
      slide.appendChild(wrapper);
      newsContainer.appendChild(slide);
    });

    if (window.instgrm) {
      window.instgrm.Embeds.process();
    }

    new Swiper(".news-swiper", {
      slidesPerView: 1,
      spaceBetween: 20,
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
      breakpoints: {
        768: { slidesPerView: 2 },
        1024: { slidesPerView: 3 },
      },
    });
  } catch (error) {
    console.error("Помилка при завантаженні новин:", error);
  }
});
