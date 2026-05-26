import ua from "../locales/ua.json";
import sk from "../locales/sk.json";
import en from "../locales/en.json";

export const LANGUAGE_CHANGED_EVENT = "site-language-changed";

const DEFAULT_LANGUAGE = "ua";
const LANGUAGE_STORAGE_KEY = "siteLanguage";
const LANGUAGE_TO_HTML_LANG = {
  ua: "uk",
  sk: "sk",
  en: "en",
};
const resources = { ua, sk, en };

function isSupportedLanguage(language) {
  return Object.hasOwn(resources, language);
}

export function getLanguage() {
  const savedLanguage = localStorage.getItem(LANGUAGE_STORAGE_KEY);
  return isSupportedLanguage(savedLanguage) ? savedLanguage : DEFAULT_LANGUAGE;
}

export function getTranslationValue(key, language = getLanguage()) {
  const resource = resources[language] || resources[DEFAULT_LANGUAGE];
  return key.split(".").reduce((current, part) => current?.[part], resource);
}

export function translate(key, language = getLanguage()) {
  const value = getTranslationValue(key, language);

  return typeof value === "string" ? value : key;
}

export function applyTranslations(language = getLanguage()) {
  document.documentElement.lang = LANGUAGE_TO_HTML_LANG[language];

  document.querySelectorAll("[data-i18n]").forEach((element) => {
    element.textContent = translate(element.dataset.i18n, language);
  });

  document.querySelectorAll("[data-i18n-aria-label]").forEach((element) => {
    element.setAttribute(
      "aria-label",
      translate(element.dataset.i18nAriaLabel, language)
    );
  });

  document.querySelectorAll("[data-i18n-alt]").forEach((element) => {
    element.setAttribute("alt", translate(element.dataset.i18nAlt, language));
  });

  document.querySelectorAll("[data-i18n-content]").forEach((element) => {
    element.setAttribute(
      "content",
      translate(element.dataset.i18nContent, language)
    );
  });
}

export function setLanguage(language) {
  const nextLanguage = isSupportedLanguage(language)
    ? language
    : DEFAULT_LANGUAGE;

  localStorage.setItem(LANGUAGE_STORAGE_KEY, nextLanguage);
  applyTranslations(nextLanguage);
  document.dispatchEvent(
    new CustomEvent(LANGUAGE_CHANGED_EVENT, {
      detail: { language: nextLanguage },
    })
  );

  return nextLanguage;
}

document.addEventListener("DOMContentLoaded", () => {
  applyTranslations(getLanguage());
});
