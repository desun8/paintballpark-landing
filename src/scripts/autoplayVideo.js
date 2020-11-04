const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      const { target, intersectionRatio } = entry;

      if (intersectionRatio > 0.5) {
        target.play();
        // console.log("play video");
      } else {
        target.pause();
        // console.log("pause video");
      }
    });
  },
  { threshold: 0.5 },
);

const autoplay = (videoElm) => {
  observer.observe(videoElm);
};

export default () => {
  const videos = document.querySelectorAll('.carousel-item__img video');
   videos.length && videos.forEach(video => autoplay(video));
}