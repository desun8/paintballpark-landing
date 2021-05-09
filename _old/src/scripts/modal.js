import A11yDialog from "a11y-dialog";
import { disablePageScroll, enablePageScroll } from "scroll-lock";

class Modal {
  constructor(btnClose = undefined) {
    this.root = undefined;
    this.dialogElm = undefined;
    this.dialog = undefined;
    this.btns = undefined;
    this.btnClose = btnClose || document.querySelector(".page-btn");
    this.modalPrice = undefined;
    this.modalService = undefined;
    this.modalType = ""; // price || service
    this.initDialog = this.initDialog.bind(this);
    this.handleOpen = this.handleOpen.bind(this);
    this.addEvents = this.addEvents.bind(this);
    this.init = this.init.bind(this);
  }

  initDialog() {
    this.dialog = new A11yDialog(this.dialogElm);

    this.dialog
      .on("show", () => {
        this.btnClose.classList.add("js-modal-close");
        this.btnClose.classList.add("page-btn--close");
        // this.root.classList.add("is-active");
        disablePageScroll(this.root);

        switch (this.modalType) {
          case "price":
            this.modalPrice.classList.add("is-active");
            break;
          case "service":
            this.modalService.classList.add("is-active");
            break;
          default:
            break;
        }
      })
      .on("hide", () => {
        this.btnClose.classList.remove("js-modal-close");
        this.btnClose.classList.remove("page-btn--close");
        // this.root.classList.remove("is-active");
        enablePageScroll(this.root);

        switch (this.modalType) {
          case "price":
            this.modalPrice.classList.remove("is-active");
            break;
          case "service":
            this.modalService.classList.remove("is-active");
            break;
          default:
            break;
        }
      });
  }

  handleOpen({ currentTarget }) {
    switch (currentTarget.dataset.modal) {
      case "price":
        this.modalType = "price";
        break;
      case "service":
        this.modalType = "service";
        break;
      default:
        break;
    }

    this.dialog.show();
  }

  addEvents() {
    this.btns.forEach(btn => {
      btn.addEventListener("click", this.handleOpen);
    });
  }

  init() {
    try {
      this.root = document.querySelector(".modal");
      this.dialogElm = document.querySelector("#my-accessible-dialog");
      this.btns = document.querySelectorAll(".js-open-modal");
      this.modalPrice = document.querySelector("#modal-price");
      this.modalService = document.querySelector("#modal-service");
      this.initDialog();
      this.addEvents();
    } catch (e) {
      console.error("modal.js -> ", e);
    }
  }
}

export default Modal;