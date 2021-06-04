// Фикс якорных ссылок под locomotive
export default () => {
  const linksToTop: HTMLAnchorElement[] | [] = Array.from(document.querySelectorAll("a[href^='#']:not([href$='#'])"));
  console.log(linksToTop);

  if (linksToTop.length) {
    linksToTop.forEach(link => {
      const id = link.hash;
      const target = document.querySelector(id) as HTMLElement;

      console.log(target);

      link.onclick = (event) => {
        event.preventDefault();

        if (window.smoothScrollbar !== undefined) {
            window.smoothScrollbar.scrollTo(target);
        }
      };
    });
  }
}

