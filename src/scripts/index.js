import autoplayVideo from "./autoplayVideo";
import Modal from "./modal";
import initForms from "./form";
import StickyContacts from "./stickyContacts";

const pageBtn = document.querySelector(".page-btn");

autoplayVideo();
initForms();
new Modal(pageBtn).init();
new StickyContacts().init();
