import { throttle } from "lodash";
import isDesktop from "./utils/isDesktop";
import isMobile from "./utils/isMobile";

// type Status = {
//   offset: { x: number, y: number },
//   limit: { x: number, y: number }
// }

enum ScrollDirection {
  Up,
  Down
}

type TimerId = ReturnType<typeof setTimeout> | null;


const isDesktopScreen = isDesktop();
const transition = "transform 0.5s";

export default () => {
  const headerParent = document.querySelector(".page-header") as HTMLElement;
  const headerElement = headerParent.querySelector(".page-header__head") as HTMLElement;
  const footerElement = document.querySelector(".page-footer");
  let headerHeight = headerElement.offsetHeight;
  let clientHeight = document.documentElement.clientHeight + (isDesktopScreen ? 0 : 200);
  const locomotiveScroll = window.smoothScrollbar;
  const isNativeScroll = locomotiveScroll === undefined || isMobile();

  let prevScrollTop = 0;
  let currScrollTop = 0;
  let isHeaderPinned = false;
  let isFooterVisible = false;
  let timerId: TimerId = null;
  let isPinnedStart = false;
  let isUnpinnedStart = false;

  headerParent.style.paddingTop = headerHeight + "px";
  headerElement.style.position = "absolute";

  const clearTimer = (id: TimerId) => {
    if (id !== null) {
      clearTimeout(id);
    }
  };

  const pinHeader = (isNative = true) => {
    requestAnimationFrame(() => {
      if (isPinnedStart) return;

      isPinnedStart = true;

      if (isHeaderPinned) {
        isPinnedStart = false;
        isUnpinnedStart = false;
        return;
      }

      console.log("start pinned header");
      clearTimer(timerId);

      isHeaderPinned = true;
      // headerElement.style.willChange = "transform";

      if (isNative) {
        headerElement.style.position = "fixed";
      } else {
        headerParent.classList.add("is-fixed");
      }

      headerElement.style.zIndex = "9999";
      headerElement.classList.add("is-fixed");

      headerElement.style.transition = "";

      headerElement.style.transform = "translate3d(0, -200px, 0)";

      setTimeout(() => {
        headerElement.style.transition = transition;
        headerElement.style.transform = "translate3d(0, 0, 0)";
        isPinnedStart = false;
      }, 100);

      timerId = setTimeout(() => {
        headerElement.style.willChange = "";
      }, 400);
    });
  };

  const resetStyles = (isNative: boolean) => {
    requestAnimationFrame(() => {
      if (isNative) {
        headerElement.style.position = "absolute";
      } else {
        headerParent.classList.remove("is-fixed");
        headerElement.style.transform = "translate3d(0, 0, 0)";
      }

      headerElement.style.zIndex = "";
      headerElement.style.transition = "";
      headerElement.classList.remove("is-fixed");
      headerElement.style.transform = "translate3d(0, 0, 0)";

      isHeaderPinned = false;
      headerElement.style.willChange = "";
    });
  };

  const unpinHeader = (isNative = true) => {
    requestAnimationFrame(() => {
      if (isUnpinnedStart) return;

      isUnpinnedStart = true;

      if (!isHeaderPinned) {
        isPinnedStart = false;
        isUnpinnedStart = false;
        return;
      }

      console.log("start unpinned header");
      clearTimer(timerId);

      headerElement.style.willChange = "transform";
      headerElement.style.transition = transition;
      headerElement.style.transform = "translate3d(0, -200px, 0)";

      timerId = setTimeout(() => {
        resetStyles(isNative);
        isUnpinnedStart = false;
      }, 200);
    });
  };

  const toggleHeader = (scrollTop: number) => {
    currScrollTop = scrollTop;
    const direction = currScrollTop > prevScrollTop ? ScrollDirection.Down : ScrollDirection.Up;

    if (direction === ScrollDirection.Up && !isFooterVisible) {
      if (currScrollTop > clientHeight) {
        if (!isNativeScroll) {
          headerElement.style.transform = `translate3d(0, 0, 0)`;
        }

        pinHeader(isNativeScroll);
      } else {
        unpinHeader(isNativeScroll);
      }
    } else {
      unpinHeader(isNativeScroll);
    }

    prevScrollTop = currScrollTop;
  };

  if (footerElement) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const {isIntersecting} = entry;
          isFooterVisible = isIntersecting;
        });
      },
      {rootMargin: isDesktopScreen ? "-200px" : "200px", threshold: [0.1, 0.5, 1]},
    );

    observer.observe(footerElement);
  }

  if (isNativeScroll) {
    const handleScroll = () => {
      toggleHeader(document.documentElement.scrollTop);
    };
    const onScroll = throttle(handleScroll, 200);

    document.addEventListener("scroll", onScroll, {passive: true});
  } else {
    locomotiveScroll.on("scroll", (e: any) => {
      // console.log(e);
      toggleHeader(e.scroll.y);
    });
    // locomotiveScroll!.addListener((status: Status) => {
    //   toggleHeader(status.offset.y);
    // });
  }
}
