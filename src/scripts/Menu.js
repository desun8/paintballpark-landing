import { disablePageScroll, enablePageScroll } from "scroll-lock";

class Menu {
  constructor(menuBtn = undefined) {
    this.root = undefined;
    this.wrapper = undefined;
    this.menuBtn = menuBtn;
    this.isShow = false;
    this.toggleVisibility = this.toggleVisibility.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.init = this.init.bind(this);
  }

  toggleVisibility(shouldShow = false) {
    this.wrapper.style.willChange = "transform";

    if (shouldShow) {
      this.root.ariaHidden = false;
      disablePageScroll(this.root);
    } else {
      this.root.ariaHidden = true;
      enablePageScroll(this.root);
    }

    this.root.classList.toggle("is-active");

    setTimeout(() => {
      this.wrapper.style.willChange = "";
    }, 300);
  }

  handleClick() {
    if (!this.menuBtn.classList.contains("js-modal-close")) {
      this.isShow = !this.isShow;
      this.menuBtn.classList.toggle("page-btn--close");
      this.toggleVisibility(this.isShow);
    }
  }

  init() {
    try {
      this.root = document.querySelector(".page-nav");
      this.wrapper = this.root.querySelector(".page-nav__wrapper");
      this.menuBtn = this.menuBtn ? this.menuBtn : document.querySelector(".page-btn");
      this.menuBtn.addEventListener("click", this.handleClick);
    } catch (e) {
      console.error("Menu.js -> ", e);
    }
  }
}

export default Menu;