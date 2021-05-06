let ticking = false;

const rAF = (cb) => {
  if (!ticking) {
    requestAnimationFrame(() => {
      cb();
      ticking = false;
    });

    ticking = true;
  }
}

export default rAF;