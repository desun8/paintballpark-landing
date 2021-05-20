const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      const { intersectionRatio } = entry;
      const target = entry.target as HTMLVideoElement

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

const autoplayVideo = (videoElm: HTMLVideoElement) => {
  observer.observe(videoElm);
};

export default autoplayVideo;
