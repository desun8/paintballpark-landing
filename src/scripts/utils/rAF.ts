let ticking = false;

const rAF = (cb: () => void) => {
  if (!ticking) {
    requestAnimationFrame(() => {
      cb();
      ticking = false;
    });

    ticking = true;
  }
};

export default rAF;
