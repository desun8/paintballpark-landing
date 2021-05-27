// import Simplebar from "simplebar";
import "simplebar/dist/simplebar.css";
import "./styles/index.css";

// @ts-ignore
// import LocomotiveScroll from "locomotive-scroll";
// import "locomotive-scroll/dist/locomotive-scroll.min.css";


import dialog from "./scripts/dialog";
import service from "./scripts/service";
import stickyContacts from "./scripts/stickyContacts";
import Form from "./scripts/Form";
import autoplayVideo from "./scripts/autoplayVideo";
import fixedHeader from "./scripts/fixedHeader";

import carousel from "./scripts/carousel";
import isDesktop from "./scripts/utils/isDesktop";

// new LocomotiveScroll({
//   el: document.querySelector("[data-scroll-container]"),
//   smooth: true,
// });

const isDesktopScreen = isDesktop();

dialog();
fixedHeader();

if (isDesktopScreen) {
  carousel();
}

// if (!isDesktopScreen) {
//   console.log(isDesktopScreen);
//   const simplebarsElms = Array.from(document.querySelectorAll("[data-simplebar]")) as HTMLElement[];
//   simplebarsElms.forEach(elm => {
//     console.log("heru");
//     // new Simplebar(elm);
//   })
// }

setTimeout(
  () => {
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
//
// const app = document.querySelector<HTMLDivElement>('#app')!
//
// app.innerHTML = `
//   <h1>Hello Vite!</h1>
//   <a href="https://vitejs.dev/guide/features.html" target="_blank">Documentation</a>
// `
