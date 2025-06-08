document.addEventListener("DOMContentLoaded", () => {
  const newsContainer = document.getElementById("news-container");

  // 👉 Fallback-заглушка для новин (показується, якщо localStorage пустий)
  const fallbackNews = [
    {
      id: "demo1",
      title: "Молодіжна зустріч у суботу",
      body: "Приєднуйтесь до теплого вечора спілкування, молитви і кави о 18:00",
      image: "../assets/contacts/youth-events.jpg",
      date: "07.06.2025",
    },
    {
      id: "demo2",
      title: "Служіння прославлення відкрито для нових учасників",
      body: "Якщо ви співаєте або граєте на інструментах — запрошуємо до команди!",
      image: "../assets/contacts/small-group.jpg",
      date: "05.06.2025",
    },
    {
      id: "demo2",
      title: "Служіння прославлення відкрито для нових учасників",
      body: "Якщо ви співаєте або граєте на інструментах — запрошуємо до команди!",
      image: "../assets/contacts/sunday-service.jpg",
      date: "05.06.2025",
    },
    {
      id: "demo2",
      title: "Служіння прославлення відкрито для нових учасників",
      body: "Якщо ви співаєте або граєте на інструментах — запрошуємо до команди!",
      image: "../assets/contacts/youth-events.jpg",
      date: "05.06.2025",
    },
  ];

  // 🔄 Завантажуємо з localStorage або використовуємо порожній масив
  const savedNews = JSON.parse(localStorage.getItem("churchNews")) || [];

  // 🔁 Комбінуємо saved + fallback (тільки якщо savedNews пустий)
  const combinedNews = [...savedNews, ...fallbackNews];

  // ❌ Якщо все одно порожньо (на всяк випадок)
  if (!combinedNews.length) {
    newsContainer.innerHTML = "<p>Новин поки немає.</p>";
    return;
  }

  // 🧱 Генерація карток новин
  combinedNews.forEach((item) => {
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

  // 📦 Модалка
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

  closeBtn.addEventListener("click", () => modal.classList.remove("open"));

  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.classList.remove("open");
    }
  });
});
