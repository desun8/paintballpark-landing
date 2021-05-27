export const MAC_OS = "MacOS";
// export const WINDOWS = 'Windows';
// export const ANDROID = 'Android';
export enum OSClass {
  MAC_OS = "os-mac"
}

enum OS {
  MAC_OS
}

const getOS = () => {
  // let OSName = 'Unknown OS';
  let OSName;

  // if (navigator.appVersion.indexOf('Win') !== -1) OSName = WINDOWS;
  if (navigator.appVersion.indexOf("Mac") !== -1) OSName = OS.MAC_OS;
  // if (navigator.appVersion.indexOf('Linux') !== -1) OSName = 'Linux';
  // if (navigator.appVersion.indexOf('Android') !== -1) OSName = ANDROID;

  if (OSName === OS.MAC_OS) {
    document.documentElement.classList.add(OSClass.MAC_OS);
  }
};

export default getOS;
