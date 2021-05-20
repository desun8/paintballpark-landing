export const loadRecaptcha = () => {
  if (window.grecaptcha === undefined) {
    const siteKey = "6LeDFv8ZAAAAADvO8QeneqiQyoJE0f9UOIRvt8uG";
    const url = "https://www.google.com/recaptcha/api.js?render=";

    const script = document.createElement("script");
    script.src = `${url}${siteKey}`;
    document.head.appendChild(script);
  }
};
