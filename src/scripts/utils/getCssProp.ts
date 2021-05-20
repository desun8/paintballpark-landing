const getCssProp = (name = '', elm = document.documentElement) => getComputedStyle(elm).getPropertyValue(name);

export default getCssProp;
