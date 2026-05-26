import { getLanguage, setLanguage, translate } from "./i18n";

document.addEventListener("DOMContentLoaded", () => {
  const menu = document.querySelector("[data-menu]");
  const closeBtn = document.querySelector("[data-menu-close]");
  const openBtn = document.querySelector("[data-menu-open]");
  const menuLinks = document.querySelectorAll(".menu-nav-link");
  const languageSwitchers = document.querySelectorAll("[data-language-switcher]");
  const languageToggles = document.querySelectorAll("[data-language-toggle]");
  const languageOptions = document.querySelectorAll("[data-lang-option]");
  const languageCurrent = document.querySelectorAll("[data-language-current]");
  const currentLanguageFlags = document.querySelectorAll("[data-language-flag-current]");
  const languageCodes = ["ua", "sk", "en"];
  const languageFlagMap = {
    ua: "🇺🇦",
    sk: "🇸🇰",
    en: "🇺🇸",
  };

  let currentLanguage = getLanguage();

  function closeLanguageMenus() {
    languageSwitchers.forEach((switcher) => {
      switcher.classList.remove("is-open");
      switcher
        .querySelector("[data-language-toggle]")
        .setAttribute("aria-expanded", "false");
    });
  }

  function updateLanguage(language) {
    currentLanguage = languageCodes.includes(language) ? language : "ua";
    setLanguage(currentLanguage);

    languageCurrent.forEach((current) => {
      current.textContent = currentLanguage.toUpperCase();
    });

    languageToggles.forEach((toggle) => {
      toggle.setAttribute(
        "aria-label",
        translate("language.selectLabel", currentLanguage).replace(
          "{code}",
          currentLanguage.toUpperCase()
        )
      );
    });

    currentLanguageFlags.forEach((flag) => {
      flag.textContent = languageFlagMap[currentLanguage];
    });

    languageOptions.forEach((option) => {
      const isActive = option.dataset.langOption === currentLanguage;
      option.classList.toggle("is-active", isActive);
      option.setAttribute("aria-selected", String(isActive));
    });
  }

  function openMenu() {
    menu.classList.add("is-open");
    menu.setAttribute("aria-hidden", "false");
    openBtn.setAttribute("aria-expanded", "true");
    document.body.classList.add("no-scroll");
    closeBtn.focus();
  }

  function closeMenu(restoreFocus = true) {
    menu.classList.remove("is-open");
    menu.setAttribute("aria-hidden", "true");
    openBtn.setAttribute("aria-expanded", "false");
    document.body.classList.remove("no-scroll");
    if (restoreFocus) {
      openBtn.focus();
    }
  }

  openBtn.addEventListener("click", openMenu);
  closeBtn.addEventListener("click", () => closeMenu());

  menuLinks.forEach((link) => {
    link.addEventListener("click", () => {
      closeMenu(false);
    });
  });

  languageToggles.forEach((toggle) => {
    toggle.addEventListener("click", () => {
      const switcher = toggle.closest("[data-language-switcher]");
      const isOpen = switcher.classList.contains("is-open");

      closeLanguageMenus();
      switcher.classList.toggle("is-open", !isOpen);
      toggle.setAttribute("aria-expanded", String(!isOpen));
    });

    toggle.addEventListener("keydown", (event) => {
      if (event.key === "ArrowDown") {
        event.preventDefault();
        toggle.click();
        toggle
          .closest("[data-language-switcher]")
          .querySelector("[data-lang-option]")
          .focus();
      }
    });
  });

  languageOptions.forEach((option) => {
    option.addEventListener("click", () => {
      updateLanguage(option.dataset.langOption);
      closeLanguageMenus();
    });

    option.addEventListener("keydown", (event) => {
      if (event.key === "ArrowDown" || event.key === "ArrowUp") {
        event.preventDefault();
        const options = [...option.closest(".language-menu").querySelectorAll("[data-lang-option]")];
        const offset = event.key === "ArrowDown" ? 1 : -1;
        const index = (options.indexOf(option) + offset + options.length) % options.length;
        options[index].focus();
      }
    });
  });

  document.addEventListener("click", (event) => {
    if (!event.target.closest("[data-language-switcher]")) {
      closeLanguageMenus();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeLanguageMenus();
      if (menu.classList.contains("is-open")) {
        closeMenu();
      }
    }
  });

  updateLanguage(currentLanguage);
});
