// check_webp_feature:
//   'feature' can be one of 'lossy', 'lossless', 'alpha' or 'animation'.
//   'callback(feature, result)' will be passed back the detection result (in an asynchronous way!)
export enum Features {
  lossy = "lossy",
  lossless = "lossless",
  alpha = "alpha",
  animation = "animation"
}

export default (feature: Features, callback: (a: Features, b: boolean) => void)  => {
  const kTestImages = {
    lossy: "UklGRiIAAABXRUJQVlA4IBYAAAAwAQCdASoBAAEADsD+JaQAA3AAAAAA",
    lossless: "UklGRhoAAABXRUJQVlA4TA0AAAAvAAAAEAcQERGIiP4HAA==",
    alpha: "UklGRkoAAABXRUJQVlA4WAoAAAAQAAAAAAAAAAAAQUxQSAwAAAARBxAR/Q9ERP8DAABWUDggGAAAABQBAJ0BKgEAAQAAAP4AAA3AAP7mtQAAAA==",
    animation: "UklGRlIAAABXRUJQVlA4WAoAAAASAAAAAAAAAAAAQU5JTQYAAAD/////AABBTk1GJgAAAAAAAAAAAAAAAAAAAGQAAABWUDhMDQAAAC8AAAAQBxAREYiI/gcA",
  };

  const img = new Image();

  img.onload = function () {
    const result = (img.width > 0) && (img.height > 0);
    callback(feature, result);
  };

  img.onerror = function () {
    callback(feature, false);
  };

  img.src = "data:image/webp;base64," + kTestImages[feature];
}
