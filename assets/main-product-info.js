/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
/*!***********************************************!*\
  !*** ./src/new-build/js/main-product-info.js ***!
  \***********************************************/
if (window.innerWidth <= 1024) {
  var wpItemMain = document.querySelector('.ms-mpi');
  if (wpItemMain) {
    wpItemMain.classList.add('swiper');
    var swiperWrapper = wpItemMain.firstElementChild;
    swiperWrapper.classList.add('swiper-wrapper');
    var swiperaItem = wpItemMain.querySelectorAll('.card-wrapper');
    swiperaItem.forEach(function (itemSlide) {
      itemSlide.classList.add('swiper-slide');
    });
    var mobileSliderInfo = new Swiper(wpItemMain, {
      slidesPerView: 1.6,
      spaceBetween: 20,
      loop: false,
      breakpoints: {
        600: {
          slidesPerView: 2.5
        },
        800: {
          slidesPerView: 3.5
        }
      }
    });
  }
}
/******/ })()
;