import Simplebar from "simplebar";
import "simplebar/dist/simplebar.css";
import "./styles/index.css";

// @ts-ignore
import LocomotiveScroll from "locomotive-scroll";
import "locomotive-scroll/dist/locomotive-scroll.min.css";


import dialog from "./scripts/dialog";
import service from "./scripts/service";
import stickyContacts from "./scripts/stickyContacts";
import Form from "./scripts/Form";
import autoplayVideo from "./scripts/autoplayVideo";
import fixedHeader from "./scripts/fixedHeader";

import carousel from "./scripts/carousel";
import isDesktop from "./scripts/utils/isDesktop";
import fullscreenVideo from "./scripts/fullscreenVideo";

const isDesktopScreen = isDesktop();

const locomotiveScroll = new LocomotiveScroll({
  el: document.querySelector("[data-scroll-container]"),
  smooth: true,
});

window.smoothScrollbar = locomotiveScroll;

dialog();
fixedHeader();
fullscreenVideo();

if (isDesktopScreen) {
  carousel();

  const simplebarsModalElm = document.querySelector("[data-simplebar-modal]") as HTMLElement;
  new Simplebar(simplebarsModalElm, {
    autoHide: false
  });
} else {
  const simplebarsElms = Array.from(document.querySelectorAll("[data-simplebar-elm]")) as HTMLElement[];
  simplebarsElms.forEach(elm => {
    new Simplebar(elm);
  });
}

setTimeout(
  () => {
    locomotiveScroll.update();
    service();

    if (!isDesktopScreen) {
      stickyContacts();
    }
  }, 0,
);

// init forms
(() => {
  const formElements = Array.from(document.querySelectorAll("form")) as HTMLFormElement[];

  formElements.forEach((form) => new Form(form));
})();

// autoplay videos
(() => {
  const welcomeVideoElement = document.querySelector(".hero-video video") as HTMLVideoElement;
  const serviceVideoElements = Array.from(document.querySelectorAll(".carousel-item__img video")) as HTMLVideoElement[];

  if (welcomeVideoElement) {
    const videoElements = [welcomeVideoElement, ...serviceVideoElements];
    videoElements.forEach(element => {
      autoplayVideo(element);
    });
  }
})();
