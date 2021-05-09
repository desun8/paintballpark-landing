// import A11yDialog from "a11y-dialog";
import { disablePageScroll, enablePageScroll } from "scroll-lock";
import { A11yDialog, A11yDialogOuterBtn } from "./a11yDialog";

const LABEL_CLOSE = "Закрыть меню";

class Menu {
  constructor(menuBtn = undefined) {
    this.root = undefined;
    this.wrapper = undefined;

    this.dialogElm = undefined;
    this.dialog = undefined;

    this.menuBtn = menuBtn;
    this.isShow = false;
    this.handleClick = this.handleClick.bind(this);
  }

  changeBtnLabel(isShow) {
    this.menuBtn.ariaLabel = isShow ? LABEL_CLOSE : this.menuBtn.dataset.defaultLabel;
  }

  initDialog() {
    // this.dialog = new A11yDialog(this.dialogElm, document.querySelector("#page-main"));
    this.dialog = new A11yDialogOuterBtn(this.dialogElm, this.menuBtn);
  }

  toggleVisibility(shouldShow = false) {
    this.wrapper.style.willChange = "transform";

    if (shouldShow) {
      this.dialog.show();
      // this.root.ariaHidden = false;
      // this.root.inert = false;
      disablePageScroll(this.root);
    } else {
      this.dialog.hide();
      // this.root.ariaHidden = true;
      // this.root.inert = true;
      enablePageScroll(this.root);
    }

    this.root.classList.toggle("is-active");

    setTimeout(() => {
      this.wrapper.style.willChange = "";
    }, 300);
  }

  handleClick() {
    this.menuBtn.blur()
    if (!this.menuBtn.classList.contains("js-modal-close")) {
      this.isShow = !this.isShow;
      this.menuBtn.classList.toggle("page-btn--close");
      this.toggleVisibility(this.isShow);
      this.changeBtnLabel(this.isShow);
    }
  }

  init() {
    try {
      this.root = document.querySelector(".page-nav");
      this.wrapper = this.root.querySelector(".page-nav__wrapper");
      this.dialogElm = document.querySelector("#page-menu");
      this.menuBtn = this.menuBtn ? this.menuBtn : document.querySelector(".page-btn");

      this.menuBtn.addEventListener("focus", () => {
        console.log("BTN FOCUSED");
      });

      this.initDialog();
      this.menuBtn.addEventListener("click", this.handleClick);
    } catch (e) {
      console.error("Menu.js -> ", e);
    }
  }
}

export default Menu;