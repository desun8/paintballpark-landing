export {};

declare global {
  interface Window {
    grecaptcha: any;
    Modernizr?: any;
    smoothScrollbar?: any
  }
}
