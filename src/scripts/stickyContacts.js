import rAF from "./form/rAF";

class StickyContacts {
  constructor() {
    this.root = undefined;
    this.totalScrollSize = undefined;
    this.toggleVisibility = this.toggleVisibility.bind(this);
    this.handleScroll = this.handleScroll.bind(this);
    this.handleResize = this.handleResize.bind(this);
  }

  toggleVisibility() {
    const scrollTop = window.pageYOffset;
    const POS_START = 100;
    const POS_END = scrollTop + 200;

    if (scrollTop > POS_START && POS_END < this.totalScrollSize) {
      this.root.classList.remove("is-hide");
    } else {
      this.root.classList.add("is-hide");
    }
  }

  handleScroll() {
    rAF(this.toggleVisibility);
  }

  handleResize() {
    rAF(() => {
      this.totalScrollSize = document.body.scrollHeight - window.innerHeight;
    });
  }

  init() {
    try {
      this.root = document.querySelector(".sticky-contacts");
      this.totalScrollSize = document.body.scrollHeight - window.innerHeight;
      window.addEventListener("scroll", this.handleScroll, { passive: true });
      window.addEventListener("change", this.handleResize);
    } catch (e) {
      console.error("stickyContacts.js -> ", e);
    }
  }
}

export default StickyContacts;