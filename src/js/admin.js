document.addEventListener("DOMContentLoaded", () => {
  const PASSWORD = "pastor123";

  const authSection = document.getElementById("auth-section");
  const adminPanel = document.getElementById("admin-panel");
  const loginBtn = document.getElementById("login-btn");
  const authError = document.getElementById("auth-error");

  loginBtn.addEventListener("click", () => {
    const enteredPassword = document.getElementById("admin-password").value;
    if (enteredPassword === PASSWORD) {
      authSection.style.display = "none";
      adminPanel.style.display = "block";
    } else {
      authError.textContent = "Неправильний пароль";
    }
  });

  const newsForm = document.getElementById("news-form");
  const titleInput = document.getElementById("news-title");
  const bodyInput = document.getElementById("news-body");
  const imageInput = document.getElementById("news-img");
  const successMessage = document.getElementById("news-success");

  newsForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const title = titleInput.value.trim();
    const body = bodyInput.value.trim();
    const image = imageInput.value.trim();

    if (!title || !body || !image) {
      successMessage.textContent = "❗️Заповніть усі поля!";
      successMessage.className = "error";
      return;
    }

    const newsItem = {
      id: Date.now(),
      title,
      body,
      image,
      date: new Date().toLocaleDateString("uk-UA"),
    };

    const newsData = JSON.parse(localStorage.getItem("churchNews")) || [];
    newsData.unshift(newsItem);
    localStorage.setItem("churchNews", JSON.stringify(newsData));

    titleInput.value = "";
    bodyInput.value = "";
    imageInput.value = "";

    successMessage.textContent = "✅ Новину додано!";
    successMessage.className = "success";
  });
});
