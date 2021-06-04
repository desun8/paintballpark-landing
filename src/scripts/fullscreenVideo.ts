/**
 * Открытие видео во весь экран при клике на кнопку
 */

interface MyHTMLVideoElement extends HTMLVideoElement {
  webkitRequestFullscreen: any;
}

interface MyDocument extends Document {
  webkitFullscreenElement: any;
}

interface MyHTMLElement extends HTMLElement {
  webkitFullscreenElement: any;
  webkitRequestFullscreen: any;
}

// В Safari 14.0.1 (mac) без префикса webkit не работает
// Для safari 14.5.1 (ios) используется фикс - styleIOSFix (добавляем стиль)
const fullscreen = () => {
  const FULLSCREEN_ELEMENT_ID = "fullscreenElement";

  try {
    const setZIndex = (element: HTMLElement, value: string) => {
      element.style.zIndex = value;
    };
    // Скрываем элемент, если не в фуллскрине (если не работает событие)
    const styleIOSFix = () => {
      const styleElement = document.createElement("style");
      document.head.appendChild(styleElement);

      const styleSheet = styleElement.sheet!;

      styleSheet.insertRule(
        `#${FULLSCREEN_ELEMENT_ID}:not(:-webkit-full-screen) {
          display: none;
        }`,
      );
    };
    const createVideoElement = () => {
      const video = document.createElement("video") as MyHTMLVideoElement;
      video.id = FULLSCREEN_ELEMENT_ID;
      video.controls = true;
      video.preload = "none";
      video.style.position = "absolute";
      video.style.width = "100%";

      document.body.appendChild(video);
      styleIOSFix();

      return video;
    };
    const addEvents = () => {
      if (videoElement !== null) {
        videoElement.addEventListener("fullscreenchange", handleFullscreenchange);
        videoElement.addEventListener("webkitfullscreenchange", handleFullscreenchange);
      }
    };
    // При выходе из фуллскрина видео ставится на паузу и очищается src
    const handleFullscreenchange = (e: any) => {
      if (document.fullscreenElement === null || (document as MyDocument).webkitFullscreenElement === null) {
        e.currentTarget.pause();
        e.currentTarget.src = "";
        e.currentTarget.style.display = "none";
        setZIndex(e.currentTarget, "");
      }
    };

    const btns = Array.from(document.querySelectorAll(".js-btn-fullscreen")) as HTMLButtonElement[];
    let videoElement: MyHTMLVideoElement | null = null;
    const isSupportWebm = !!window.Modernizr?.video.webm;


    btns.forEach(btn => {
      const videoSrcMp4 = btn.dataset.videoSrc;
      const videoSrcWebm = btn.dataset.videoWebm;


      // При клике запускаем видео и переходим во весь экран
      btn.addEventListener("click", () => {
        if (videoSrcMp4) {

          if (videoElement === null) {
            videoElement = createVideoElement();
            addEvents();
          }

          videoElement.src = (isSupportWebm && videoSrcWebm) ? videoSrcWebm : videoSrcMp4;
          videoElement.style.display = "";
          videoElement.play();

          if (document.documentElement.requestFullscreen !== undefined) {
            videoElement.requestFullscreen();
            setZIndex(videoElement, "10");
          } else if ((document.documentElement as MyHTMLElement).webkitRequestFullscreen !== undefined) {
            videoElement.webkitRequestFullscreen();
            setZIndex(videoElement, "10");
          }
        }
      });
    });
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error("Открытие видео во весь экран", e);
  }
};

export default fullscreen;
