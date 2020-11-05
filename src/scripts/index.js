import autoplayVideo from "./autoplayVideo";
import Modal from "./modal";
import initForms from "./form";
import StickyContacts from "./stickyContacts";
import Menu from "./Menu";

const pageBtn = document.querySelector(".page-btn");

autoplayVideo();
initForms();
new Menu(pageBtn).init();
new Modal(pageBtn).init();
new StickyContacts().init();
