document.addEventListener("DOMContentLoaded", () => {
  const menu = document.querySelector("[data-menu]");
  const closeBtn = document.querySelector("[data-menu-close]");
  const openBtn = document.querySelector("[data-menu-open]");
  const menuLinks = document.querySelectorAll(".menu-nav-link");

  // Открытие меню
  openBtn.addEventListener("click", () => {
    menu.classList.add("is-open");
    document.body.classList.add("no-scroll");
  });

  // Закрытие по крестику
  closeBtn.addEventListener("click", () => {
    menu.classList.remove("is-open");
    document.body.classList.remove("no-scroll");
  });

  // Закрытие по клику на любой пункт меню
  menuLinks.forEach((link) => {
    link.addEventListener("click", () => {
      menu.classList.remove("is-open");
      document.body.classList.remove("no-scroll");
    });
  });
});
