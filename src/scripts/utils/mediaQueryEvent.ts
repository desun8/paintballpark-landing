const smallScreen = window.matchMedia('(max-width: 64em)');
const consoleStyle = (background: string) => `
  background: ${background};
  padding: 1em;
  font-weight: 700`;

export const mqIsDesktop = !smallScreen.matches;

export const mediaQueryEvent = (cbMobile: Function, cbDesktop: Function) => {
  const handleTabletChange = (e: MediaQueryListEventInit) => {
    if (e.matches) {
      // eslint-disable-next-line no-console
      console.log('%cIS SMALL SCREEN', consoleStyle('cornflowerblue'));
      cbMobile();
    } else {
      // eslint-disable-next-line no-console
      console.log('%cIS LARGE SCREEN', consoleStyle('darkseagreen'));
      cbDesktop();
    }
  };

  smallScreen.addEventListener('change', handleTabletChange);
  handleTabletChange(smallScreen);
};
