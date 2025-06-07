document.addEventListener("DOMContentLoaded", () => {
  const newsContainer = document.getElementById("news-container");
  const newsData = JSON.parse(localStorage.getItem("churchNews")) || [];

  if (!newsData.length) {
    newsContainer.innerHTML = "<p>Новин поки немає.</p>";
    return;
  }

  newsData.forEach((item) => {
    const card = document.createElement("div");
    card.className = "news-card";
    card.dataset.id = item.id;
    card.innerHTML = `
      <img class="news-card-img" src="${item.image}" alt="${item.title}" />
      <p class="news-card-text">${item.title}</p>
    `;
    card.addEventListener("click", () => openModal(item));
    newsContainer.appendChild(card);
  });

  // Модалка
  const modal = document.getElementById("newsModal");
  const modalImg = document.getElementById("modalImage");
  const modalTitle = document.getElementById("modalTitle");
  const modalBody = document.getElementById("modalBody");
  const modalDate = document.getElementById("modalDate");
  const closeBtn = document.querySelector(".close-modal");

  function openModal(data) {
    modalImg.src = data.image;
    modalTitle.textContent = data.title;
    modalBody.textContent = data.body;
    modalDate.textContent = `Дата: ${data.date}`;
    modal.classList.add("open");
  }

  closeBtn.addEventListener("click", () => {
    modal.classList.remove("open");
  });

  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.classList.remove("open");
    }
  });
});
