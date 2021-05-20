enum Tab {
  Adults,
  Children,
  Groups
}

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
    }

    input.addEventListener("change", (event) => {
      const ct = event.currentTarget as HTMLInputElement;
      setActiveTab(ct);

      sectionElements[activeTab].scrollLeft = 0;
    });
  });
}
