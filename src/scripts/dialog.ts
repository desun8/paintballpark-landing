import A11yDialog from "a11y-dialog";
import { disablePageScroll, enablePageScroll } from "scroll-lock";
import getCssProp from "./utils/getCssProp";

enum ModalType {
  Price,
  Service
}

const dialogScrollLock = (dialog: A11yDialog) => {
  dialog.on("show", function (element) {
    element.scrollTop = 0;
    disablePageScroll(element);

    if (window.smoothScrollbar) {
      window.smoothScrollbar.stop();
    }
  });

  dialog.on("hide", function (element) {
    enablePageScroll(element);

    if (window.smoothScrollbar) {
      window.smoothScrollbar.start();
    }
  });
};
const getDelay = () => {
  let delay: number;
  let defaultDelay = 300;
  const cssProp = getCssProp("--duration", document.body);
  const isTimeMs = cssProp.search(/ms/) !== -1;

  delay = parseFloat(cssProp);

  if (isNaN(delay)) {
    return defaultDelay;
  }

  return isTimeMs ? delay : delay * 1000;
};
const delay = getDelay();

export default () => {
  const menuDialog = () => {
    const element = document.querySelector("#page-menu") as HTMLElement;
    const btnClose = element.querySelector(".dialog-btn-close") as HTMLButtonElement;
    const items = Array.from(element.querySelectorAll('.main-nav__link')) as HTMLAnchorElement[];
    const anchorForm = element.querySelector(".page-nav__btn-form") as HTMLButtonElement;
    const dialog = new A11yDialog(element);

    [btnClose, anchorForm, ...items].forEach(btn => {
      btn.addEventListener("click", () => {
        dialog.hide();
        element.classList.add("is-hidden");
        setTimeout(
          () => {
            element.classList.remove("is-hidden");
          }, delay,
        );
      });
    });

    dialogScrollLock(dialog);
  };

  const modalDialog = () => {
    const element = document.querySelector("#modals") as HTMLElement;
    const btnClose = element.querySelector(".dialog-btn-close") as HTMLButtonElement;
    const modalPrice = element.querySelector("#modal-price") as HTMLElement;
    const modalService = element.querySelector("#modal-service") as HTMLElement;

    const btnElementsOpen = Array.from(document.querySelectorAll(".js-open-modal")) as HTMLButtonElement[];
    const dialog = new A11yDialog(element);

    const fillServiceModal = (rootElement: HTMLElement) => {
      const modalTitle = modalService.querySelector(".modal__title");
      const modalText = modalService.querySelector(".modal-service__describe");
      const modalMedia = modalService.querySelector(".modal-service__media")!;

      const rootTitle = rootElement.querySelector(".carousel-item__title");
      const rootText = rootElement.querySelector(".carousel-item__description");
      const rootVideo = rootElement.querySelector(".carousel-item__img video");
      const rootImage = rootElement.querySelector(".carousel-item__img img");

      console.log(rootImage);

      modalTitle!.innerHTML = rootTitle!.innerHTML;
      modalText!.innerHTML = rootText!.innerHTML;

      modalMedia.innerHTML = "";

      if (rootVideo && rootImage === null) {
        const videoElement = rootVideo.cloneNode(true) as HTMLVideoElement;
        videoElement.setAttribute("controls", "");
        videoElement.removeAttribute("loop");
        videoElement.removeAttribute("muted");
        modalMedia.appendChild(videoElement);
      }

      if (rootImage && rootVideo === null) {
        modalMedia.appendChild(rootImage.cloneNode(true));
      }
    };

    let currType = ModalType.Service;

    btnElementsOpen.forEach(btnOpen => {
      const type = btnOpen.dataset.modal;

      btnOpen.addEventListener("click", () => {
        switch (type) {
          case "price":
            currType = ModalType.Price;
            break;
          case "service":
            currType = ModalType.Service;
            break;
          default:
            return;
        }

        if (currType === ModalType.Service) {
          const parentElement = btnOpen.closest(".carousel-item") as HTMLElement;
          if (parentElement) {
            fillServiceModal(parentElement);
          }

          modalService.style.display = "";
          modalPrice.style.display = "none";
        }

        if (currType === ModalType.Price) {
          modalPrice.style.display = "";
          modalService.style.display = "none";
        }

        dialog.show();
      });
    });

    btnClose.addEventListener("click", () => {
      element.classList.add("is-hidden");
      setTimeout(
        () => {
          element.classList.remove("is-hidden");
          dialog.hide();
        }, delay,
      );
    });

    dialogScrollLock(dialog);
  };

  menuDialog();
  modalDialog();
}
