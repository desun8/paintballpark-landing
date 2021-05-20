import rAF from "./utils/rAF";

export default () => {
  const element = document.querySelector(".sticky-contacts") as HTMLElement;
  let totalScrollSize = document.documentElement.offsetHeight - window.innerHeight;

  const toggleVisibility = () => {
    const scrollTop = window.pageYOffset;
    const POS_START = 100;
    const POS_END = scrollTop + 400;

    if (scrollTop > POS_START && POS_END < totalScrollSize) {
      element.classList.remove("is-hide");
    } else {
      element.classList.add("is-hide");
    }
  }

  const handleScroll = () => {
    rAF(toggleVisibility);
  }

  const handleResize = () => {
    rAF(() => {
      totalScrollSize = document.documentElement.offsetHeight - window.innerHeight;
    });
  }

  window.addEventListener("scroll", handleScroll, { passive: true });
  window.addEventListener("change", handleResize);
}
