import PhotoSwipe from "photoswipe";
import PhotoSwipeUI_Default from "photoswipe/dist/photoswipe-ui-default";


var pswpElement = document.querySelectorAll(".pswp")[0];

// build items array
// var items = [
//   {
//     src: "https://placekitten.com/600/400",
//     w: 600,
//     h: 400
//   },
//   {
//     src: "https://placekitten.com/1200/900",
//     w: 1200,
//     h: 900
//   }
// ];

const images = Array.from(document.querySelectorAll(".gallery__item img"));
const items = images.map(img => {
  // TODO: добавить проверку на поддержку webp.
  // И если поддреживается, то брать webp
  // Если нет, то jpg
  const src = img.dataset.src;
  return { src, w: 600, h: 400 };
});


// define options (if needed)
var options = {
  // optionName: 'option value'
  // for example:
  index: 0 // start at first slide
};

// Initializes and opens PhotoSwipe
var lightbox = new PhotoSwipe(pswpElement, PhotoSwipeUI_Default, items, options);

const btns = document.querySelectorAll(".gallery__item");
btns.forEach(btn => {
  btn.addEventListener('click', ()=>{
    lightbox = new PhotoSwipe( pswpElement, PhotoSwipeUI_Default, items, options);
    lightbox.init();
  });
})

export default lightbox;