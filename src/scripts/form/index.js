import Form from "./form";

const initForms = () => {
  const forms = Array.from(document.querySelectorAll(".form"));


  forms.forEach((form) => new Form(form));
};

export default initForms;
