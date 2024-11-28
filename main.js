const MENU = document.querySelector("#menu");
const MENU_BTN = document.querySelector(".header__menu-btn");
const SLIDER = document.querySelector(".testimonials__slider");
const SLIDE = SLIDER.querySelector("li");
const SLIDER_PREV_BTN = document.querySelector(".testimonials__controls .prev");
const SLIDER_NEXT_BTN = document.querySelector(".testimonials__controls .next");
const PAGINATION = document.querySelectorAll(
  ".testimonials__navigation button"
);

/*========================HEADER MENU======================== */

MENU_BTN.addEventListener("click", () => {
  MENU_BTN.classList.add("open");
  MENU.showModal();
});

MENU.addEventListener("close", () => {
  MENU_BTN.classList.remove("open");
});

MENU.querySelector("#close-modal").addEventListener("click", closeModal);
MENU.querySelectorAll("a").forEach((link) =>
  link.addEventListener("click", closeModal)
);

/*========================SLIDER======================== */
let currentSlide = 1;
SLIDER.style.translate = getOffset(); // switch to slide 2 at start

// pagination
PAGINATION.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    const value = btn.getAttribute("data-value");
    if (value == currentSlide) return;
    currentSlide = value;

    PAGINATION.forEach((btn) => btn.classList.remove("active"));
    e.currentTarget.classList.add("active");

    SLIDER.classList.remove("move");
    SLIDER.style.translate = getOffset(value);
    SLIDER.classList.add("move");

    if (isDisabled(SLIDER_PREV_BTN)) SLIDER_PREV_BTN.disabled = false;
    if (isDisabled(SLIDER_NEXT_BTN)) SLIDER_NEXT_BTN.disabled = false;
  });
});

// resize
window.addEventListener("resize", () => {
  SLIDER.style.translate = getOffset();
});

// navigation
SLIDER_PREV_BTN.addEventListener("click", () => {
  if (isDisabled(SLIDER_NEXT_BTN)) SLIDER_NEXT_BTN.disabled = false;
  if (currentSlide <= 0) {
    SLIDER_PREV_BTN.disabled = true;
    return;
  }

  PAGINATION[currentSlide--].classList.remove("active");
  PAGINATION[currentSlide].classList.add("active");
  SLIDER.style.translate = getOffset();
});

SLIDER_NEXT_BTN.addEventListener("click", () => {
  if (isDisabled(SLIDER_PREV_BTN)) SLIDER_PREV_BTN.disabled = false;
  if (currentSlide >= PAGINATION.length - 1) {
    SLIDER_NEXT_BTN.disabled = true;
    return;
  }

  PAGINATION[currentSlide++].classList.remove("active");
  PAGINATION[currentSlide].classList.add("active");
  SLIDER.style.translate = getOffset();
});

/*========================UTILS======================== */

function closeModal() {
  MENU.close();
  MENU_BTN.classList.remove("open");
}

function getOffset(value = currentSlide) {
  if (window.innerWidth < 768) {
    return `${
      -(SLIDE.offsetWidth + getGap()) * value +
      (SLIDER.offsetWidth - SLIDE.offsetWidth) / 2
    }px 0`;
  }
  return `-${(SLIDE.offsetWidth + getGap()) * value}px 0`;
}

function getGap() {
  return parseInt(window.getComputedStyle(SLIDER).gap);
}

function isDisabled(element) {
  return element.disabled;
}
