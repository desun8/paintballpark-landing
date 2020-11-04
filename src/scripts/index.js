import autoplayVideo from "./autoplayVideo";
import Modal from "./modal";

const pageBtn = document.querySelector(".page-btn");

autoplayVideo();
new Modal(pageBtn).init();