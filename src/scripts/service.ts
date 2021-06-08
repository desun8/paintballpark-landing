import { initServiceCarousel } from "./carousel";
import isDesktop from "./utils/isDesktop";

enum Tab {
  Adults,
  Children,
  Groups
}

const isDesktopScreen = isDesktop();

export default () => {
  let activeTab = Tab.Adults;
  const inputElements = Array.from(document.querySelectorAll("input[name='tab']")) as HTMLInputElement[];
  const sectionElements = Array.from(document.querySelectorAll(".service-tabs__section .simplebar-content-wrapper")) as HTMLElement[];

  const setActiveTab = (element: HTMLInputElement) => {
    const type = parseInt(element.dataset.type || "0");

    switch (type) {
      case 0:
        activeTab = Tab.Adults;
        break;
      case 1:
        activeTab = Tab.Children;
        break;
      case 2:
        activeTab = Tab.Groups;
        break;
    }
  };

  inputElements.forEach(input => {
    if (input.checked) {
      setActiveTab(input);

      if (isDesktopScreen) {
        initServiceCarousel(activeTab);
      }
    }

    input.addEventListener("change", (event) => {
      const ct = event.currentTarget as HTMLInputElement;
      setActiveTab(ct);

      if (isDesktopScreen) {
        initServiceCarousel(activeTab);
      }

      if (sectionElements[activeTab]) {
        sectionElements[activeTab].scrollLeft = 0;
      }
    });
  });
}
