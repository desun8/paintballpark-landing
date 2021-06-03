import Glide from "@glidejs/glide";
import "@glidejs/glide/dist/css/glide.core.min.css";

export default () => {
  const addCarouselStyleClass = (rootElm: HTMLElement) => {
    const slidesElm = rootElm.querySelector("[data-glide-slides]")!;
    const slideElm = slidesElm.querySelector("[data-glide-slide]")!;

    rootElm.classList.add("glide")
    slidesElm.classList.add("glide__slides")
    slideElm.classList.add("glide__slide")
  }

  const initServiceCarousel = () => {
    const glide = new Glide(".glide", {
      // type: "carousel",
      perView: 3,
      gap: 28,
      peek: {before: 0, after: 150},
      bound: true,
      animationDuration: 1000,
      animationTimingFunc: "ease",
    }).mount();

    const controllBtns = Array.from(document.querySelectorAll(".service-tabs__btn")) as HTMLButtonElement[];

    controllBtns.forEach(btn => {
      btn.addEventListener("click", () => {
        const isPrev = btn.classList.contains("service-tabs__btn--prev");
        glide.go(isPrev ? "<" : ">");
      });
    });
  };

  const initInstagramCarousel = () => {
    const glide = new Glide(".gallery-carousel.glide", {
      perView: 4,
      gap: 30,
      peek: {before: 0, after: 150},
      bound: true,
      animationDuration: 1000,
      animationTimingFunc: "ease",
    }).mount();

    const controllBtns = Array.from(document.querySelectorAll(".block-gallery .service-tabs__controllers")) as HTMLButtonElement[];

    controllBtns.forEach(btn => {
      btn.addEventListener("click", () => {
        const isPrev = btn.classList.contains("service-tabs__btn--prev");
        glide.go(isPrev ? "<" : ">");
      });
    });
  };

  const glideElements = Array.from(document.querySelectorAll("[data-glide-root]")) as HTMLElement[];
  glideElements.forEach(glide => {
    addCarouselStyleClass(glide)
  })

  initServiceCarousel();
  initInstagramCarousel();
}
