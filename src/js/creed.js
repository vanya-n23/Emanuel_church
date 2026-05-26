import creedPdfUrl from "../assets/creed/Emmanuel_Creed.pdf?url";
import {
  getLanguage,
  getTranslationValue,
  LANGUAGE_CHANGED_EVENT,
} from "./i18n";

document.addEventListener("DOMContentLoaded", () => {
  const accordion = document.querySelector("[data-creed-accordion]");
  const download = document.querySelector("[data-creed-download]");
  let openItemIndex = null;

  if (!accordion || !download) {
    return;
  }

  download.href = creedPdfUrl;

  function renderCreed() {
    const items = getTranslationValue("creed.items", getLanguage());

    if (!Array.isArray(items)) {
      return;
    }

    accordion.innerHTML = "";

    items.forEach((item, index) => {
      const details = document.createElement("details");
      details.className = "creed-item";
      details.open = index === openItemIndex;

      const summary = document.createElement("summary");
      summary.className = "creed-summary";
      summary.textContent = item.title;

      const content = document.createElement("div");
      content.className = "creed-content";

      item.paragraphs.forEach((paragraph) => {
        const text = document.createElement("p");
        text.textContent = paragraph;
        content.appendChild(text);
      });

      details.append(summary, content);
      details.addEventListener("toggle", () => {
        if (!details.open) {
          if (openItemIndex === index) {
            openItemIndex = null;
          }
          return;
        }

        openItemIndex = index;
        accordion.querySelectorAll(".creed-item").forEach((itemElement) => {
          if (itemElement !== details) {
            itemElement.open = false;
          }
        });
      });
      accordion.appendChild(details);
    });
  }

  document.addEventListener(LANGUAGE_CHANGED_EVENT, renderCreed);
  renderCreed();
});
