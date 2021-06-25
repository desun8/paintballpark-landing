import Glide from "@glidejs/glide";
import "@glidejs/glide/dist/css/glide.core.min.css";
import isDesktop from "./utils/isDesktop";

interface MyGlide extends Glide.Properties {
  _c?:any
}

if (isDesktop()) {
  const addCarouselStyleClass = (rootElm: HTMLElement) => {
    const slidesElm = rootElm.querySelector("[data-glide-slides]")!;
    const slideElms = Array.from(slidesElm.querySelectorAll("[data-glide-slide]")!);

    rootElm.classList.add("glide");
    slidesElm.classList.add("glide__slides");

    slideElms.forEach(slide => {
      slide.classList.add("glide__slide");
    });
  };

  const glideElements = Array.from(document.querySelectorAll("[data-glide-root]")) as HTMLElement[];
  glideElements.forEach(glide => {
    addCarouselStyleClass(glide);
  });
}

const serviceGlideElms = Array.from(document.querySelectorAll(".service-tabs__section")) as HTMLElement[];
const serviceControllBtns = Array.from(document.querySelectorAll(".service-tabs__btn")) as HTMLButtonElement[];

export const initServiceCarousel = (index: number) => {
  const glideElm: HTMLElement | undefined = serviceGlideElms[index];

  if (glideElm === undefined) {
    console.warn("Проблема инициализации карусели для данной услуги.");
    return;
  }

  const selector = `.glide[data-type="${glideElm.dataset.type}"]`;
  const glide: MyGlide = new Glide(selector, {
    perView: 3,
    gap: 28,
    peek: {before: 0, after: 150},
    bound: true,
    animationDuration: 1000,
    animationTimingFunc: "ease",
  }).mount();

  const perView = glide.settings.perView!;
  const totalSize = glide._c.Sizes.length;

  if (totalSize <= perView) {
    glide.disable();
  }

  serviceControllBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      const isPrev = btn.classList.contains("service-tabs__btn--prev");
      glide.go(isPrev ? "<" : ">");
    });
  });
};

export const initInstagramCarousel = () => {
  const glide = new Glide(".gallery-carousel.glide", {
    perView: 4,
    gap: 30,
    peek: {before: 0, after: 150},
    bound: true,
    animationDuration: 1000,
    animationTimingFunc: "ease",
  }).mount();

  const controllBtns = Array.from(document.querySelectorAll(".block-gallery .service-tabs__controllers .service-tabs__btn")) as HTMLButtonElement[];

  controllBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      const isPrev = btn.classList.contains("service-tabs__btn--prev");
      glide.go(isPrev ? "<" : ">");
    });
  });
};
