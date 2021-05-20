/**
 * Открытие видео во весь экран при клике на кнопку
 */

interface MyHTMLVideoElement extends HTMLVideoElement {
  webkitRequestFullscreen: any;
}

interface MyDocument extends Document {
  webkitFullscreenElement: any;
}

const fullscreen = () => {
  try {
    // В Safari 14.0.1 (mac) без префикса webkit не работает
    const btn = document.querySelector(".js-btn-fullscreen") as HTMLButtonElement;
    let videoElement: MyHTMLVideoElement | null = null;
    const videoSrcMp4 = btn.dataset.videoSrc;
    const videoSrcWebm = btn.dataset.videoWebm;
    const isSupportWebm = !!window.Modernizr?.video.webm;

    const setZIndex = (element: HTMLElement, value: string) => {
      element.style.zIndex = value;
    };

    const createVideoElement = () => {
      const video = document.createElement("video");
      video.controls = true;
      video.preload = "none";
      video.style.position = "absolute";
      video.style.width = "100%";

      document.body.appendChild(video);

      return video;
    };

    const addEvents = () => {
      if (videoElement !== null) {
        videoElement.addEventListener("fullscreenchange", handleFullscreenchange);
        videoElement.addEventListener("webkitfullscreenchange", handleFullscreenchange);
      }
    }

    // При клике запускаем видео и переходим во весь экран
    btn.addEventListener("click", () => {
      if (videoSrcMp4) {

        if (videoElement === null) {
          videoElement = createVideoElement();
          addEvents();
        }

        videoElement.src = (isSupportWebm && videoSrcWebm) ? videoSrcWebm : videoSrcMp4;
        videoElement.play();

        if (document.documentElement.requestFullscreen !== undefined) {
          videoElement.requestFullscreen();
          setZIndex(videoElement, "10");
        } else if (document.documentElement.webkitRequestFullscreen !== undefined) {
          videoElement.webkitRequestFullscreen();
          setZIndex(videoElement, "10");
        }
      }
    });

    // При выходе из фуллскрина видео ставится на паузу и очищается src
    const handleFullscreenchange = (e: any) => {
      if (document.fullscreenElement === null || (document as MyDocument).webkitFullscreenElement === null) {
        e.currentTarget.pause();
        e.currentTarget.src = "";
        setZIndex(e.currentTarget, "");
      }
    };
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error("Открытие видео во весь экран", e);
  }
};

export default fullscreen;
