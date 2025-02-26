let x = setInterval(function(){
  var tcaTtem = document.querySelectorAll(".tca-icon__item");
  for (let i = 0; i <= tcaTtem.length - 1; i++) {
    if (tcaTtem[i].hasAttribute("data-show")) {
      tcaTtem[i].addEventListener("click", tcaClick);

    }
  }
  function tcaClick(e) {
    var dataClick = this.getAttribute("data-show");
    var tcaContent = document.querySelectorAll(".tca_item");
    for (let i = 0; i <= tcaContent.length - 1; i++) {
      tcaContent[i].classList.add("ajc-hidden");
    }
    if (dataClick === "note") {
  
      document.querySelector(".tca__note").classList.remove("ajc-hidden");
    } else if (dataClick === "coupon") {
      document.querySelector(".tca_coupon").classList.remove("ajc-hidden");
    } else if (dataClick === "shipping") {
      document.querySelector(".tca_shipping").classList.remove("ajc-hidden");
    } else {
      document.querySelector(".tca_gift_wrap").classList.remove("ajc-hidden");
    }
  }
  document.addEventListener("click", function (e) {
    if (e.target.classList.contains("stp-tool__back")) {
      e.target.closest(".tca_item").classList.add("ajc-hidden");
    }
  }); 
},1000)

const  ajc_discount__push = document.querySelector(".ajc-discount__push")
if(ajc_discount__push){
  ajc_discount__push.addEventListener("click", function () {
    var codeInput = document.querySelector("#CartDiscountcode");
    if (codeInput.value !== null && codeInput.value !== "") {
      window.localStorage.setItem("discountCode", codeInput.value);
      var url = window.location.href + "discount/" + codeInput.value;
      fetch(url)
          .then(response => {
            console.log('discount code applied')
          })
          .then(data => { return data });
    }
    this.closest(".tca_coupon").classList.add("ajc-hidden");
  });
}


const discountCode = localStorage.getItem("discountCode");
if (discountCode != null && discountCode !== "") {
  var codeInput = document.querySelector("#CartDiscountcode");
  codeInput.value = discountCode;
  codeInput.textContent = discountCode;
}
if (document.querySelector("#cpcode-incart__apply")) {
  document
    .querySelector("#cpcode-incart__apply")
    .addEventListener("click", function () {
      var codeInput = document.querySelector("input[name='cartdiscountcode']");
      if (codeInput.value !== null && codeInput.value !== "") {
        window.localStorage.setItem("discountCode", codeInput.value);
        const this_url = window.location.href;
        const finish_url = this_url.replace("/cart", "");
        var url = finish_url + "/discount/" + codeInput.value;
        document.querySelector(".load-more_spinner").classList.remove("hide");
        document.querySelector(".load-more_text").classList.add("hide");
        fetch(url)
          .then((response) => {
            document.querySelector(".load-more_spinner").classList.add("hide");
            document.querySelector(".load-more_text").classList.remove("hide");
            document.querySelector(".cp-applied").classList.remove("hide");
          })
          .catch((err) => {
            console.log(err);
          });
      }
    });

  document
    .querySelector(".cp-applied__close")
    .addEventListener("click", function () {
      this.closest(".cp-applied").classList.add("hide");
    });
}

function toggleGiftWrap(show) {
  const tpModalGiftWrap = document.querySelector("#tp_modal_gift_wrap");
  if (tpModalGiftWrap) {
    if (show) {
      document.body.classList.add("overlay-body-quick-view");
      tpModalGiftWrap.classList.add("is-open-tp-modal");
    } else {
      document.body.classList.remove("overlay-body-quick-view");
      tpModalGiftWrap.classList.remove("is-open-tp-modal");
    }
  }
}

function giftWrap() {
  let counter = 0;
  let x = setInterval(function () {
    counter += 1;
    try {
      var cartAjax = window.CartAjax;

      document.addEventListener("click", function (e) {
        if (
          e.target.classList.contains("tca-mini_cart-tool__add") ||
          e.target.closest(".tca-mini_cart-tool__add")
        ) {
          let target = null;
          if (e.target.classList.contains("tca-mini_cart-tool__add")) {
            target = e.target;
          }
          if (e.target.closest(".tca-mini_cart-tool__add")) {
            target = e.target.closest(".tca-mini_cart-tool__add");
          }

          toggleGiftWrap(true)
        }

        if (
          e.target.classList.contains("gift-wrap-close") ||
          e.target.closest(".gift-wrap-close")
        ) {
          let target = null;
          if (e.target.classList.contains("gift-wrap-close")) {
            target = e.target;
          }
          if (e.target.closest(".gift-wrap-close")) {
            target = e.target.closest(".gift-wrap-close");
          }

          toggleGiftWrap(false)
        }

        if (e.target.classList.contains("stp-tool__back")) {
          toggleGiftWrap(false)
        }

        if (e.target.classList.contains("remove-cart-item-all")) {
          if (cartAjax.loadingCartAjax) {
            cartAjax.loadingCartAjax.classList.remove("hidden");

            document
              .querySelector("tp-cart-ajax")
              .classList.add("overlay-cart");
          }
          fetch("/cart/clear.js", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: null,
          })
            .then(res => res.json())
            .then(data => {
              // window.location.reload()
              const gift_wrap_variant_ids = document.querySelector('#gift_wrap_variant_ids')
              if (gift_wrap_variant_ids) {
                const buttonActions = document.querySelectorAll(".gift-wrap-item__action--select")
                if (buttonActions.length > 0) {
                  buttonActions.forEach(buttonAction => {
                    if (buttonAction.textContent.trim() == 'Select') {
                      buttonAction.removeAttribute('disabled')
                      buttonAction.classList.remove('disabled-class')

                    } else {
                      buttonAction.setAttribute('disabled', 'disabled')
                      buttonAction.classList.add('disabled-class')
                    }
                  })
                }
                gift_wrap_variant_ids.setAttribute('data-exist', 'false')
              }
              window.renderCountInCart();
              toggleGiftWrap(false)
              cartAjax.renderCartAjax();
              cartAjax.hideLoading();
            })
            .catch((error) => {
              console.error("Error:", error);
              cartAjax.hideLoading();
            });
        }

        if (e.target.classList.contains("variant-item")) {
          const wrapper_variant = e.target.closest(".wrapper-variant");

          if (wrapper_variant) {
            const activeBefore = wrapper_variant.querySelector(".active");
            if (activeBefore) {
              activeBefore.classList.remove("active");
            }
            e.target.classList.add("active");

            let productId = e.target
              .closest(".gift-wrap-item")
              .getAttribute("data-id");
            const collection_gift_wrap = document.querySelector(
              "script#collection_gift_wrap"
            );
            if (collection_gift_wrap) {
              const collection_gift_wrap_json = JSON.parse(
                collection_gift_wrap.textContent
              );
              if (collection_gift_wrap_json.length > 0) {
                // target product
                let objProductTarget = collection_gift_wrap_json.find(
                  (product) => {
                    return product.id == productId;
                  }
                );

                if (objProductTarget.variants.length > 1) {
                  const gift_wrap_item_variants = e.target.closest(
                    ".gift-wrap-item__variants"
                  );
                  const variantActives =
                    gift_wrap_item_variants.querySelectorAll(
                      ".variant-item.active"
                    );
                  let arrOptionActive = [];
                  if (variantActives.length > 0) {
                    variantActives.forEach((item) => {
                      arrOptionActive.push(item.textContent);
                    });
                  }

                  let currentVariant = objProductTarget.variants.find(
                    (variant) => {
                      return !variant.options
                        .map((option, index) => {
                          return arrOptionActive[index] === option;
                        })
                        .includes(false);
                    }
                  );

                  // console.log(currentVariant);

                  const gift_wrap_item = e.target.closest(".gift-wrap-item");
                  if (gift_wrap_item) {
                    const buttonSelect = gift_wrap_item.querySelector(
                      ".gift-wrap-item__action--select"
                    );
                    if (buttonSelect) {
                      buttonSelect.setAttribute(
                        "data-variant-id",
                        currentVariant.id
                      );
                    }
                  }

                  // Re render button select
                  const gift_wrap_variant_ids = document.querySelector(
                    "#gift_wrap_variant_ids"
                  );
                  if (gift_wrap_variant_ids) {
                    const dataVariantQty = JSON.parse(
                      gift_wrap_variant_ids.getAttribute("data-variant-qty")
                    );

                    const variantQtyCurrent = dataVariantQty.find((item) => {
                      return item.variant_id == currentVariant.id;
                    });

                    if (variantQtyCurrent) {
                      const qtyCurrent = variantQtyCurrent.qty;
                      const buttonAction = gift_wrap_item.querySelector(
                        ".gift-wrap-item__action--select"
                      );
                      if (qtyCurrent == 0) {
                        if (buttonAction) {
                          buttonAction.setAttribute("disabled", "disabled");
                          buttonAction.classList.add("disabled-class");
                          buttonAction.innerHTML = "Sold Out";
                        }
                      } else {
                        if (
                          gift_wrap_variant_ids.getAttribute("data-exist") !== "true"
                        ) {
                          buttonAction.removeAttribute("disabled");
                          buttonAction.classList.remove("disabled-class");
                          buttonAction.innerHTML = "Select";
                        } else {
                          buttonAction.setAttribute("disabled", "disabled");
                          buttonAction.classList.add("disabled-class");
                          buttonAction.innerHTML = "Select";
                        }
                      }
                    }
                  }

                  // Re render price
                  renderPrice(
                    gift_wrap_item,
                    currentVariant.price,
                    currentVariant.compare_at_price
                  );

                  function renderPrice(priceDOM, price, compareAtPrice = null) {
                    if (!price) return;
                    if (priceDOM.length == 0) return;

                    // this.priceDOM.forEach(function (priceDOM) {
                    const priceSale = priceDOM.querySelector(".price__sale");
                    const priceRegular =
                      priceDOM.querySelector(".price__regular");

                    if (compareAtPrice != null) {
                      // This sale

                      priceSale.style.display = "block";
                      priceRegular.style.display = "none";

                      priceDOM.classList.contains("price--no-compare") &&
                        priceDOM.classList.remove("price--no-compare");
                      priceDOM.classList.add("price--on-sale");

                      const priceItemSale =
                        priceSale.querySelector(".price-item--sale");
                      const priceCompareAtPrice = priceSale.querySelector(
                        ".price-item--regular"
                      );

                      if (priceItemSale) {
                        priceItemSale.textContent = formatCurrency(price);
                      }
                      if (priceCompareAtPrice) {
                        priceCompareAtPrice.textContent =
                          formatCurrency(compareAtPrice);
                      }
                    } else {
                      // This regular
                      priceSale.style.display = "none";
                      priceRegular.style.display = "block";
                      const priceCompareAtPrice = priceRegular.querySelector(
                        ".price-item--regular"
                      );
                      if (priceCompareAtPrice) {
                        priceCompareAtPrice.textContent = formatCurrency(price);
                      }

                      priceDOM.classList.contains("price--on-sale") &&
                        priceDOM.classList.remove("price--on-sale");
                      priceDOM.classList.add("price--no-compare");

                      if (priceRegular.querySelector(".price-item--regular")) {
                        priceRegular.querySelector(
                          ".price-item--regular"
                        ).style.textDecoration = "none";
                      }
                    }
                    // })
                  }

                  function formatCurrency(price) {
                    if (price > 0) {
                      price = price.toString();
                      let firstPrice = price.substr(0, price.length - 2);
                      let stringResult = new Intl.NumberFormat().format(
                        parseInt(firstPrice)
                      );
                      stringResult = stringResult.replace(".", ",");
                      return window.currencyStrings.symbol + stringResult;
                    }
                  }
                }
              }
            }
          }
        }

        if (e.target.classList.contains("gift-wrap-item__action--select")) {
          const variantId = e.target.getAttribute("data-variant-id");

          const gift_wrap_variant_ids = document.querySelector(
            "#gift_wrap_variant_ids"
          );
          if (gift_wrap_variant_ids) {
            const dataVariantIds = JSON.parse(
              gift_wrap_variant_ids.getAttribute("data-variant-ids")
            );
            const dataExist = gift_wrap_variant_ids.getAttribute("data-exist");
            // console.log(dataVariantIds);
            if (dataExist == "true") {
              // console.log("Have exist gift wrap !!!");
            } else {
              let formData = {
                items: [
                  {
                    id: variantId,
                    quantity: 1,
                  },
                ],
              };

              if (cartAjax.loadingCartAjax) {
                cartAjax.loadingCartAjax.classList.remove("hidden");

                document
                  .querySelector("tp-cart-ajax")
                  .classList.add("overlay-cart");
              }
              fetch("/cart/add.js", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
              })
                .then((response) => {
                  return response.json();
                })
                .then((data) => {
                  if (data.status == 422) {
                    // console.log("here error qty sold out");
                  } else {
                    // window.location.href = "/cart";
                    window.renderCountInCart();
                    cartAjax.renderCartAjax();
                    if (window.location.href.includes("cart")) {
                      window.location.reload();
                    }

                    // Re render gift wrap modal
                    const gift_wrap_item_action_select_all =
                      document.querySelectorAll(
                        ".gift-wrap-item__action--select"
                      );
                    if (gift_wrap_item_action_select_all.length > 0) {
                      gift_wrap_item_action_select_all.forEach((item) => {
                        item.setAttribute("disabled", "disabled");
                        item.classList.add("disabled-class");
                        item.closest('.tp-modal-gift-wrap').classList.remove('is-open-tp-modal')
                        item.closest('.tp-main-wrapper').querySelector('.tp-cart-ajax').classList.add('is-open-tp-cart-ajax')
                        // item.innerHTML = 'Sold Out'
                      });
                    }

                    gift_wrap_variant_ids.setAttribute("data-exist", "true");
                  }

                  cartAjax.hideLoading();
                })
                .catch((error) => {
                  console.error("Error:", error);
                  cartAjax.hideLoading();
                });
            }
          }
        }
      });
      clearInterval(x);
    } catch (e) {
      e; // => ReferenceError
      console.log("missingVar is not defined");
    }
  }, 1000);
}

// giftWrap();
// cartAjax.renderCartAjax();

// End gift wrap

// Click save cart note
const saveCartNote = document.querySelector(".save-cart-note");
if (saveCartNote) {
  saveCartNote.addEventListener("click", function (e) {
    e.preventDefault();
    const cartNote = document.querySelector(".tca__note");
    if (cartNote) {
      cartNote.classList.add("ajc-hidden");
    }
  });
}




document.addEventListener('click', function (e) {
    if (e.target.classList.contains('announcement-bar__register')) {

        const body = e.target.closest('body')
        body.querySelector('.announcement-bar__popup').classList.toggle('show-register')
    }

    if (e.target.classList.contains('icon-close') || e.target.classList.contains('ab-popup--close') || !e.target.closest('.announcement-bar__register') || !e.target.closest('.header-email-signup-inner').querySelector('a')) {
        if (e.target.closest('body').querySelector('.show-register')){
            e.target.closest('body').querySelector('.show-register').classList.remove('show-register');
        }
    }

})

if (document.querySelector('.announcement-bar__account')) {
    document.addEventListener("click", function (event) {
        if (event.target.classList.contains('announcement-bar__account') && !event.target.classList.contains('show-register-account')) {
            event.target.classList.add('show-register-account')
        } else {
            event.target.classList.remove('show-register-account')
        }

        if (!event.target.closest('.ab-account__menu') && !event.target.classList.contains('announcement-bar__account')) {
            const abAccountMenu = document.querySelector('.announcement-bar__account')
            if (abAccountMenu) {
                abAccountMenu.classList.remove('show-register-account')
            }
        }
    })
}


function bannerLookbook() {

  // Lookbook item click
  document.addEventListener('click', function (e) {
    if (e.target.classList.contains('banner-lookbook__pin')) {
      e.target.querySelector('.banner-lookbook__pin-holder').classList.add('active');
      e.target.classList.remove('banner-lookbook__animate');

    }
    // Lookbook close

    if (e.target.classList.contains('banner-lookbook__close') || e.target.classList.contains('banner-lookbook__pins')) {
      const bannerLookbook = e.target.closest('.banner-lookbook')
      bannerLookbook.querySelector('.active').classList.remove('active');
    }
  })

  // hover type many images
  document.addEventListener('mouseover', function (e) {
    if (e.target.classList.contains('banner-lookbook__item') || e.target.classList.contains('banner-lookbook__pins')) {
      const bannerLookbookItem = e.target.closest('.banner-lookbook__item')
      if (bannerLookbookItem) {
        if (!bannerLookbookItem.classList.contains('active-item')) {
          bannerLookbookItem.closest('.banner-lookbook__many-images').querySelector('.active-item').classList.remove('active-item')
          bannerLookbookItem.classList.add('active-item')
        }
      }

    }
  }

  )
}
bannerLookbook()
if (Shopify.designMode) {
  // This will only render in the theme editor
  document.addEventListener('shopify:section:load', bannerLookbook);
  document.addEventListener('shopify:section:unload', bannerLookbook);
}


function banner() {

  // countdown();
  function countDownTime(element) {
    let year = element.getAttribute("data-flash-year"),
      month = element.getAttribute("data-flash-month"),
      day = element.getAttribute("data-flash-day");
    // var countDownDate = new Date("November 25, 2021 00:00:00").getTime();
    let countDownDate = new Date(`${year}-${month}-${day}`).getTime();

    let x = setInterval(function () {
      // Get today's date and time
      let now = new Date().getTime();

      // Find the distance between now and the count down date
      let distance = countDownDate - now;

      // Time calculations for days, hours, minutes and seconds
      let days = Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds = Math.floor((distance % (1000 * 60)) / 1000);

      let content = contentHTMLCountDown(days, hours, minutes, seconds);
      element.innerHTML = content;

      // If the count down is over, write some text
      if (distance < 0) {
        // let content = selfClass.contentHTMLCountDown('00', '00', '00', '00');
        let content = contentHTMLCountDown('00', '00', '00', '00');
        element.innerHTML = content;

        element.remove();

        clearInterval(x);
      }
    }, 1000);
  }

  function contentHTMLCountDown(days, hours, minutes, seconds) {
    if (days < 10) {
      days = "0" + days;
    }
    if (hours < 10) {
      hours = "0" + hours;
    }
    if (minutes < 10) {
      minutes = "0" + minutes;
    }
    if (seconds < 10) {
      seconds = "0" + seconds;
    }
    let content = `
    <div class="bnCountdown">
        <div class="bnCountdown__day bnCountdown__bg">
            <h4 class="bnCountdown__time cd-days">${days}</h4>
            <h4 class="bnCountdown__title day">Days</h4>
        </div>
        <div class="bnCountdown__hour bnCountdown__bg">
            <h4 class="bnCountdown__time cd-hour">${hours}</h4>
            <h4 class="bnCountdown__title">Hr</h4>
        </div>
        <div class="bnCountdown__minute bnCountdown__bg">
            <h4 class="bnCountdown__time cd-minute">${minutes}</h4>
            <h4 class="bnCountdown__title">Min</h4>
        </div>
        <div class="bnCountdown__second bnCountdown__bg">
            <h4 class="bnCountdown__time cd-second">${seconds}</h4>
            <h4 class="bnCountdown__title">Sec</h4>
        </div>
    </div>
    `;
    return content;
  }

  const bannerSlideTime = document.querySelectorAll(".banner-slide__time");
  if (bannerSlideTime.length > 0) {
    bannerSlideTime.forEach((element) => {
      countDownTime(element);
    });
  }


  var swiperPartner = new Swiper(".banner-slide__main", {
    slidesPerView: 1,
    loop: false,
    pagination: {
      el: ".bsSlide-pagination",
      clickable: true,
      renderBullet: function (index, className) {
        return '<span class="' + className + '"></span>';
      },
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });


}


banner();
document.addEventListener("shopify:section:load", banner);
document.addEventListener("shopify:section:unload", banner);
function collection_packery() {
  var galleryThumbs = new Swiper('.tp-cl-packery__tab', {
    slideToClickedSlide: true,
    allowTouchMove: false,
    navigation: {
      nextEl: ".tab-button-next",
      prevEl: ".tab-button-prev",
    },
    breakpoints: {
      320: {
        slidesPerView: 2,
        spaceBetween: 5,
      },
      390: {
        slidesPerView: 3,
        spaceBetween: 10,
      },
      768: {
        slidesPerView: 6,
      },
    },
  });
  var galleryTop = new Swiper('.tp-cl-packery__detail', {
    slidesPerView: 1,
    allowTouchMove: false,
    thumbs: {
      swiper: galleryThumbs,
    },
  });
}
collection_packery();
document.addEventListener("shopify:section:load", collection_packery);
document.addEventListener("shopify:section:unload", collection_packery);
if (document.querySelector('.pdp_view_description_button')){
    document.addEventListener('click', function(e){
        if(e.target.classList.contains('pdp_view_description_button')){
            if (e.target.getAttribute('data-view') === "more"){
                document.querySelector('.desc-content').classList.add('open');
                document.querySelector('.pdp_view_description_button[data-view="less"]').classList.remove('hidden');
                e.target.classList.add('hidden');
            }
            if (e.target.getAttribute('data-view') === "less") {
                document.querySelector('.desc-content').classList.remove('open');
                document.querySelector('.pdp_view_description_button[data-view="more"]').classList.remove('hidden');
                e.target.classList.add('hidden');
            }
        }
    });
}



// More Variants Images

document.addEventListener('click', function(e){
    if (e.target.classList.contains('more_variants')){
        e.preventDefault();
        let allVariants = e.target.closest('.list-variant-color').querySelectorAll('label');
        allVariants.forEach(function(item, index){
            item.classList.add('show');
        });
        e.target.classList.add('hidden');
        e.target.closest('.list-variant-color').querySelector('.less_variants').classList.remove('hidden');
    }

    if (e.target.classList.contains('less_variants')){
        e.preventDefault();
        let allLess = e.target.closest('.list-variant-color').querySelectorAll('label');
        allLess.forEach(function(item, index){
            item.classList.remove('show');
        });
        e.target.classList.add('hidden');
        e.target.closest('.list-variant-color').querySelector('.more_variants').classList.remove('hidden');
    }

    // Type images

    if (e.target.classList.contains('more_variants_image')){
        e.preventDefault();
        let iallVariants = e.target.closest('variant-image-product-item').querySelectorAll('.image-variant-item');
        iallVariants.forEach(function(item, index){
            item.classList.add('show');
            if (item.closest('[tooltip]')) {
                item.closest('[tooltip]').classList.remove('hidden');
            }
        });
        e.target.classList.add('hidden');
        e.target.closest('variant-image-product-item').querySelector('.less_variants_image').classList.remove('hidden');

    }

    if (e.target.classList.contains('less_variants_image')){
        e.preventDefault();
        let iallVariants = e.target.closest('variant-image-product-item').querySelectorAll('.image-variant-item');
        iallVariants.forEach(function(item, index){
            item.classList.remove('show');
            if (item.closest('[tooltip]')) {
                item.closest('[tooltip]').classList.add('hidden');
            }
        });
        e.target.classList.add('hidden');
        e.target.closest('variant-image-product-item').querySelector('.more_variants_image').classList.remove('hidden');
    }
});


var compareContainer = document.querySelector('#compare')
var isPageCompare = false
if (compareContainer) {
  isPageCompare = compareContainer.getAttribute('data-page-compare')
  if (isPageCompare === 'true') {
    isPageCompare = true
  } else {
    isPageCompare = false
  }
}

var LOCAL_STORAGE_COMPARE_KEY = 'shopify-compare';
var LOCAL_STORAGE_DELIMITER = ',';
var BUTTON_ACTIVE_CLASS = 'active';
var GRID_LOADED_CLASS = 'loaded';

var selectors = {
  button: '[button-compare]',
  grid: '[grid-compare]',
};

document.addEventListener('DOMContentLoaded', function () {
  initButtons();
  initGrid();
});


var setupGrid = function (grid) {
  var compare = getCompare();
  var requests = compare.map(function (handle) {
    var productTileTemplateUrl = '/products/' + handle + '?view=card_compare';
    if (productTileTemplateUrl != null) {
      return fetch(productTileTemplateUrl).then(function (res) {
        if (res.status === 200) {
          return res.text();
        }

      });
    }

  });

  Promise.all(requests).then(function (responses) {
    var compareProductCards = responses.join('');
    if (!compareProductCards) {
      var iconLoading = grid.closest('.compare').querySelector('.icon-loading-compare')
      iconLoading.classList.add('hidden')
      grid.classList.add('wishlist-empty')
      grid.classList.add('compare-empty')
      compareProductCards = 'No Product Data'
    }
    var iconLoading = grid.closest('.compare').querySelector('.icon-loading-compare')
    iconLoading.classList.add('hidden')
    grid.innerHTML = compareProductCards;
    grid.classList.add(GRID_LOADED_CLASS);
    initButtons();

    var event = new CustomEvent('shopify-compare:init-product-grid', {
      detail: { compare: compare }
    });
    document.dispatchEvent(event);
  });
};

var setupButtons = function (buttons) {
  buttons.forEach(function (button) {
    var productHandle = button.dataset.productHandle || false;
    if (!productHandle) return console.error('[Shopify Compare] Missing `data-product-handle` attribute. Failed to update the compare.');
    if (compareContains(productHandle)) button.classList.add(BUTTON_ACTIVE_CLASS);
  });
};

var initGrid = function () {
  var grid = document.querySelector(selectors.grid) || false;
  if (grid) setupGrid(grid);
};

var initButtons = function () {
  var buttons = document.querySelectorAll(selectors.button) || [];
  if (buttons.length) setupButtons(buttons);
  else return;
  var event = new CustomEvent('shopify-compare:init-buttons', {
    detail: { compare: getCompare() }
  });
  document.dispatchEvent(event);
};

var getCompare = function () {
  var compare = localStorage.getItem(LOCAL_STORAGE_COMPARE_KEY) || false;
  if (compare) return compare.split(LOCAL_STORAGE_DELIMITER);
  return [];
};

var setCompare = function (array) {
  var compare = array.join(LOCAL_STORAGE_DELIMITER);
  if (array.length) localStorage.setItem(LOCAL_STORAGE_COMPARE_KEY, compare);
  else localStorage.removeItem(LOCAL_STORAGE_COMPARE_KEY);
  return compare;
};

var updateCompare = function (handle) {
  var compare = getCompare();
  var indexInCompare = compare.indexOf(handle);
  if (indexInCompare === -1) compare.push(handle);
  else compare.splice(indexInCompare, 1);
  return setCompare(compare);
};

var compareContains = function (handle) {
  var compare = getCompare();
  return compare.indexOf(handle) !== -1;
};

var resetCompare = function () {
  return setCompare([]);
};


document.addEventListener('click', function (e) {
  window.hideNotifications()
  if (e.target.classList.contains('button-compare')) {
    let productHandle = e.target.getAttribute('data-product-handle') || false
    updateCompare(productHandle);
    if (compareContains(productHandle)) {
      e.target.classList.add(BUTTON_ACTIVE_CLASS);
      window.showNotifications(window.messNotifications.added_product_to_compare)
    } else {
      e.target.classList.remove(BUTTON_ACTIVE_CLASS);
      window.showNotifications(window.messNotifications.removed_product_from_compare)
    }
  }

  if (e.target.classList.contains('close-compare-item')) {

    let productHandle = e.target.getAttribute('data-product-handle') || false
    updateCompare(productHandle);
    if (compareContains(productHandle)) {
      e.target.classList.add(BUTTON_ACTIVE_CLASS);
    } else {
      e.target.classList.remove(BUTTON_ACTIVE_CLASS);
    }
    if (isPageCompare) {
      const cardWrapper = e.target.closest(".card-wrapper")
      cardWrapper && cardWrapper.remove()

      // Check wishlist remove empty
      setInterval(function () {
        let docCardWrapper = document.querySelector('.compare .card-wrapper')
        if (!docCardWrapper) {
          window.location.reload()
        }
      }, 500)
    }
  }

})

// const countWishListDOM = document.querySelector(".count-wishlist")
// if (countWishListDOM) {
//     let strWishlistFromLocal = localStorage.getItem('shopify-wishlist')
//     if (strWishlistFromLocal) {
//         let arrWishlistFromLocal = strWishlistFromLocal.split(",");
//         console.log(arrWishlistFromLocal)

//         if (arrWishlistFromLocal.length > 0) {
//             if (arrWishlistFromLocal.length < 10) {
//                 countWishListDOM.innerHTML = '0' + arrWishlistFromLocal.length 
//             } else {
//                 countWishListDOM.innerHTML = arrWishlistFromLocal.length 
//             }
//             countWishListDOM.classList.remove('hidden')
//         }
//     }
// }

// const countItemCart = document.querySelector(".count-item-cart")
// if (countItemCart) {
//     if (window.countItemInCart > 0) {
//         if (window.countItemInCart < 10) {
//             countItemCart.innerHTML = '0' + window.countItemInCart
//         } else {
//             countItemCart.innerHTML = window.countItemInCart
//         }
    
//         countItemCart.classList.remove('hidden')
//     }
// }

window.renderCountWishlist()
window.renderCountInCart()
function countDownTime(element) {
    let year = element.getAttribute("data-flash-year"),
        month = element.getAttribute("data-flash-month"),
        day = element.getAttribute("data-flash-day");
    // var countDownDate = new Date("November 25, 2021 00:00:00").getTime();
    let countDownDate = new Date(`${year}-${month}-${day}T00:00:00`).getTime();

    let x = setInterval(function () { // Get today's date and time
        let now = new Date().getTime();

        // Find the distance between now and the count down date
        let distance = countDownDate - now;

        // Time calculations for days, hours, minutes and seconds
        let days = Math.floor(distance / (1000 * 60 * 60 * 24)),
            hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
            minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
            seconds = Math.floor((distance % (1000 * 60)) / 1000);

        let content = contentHTMLCountDown(days, hours, minutes, seconds);
        element.innerHTML = content;

        // If the count down is over, write some text
        if (distance < 0) {
            element.remove()
            clearInterval(x);
        }
    }, 1000);


}

// function countDownTimeReat(element) {
//     let duration = element.getAttribute("data-flash-duration");


// }

function contentHTMLCountDown(days, hours, minutes, seconds) {

    if (days < 10) { days = "0" + days }
    if (hours < 10) { hours = "0" + hours }
    if (minutes < 10) { minutes = "0" + minutes }
    if (seconds < 10) { seconds = "0" + seconds }

    let content = "";
    content += "<span class='day'><b>" + days + "</b> <small>Days</small></span>";
    content += "<span class='hour'><b>" + hours + "</b> <small>Hr</small></span>";
    content += "<span class='minutes'><b>" + minutes + "</b><small>Min</small></span>";
    content += "<span class='seconds'><b>" + seconds + "</b><small>Sec</small></span>";
    return content;
}

const productHasCountdowns = document.querySelectorAll(".wp-product-count-down")
if (productHasCountdowns.length > 0) {
    productHasCountdowns.forEach(item => {
        countDownTime(item)
    })
}

const SOFT = 'soft';
const PAGINATION = 'pagination';

class FacetFiltersForm extends HTMLElement {
  constructor() {
    super();
    let selfClass = this
    this.onActiveFilterClick = this.onActiveFilterClick.bind(this)

    const facetFiltersForm = document.querySelector("#FacetFiltersForm")
    const dataHasApplyButton = facetFiltersForm.getAttribute('data-price-has-apply')
    if (dataHasApplyButton === 'true') {
      selfClass.querySelector('form').addEventListener('input', function (e) {
        if (!e.target.classList.contains('range-max') && !e.target.classList.contains('range-min')) {
          setTimeout(function () {
            FacetFiltersForm.onSubmitHandler(e);
          }, 500)
        }
      });
    } else {
      this.debouncedOnSubmit = window.debounce((event) => {
        FacetFiltersForm.onSubmitHandler(event);
      }, 500);

      const facetForm = this.querySelector('form');
      facetForm.addEventListener('input', function (e) {
        selfClass.debouncedOnSubmit(e)
      })
    }
  }

  static setListeners() {
    const onHistoryChange = (event) => {
      const searchParams = event.state ? event.state.searchParams : FacetFiltersForm.searchParamsInitial;
      if (searchParams === FacetFiltersForm.searchParamsPrev) return;
      FacetFiltersForm.renderPage(searchParams, null, false);
    }
    window.addEventListener('popstate', onHistoryChange);
  }

  static toggleActiveFacets(disable = true) {
    document.querySelectorAll('.js-facet-remove').forEach((element) => {
      element.classList.toggle('disabled', disable);
    });
  }

  static renderPage(searchParams, event, updateURLHash = true) {
    FacetFiltersForm.searchParamsPrev = searchParams;
    const sections = FacetFiltersForm.getSections();
    const countContainer = document.getElementById('ProductCount');
    const countContainerDesktop = document.getElementById('ProductCountDesktop');
    document.getElementById('ProductGridContainer').querySelector('.collection').classList.add('loading');
    if (countContainer) {
      countContainer.classList.add('loading');
    }
    if (countContainerDesktop) {
      countContainerDesktop.classList.add('loading');
    }

    sections.forEach((section) => {
      const url = `${window.location.pathname}?section_id=${section.section}&${searchParams}`;
      const filterDataUrl = element => element.url === url;

      FacetFiltersForm.filterData.some(filterDataUrl) ?
        FacetFiltersForm.renderSectionFromCache(filterDataUrl, event) :
        FacetFiltersForm.renderSectionFromFetch(url, event);
    });

    if (updateURLHash) FacetFiltersForm.updateURLHash(searchParams);
  }

  static renderSectionFromFetch(url, event) {
    fetch(url)
      .then(response => response.text())
      .then((responseText) => {
        const html = responseText;
        FacetFiltersForm.filterData = [...FacetFiltersForm.filterData, {
          html,
          url
        }];
        FacetFiltersForm.renderFilters(html, event);
        FacetFiltersForm.renderProductGridContainer(html);
        FacetFiltersForm.renderProductCount(html);
        FacetFiltersForm.renderAsideShowContent()
      });
  }

  static renderSectionFromCache(filterDataUrl, event) {
    const html = FacetFiltersForm.filterData.find(filterDataUrl).html;
    FacetFiltersForm.renderFilters(html, event);
    FacetFiltersForm.renderProductGridContainer(html);
    FacetFiltersForm.renderProductCount(html);
    FacetFiltersForm.renderAsideShowContent()
  }

  static renderProductGridContainer(html) {
    document.getElementById('ProductGridContainer').innerHTML = new DOMParser().parseFromString(html, 'text/html').getElementById('ProductGridContainer').innerHTML;
  }

  static renderProductCount(html) {
    const count = new DOMParser().parseFromString(html, 'text/html').getElementById('ProductCount').innerHTML
    const container = document.getElementById('ProductCount');
    const containerDesktop = document.getElementById('ProductCountDesktop');
    container.innerHTML = count;
    container.classList.remove('loading');
    if (containerDesktop) {
      containerDesktop.innerHTML = count;
      containerDesktop.classList.remove('loading');
    }
  }

  static renderFilters(html, event) {
    const parsedHTML = new DOMParser().parseFromString(html, 'text/html');
    const facetsWrapperParsedHTML = parsedHTML.querySelector('.facets-wrapper')

    if (facetsWrapperParsedHTML) {
      facetsWrapperParsedHTML.classList.add('show-facets-drawer')
    }

    const facetDetailsElements =
      parsedHTML.querySelectorAll('#FacetFiltersForm .js-filter, #FacetFiltersFormMobile .js-filter, #FacetFiltersPillsForm .js-filter');

    const matchesIndex = (element) => {
      const jsFilter = event ? event.target.closest('.js-filter') : undefined;
      return jsFilter ? element.dataset.index === jsFilter.dataset.index : false;
    }
    const facetsToRender = Array.from(facetDetailsElements).filter(element => !matchesIndex(element));
    const countsToRender = Array.from(facetDetailsElements).find(matchesIndex);


    facetsToRender.forEach((element) => {
      document.querySelector(`.js-filter[data-index="${element.dataset.index}"]`).innerHTML = element.innerHTML;
    });

    FacetFiltersForm.renderActiveFacets(parsedHTML);
    // FacetFiltersForm.renderAdditionalElements(parsedHTML);

    if (countsToRender) FacetFiltersForm.renderCounts(countsToRender, event.target.closest('.js-filter'));
  }

  static renderAsideShowContent() { // For drawer, horizontal
    const asideCurrent = document.querySelector('aside')
    if (asideCurrent) {
      const dataTypeAside = asideCurrent.getAttribute('data-type')

      if (dataTypeAside === 'horizontal' || dataTypeAside === 'drawer') {
        asideCurrent.classList.add('show-facets-drawer')
      }
    }
  }

  static renderActiveFacets(html) {
    const activeFacetElementSelectors = ['.active-facets-mobile', '.active-facets-desktop'];

    activeFacetElementSelectors.forEach((selector) => {
      const activeFacetsElement = html.querySelector(selector);
      if (!activeFacetsElement) return;
      document.querySelector(selector).innerHTML = activeFacetsElement.innerHTML;
    })

    FacetFiltersForm.toggleActiveFacets(false);
  }

  static renderAdditionalElements(html) {
    const mobileElementSelectors = ['.mobile-facets__open', '.mobile-facets__count', '.sorting'];

    mobileElementSelectors.forEach((selector) => {
      if (!html.querySelector(selector)) return;
      document.querySelector(selector).innerHTML = html.querySelector(selector).innerHTML;
    });

    document.getElementById('FacetFiltersFormMobile').closest('menu-drawer').bindEvents();
  }

  static renderCounts(source, target) {
    const targetElement = target.querySelector('.facets__selected');
    const sourceElement = source.querySelector('.facets__selected');

    const targetElementAccessibility = target.querySelector('.facets__summary');
    const sourceElementAccessibility = source.querySelector('.facets__summary');

    if (sourceElement && targetElement) {
      target.querySelector('.facets__selected').outerHTML = source.querySelector('.facets__selected').outerHTML;
    }

    if (targetElementAccessibility && sourceElementAccessibility) {
      target.querySelector('.facets__summary').outerHTML = source.querySelector('.facets__summary').outerHTML;
    }
  }

  static updateURLHash(searchParams) {
    history.pushState({
      searchParams
    }, '', `${window.location.pathname}${searchParams && '?'.concat(searchParams)}`);
  }

  static getSections() {
    return [{
      section: document.getElementById('product-grid').dataset.id,
    }]
  }

  static filterPriceRange(event) {
    event.preventDefault();
    const formData = new FormData(event.target.closest('form'));
    const searchParams = new URLSearchParams(formData).toString();
    FacetFiltersForm.renderPage(searchParams, event);
  }

  static createSearchParams(form) {
    const formData = new FormData(form);
    return new URLSearchParams(formData).toString();
  }

  static onSubmitForm(searchParams, event) {
    FacetFiltersForm.renderPage(searchParams, event);
  }

  static onSubmitHandler(event) {
    event.preventDefault();
    const sortFilterForms = document.querySelectorAll('facet-filters-form form');
    if (event.srcElement.className === 'mobile-facets__checkbox') {
      const searchParams = FacetFiltersForm.createSearchParams(event.target.closest('form'))
      FacetFiltersForm.onSubmitForm(searchParams, event)
    } else {
      const forms = [];
      const isMobile = event.target.closest('form').id === 'FacetFiltersFormMobile';

      sortFilterForms.forEach((form) => {
        if (!isMobile) {
          if (form.id === 'FacetSortForm' || form.id === 'FacetFiltersForm' || form.id === 'FacetSortDrawerForm') {
            forms.push(FacetFiltersForm.createSearchParams(form));
          }
        } else if (form.id === 'FacetFiltersFormMobile') {
          forms.push(FacetFiltersForm.createSearchParams(form));
        }

      });

      // Handle check price min max equal min max start init
      const inuptPriceMin = document.querySelector(`input.field__input.range-min`)
      const inuptPriceMax = document.querySelector(`input.field__input.range-max`)

      let strFilterPriceInit = ''
      let indexFilterPrice
      forms.forEach(function (item, index) {
        if (item.indexOf('filter.v.price.gte') !== -1) {
          strFilterPriceInit = item
          indexFilterPrice = index
        }
      })

      const arrTmp = strFilterPriceInit.split('&')

      let minResult = null
      let maxResult = null
      arrTmp.forEach(function (item, index) {
        if (item.indexOf('filter.v.price.gte') !== -1) {
          minResult = item.replace('filter.v.price.gte=', '')
        }
        if (item.indexOf('filter.v.price.lte') !== -1) {
          maxResult = item.replace('filter.v.price.lte=', '')
        }
      })

      if (parseInt(inuptPriceMin.getAttribute('min')) == parseInt(minResult) && parseInt(inuptPriceMax.getAttribute('max')) == parseInt(maxResult)) {
        forms.splice(indexFilterPrice, 1)
        if (arrTmp.length > 2) {
          strFilterPriceInit = strFilterPriceInit.replace(`filter.v.price.gte=${minResult}&filter.v.price.lte=${maxResult}&`, '')
          forms.push(strFilterPriceInit)
        }
      }

      FacetFiltersForm.onSubmitForm(forms.join('&'), event)
    }
  }

  onActiveFilterClick(event) {
    event.preventDefault();
    FacetFiltersForm.toggleActiveFacets();
    const url = event.currentTarget.href.indexOf('?') == -1 ? '' : event.currentTarget.href.slice(event.currentTarget.href.indexOf('?') + 1);
    FacetFiltersForm.renderPage(url);
  }

  renderAside() {

  }
}

FacetFiltersForm.filterData = [];
FacetFiltersForm.searchParamsInitial = window.location.search.slice(1);
FacetFiltersForm.searchParamsPrev = window.location.search.slice(1);
customElements.define('facet-filters-form', FacetFiltersForm);
FacetFiltersForm.setListeners();

document.addEventListener('click', function (e) {

  if (e.target.classList.contains('item-variant-color') || e.target.classList.contains('item-name')) {

    const parent = e.target.closest('.list-menu__item')
    if (parent) {
      if (parent.classList.contains('active')) {
        parent.classList.remove('active')
      } else {
        parent.classList.add('active')
      }
    }
  }

  if (e.target.classList.contains('btn-price-filter')) {
    FacetFiltersForm.onSubmitHandler(e);
  }

  if (e.target.classList.contains('btn-select-filter-sort')) {

    let facetFiltersField = e.target.closest('.facet-filters__field')
    // facetFiltersField.classList.toggle('show-select')
    if (facetFiltersField.classList.contains('show-select')) {
      facetFiltersField.classList.remove('show-select')
    } else {
      facetFiltersField.classList.add('show-select')
    }

  }

  if (e.target.classList.contains('item-sort')) {
    let facetFiltersField = e.target.closest('.facet-filters__field')
    let facetFiltersSort = facetFiltersField.querySelector(".facet-filters__sort")
    let type = SOFT
    let inputSortBy = facetFiltersSort.querySelector('input[name="sort_by"]')

    if (!inputSortBy) {
      type = PAGINATION
      inputSortBy = facetFiltersSort.querySelector('input[name="attributes[pagination]"]')
    }
    inputSortBy.value = e.target.getAttribute('value')

    if (type == PAGINATION) {
      let updateData = {
        attributes: {
          collection_products_per_page: parseInt(inputSortBy.value)
        }
      }
      fetch(window.Shopify.routes.root + 'cart/update.js', {
          method: 'POST',
          credentials: 'same-origin',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(updateData)
        })
        .then((res) => res.json())
        .then((data) => {
          window.location.reload();
        })
        .catch(function (error) {
          console.error('Request failed', error)
        });
    }

    if (type == SOFT) {
      FacetFiltersForm.onSubmitHandler(e)
    }

    // reset active span select
    let isSelectedCurrent = facetFiltersSort.querySelector('.is-selected')
    isSelectedCurrent && isSelectedCurrent.classList.remove('is-selected')

    e.target.classList.add('is-selected')

    if (facetFiltersField) {
      let button = facetFiltersField.querySelector('button')
      if (button) {
        let dataValueCurrent = button.getAttribute('data-value')
        let dataValueNew = e.target.getAttribute('value')
        let textDataValueNew = e.target.textContent

        button.setAttribute("data-value", dataValueNew)
        button.querySelector('span').textContent = textDataValueNew

      }
    }
  }
})

class PriceRange extends HTMLElement {
  constructor() {
    super();
    let selfClass = this
    // this.querySelectorAll('input')
    //   .forEach(element => element.addEventListener('change', this.onRangeChange.bind(this)));
    // this.setMinAndMaxValues();

    this.rangeInput = this.querySelectorAll(".range-input input")
    this.infoMinPrice = this.querySelector(".min-price small")
    this.infoMaxPrice = this.querySelector('.max-price small')
    this.range = this.querySelector(".slider .progress")
    this.priceGap = 50

    this.rangeInput.forEach(input => {
      input.addEventListener("input", this.setRangePrice.bind(this));
    });
    this.initRangePirce()

    // Price range - Type bonus (Array)
    this.priceRangeItems = this.querySelectorAll(".price_range--item")
    this.fieldInputMin = this.querySelector('.field__input.range-min')
    this.fieldInputMax = this.querySelector('.field__input.range-max')

    if (this.priceRangeItems.length > 0) {
      // Init active price range 
      selfClass.initActivePriceRange()

      this.priceRangeItems.forEach(function (item) {
        item.addEventListener('click', function (e) {
          selfClass.setPriceValue(item)
          FacetFiltersForm.onSubmitHandler(e)
        })
      })
    }
  }

  initRangePirce() {
    const queryString = window.location.search
    const urlParams = new URLSearchParams(queryString)

    if (urlParams.has('filter.v.price.gte')) {
      const priceGte = urlParams.get('filter.v.price.gte')
      this.rangeInput[0] && this.rangeInput[0].setAttribute('value', priceGte || 0)
      if (this.range) {
        this.range.style.left = ((priceGte / this.rangeInput[0].max) * 100) + "%";
      }

      if (this.infoMinPrice) {
        this.infoMinPrice.textContent = priceGte
      }
    }
    if (urlParams.has('filter.v.price.lte')) {
      const priceLte = urlParams.get('filter.v.price.lte')
      this.rangeInput[1] && this.rangeInput[1].setAttribute('value', priceLte || this.maxPrice)
      if (this.range) {
        this.range.style.right = 100 - (priceLte / this.rangeInput[1].max) * 100 + "%";
      }

      if (this.infoMaxPrice) {
        this.infoMaxPrice.textContent = priceLte
      }
    }
  }

  setRangePrice(e) {
    let minVal = parseInt(this.rangeInput[0].value),
      maxVal = parseInt(this.rangeInput[1].value);

    if ((maxVal - minVal) < 0) {
      if (e.target.className === "range-min") {
        this.rangeInput[0].value = maxVal - this.priceGap
      } else {
        this.rangeInput[1].value = minVal + this.priceGap;
      }
    } else {
      this.range.style.left = ((minVal / this.rangeInput[0].max) * 100) + "%";
      this.range.style.right = 100 - (maxVal / this.rangeInput[1].max) * 100 + "%";

      this.infoMinPrice.textContent = this.rangeInput[0].value
      this.infoMaxPrice.textContent = this.rangeInput[1].value
    }
  }

  // For price range
  initActivePriceRange() {
    let selfClass = this

    const queryString = window.location.search
    const urlParams = new URLSearchParams(queryString)

    if (urlParams.has('filter.v.price.gte')) {
      const priceGte = urlParams.get('filter.v.price.gte')
      selfClass.fieldInputMin.value = parseInt(priceGte)
    }
    if (urlParams.has('filter.v.price.lte')) {
      const priceLte = urlParams.get('filter.v.price.lte')
      selfClass.fieldInputMax.value = parseInt(priceLte)
    }

    selfClass.priceRangeItems.forEach(function (item) {
      const min = item.querySelector('.minp').getAttribute('data-min-price')
      const max = item.querySelector('.maxp').getAttribute('data-max-price')

      if (parseInt(min) == selfClass.fieldInputMin.value && parseInt(max) == selfClass.fieldInputMax.value) {
        item.classList.add('active-price-range')
      }
    })
  }

  setPriceValue(item) {
    let selfClass = this

    const min = item.querySelector('.minp').getAttribute('data-min-price')
    const max = item.querySelector('.maxp').getAttribute('data-max-price')

    selfClass.fieldInputMin.value = parseInt(min)
    selfClass.fieldInputMax.value = parseInt(max)

    // Active 
    const wrapperPriceFilter = item.closest('.wrapper-price-filter')

    const activeCurrent = wrapperPriceFilter.querySelector('.active-price-range')
    if (activeCurrent) {
      activeCurrent.classList.remove('active-price-range')
    }

    item.classList.add('active-price-range')
  }

  // onRangeChange(event) {
  //   this.adjustToValidValues(event.currentTarget);
  //   this.setMinAndMaxValues();
  // }

  // setMinAndMaxValues() {
  //   const inputs = this.querySelectorAll('input');
  //   const minInput = inputs[0];
  //   const maxInput = inputs[1];
  //   if (maxInput.value) minInput.setAttribute('max', maxInput.value);
  //   if (minInput.value) maxInput.setAttribute('min', minInput.value);
  //   if (minInput.value === '') maxInput.setAttribute('min', 0);
  //   if (maxInput.value === '') minInput.setAttribute('max', maxInput.getAttribute('max'));
  // }

  // adjustToValidValues(input) {
  //   const value = Number(input.value);
  //   const min = Number(input.getAttribute('min'));
  //   const max = Number(input.getAttribute('max'));

  //   if (value < min) input.value = min;
  //   if (value > max) input.value = max;
  // }
}

customElements.define('price-range', PriceRange);

class FacetRemove extends HTMLElement {
  constructor() {
    super();
    const facetLink = this.querySelector('a');
    facetLink.setAttribute('role', 'button');
    facetLink.addEventListener('click', this.closeFilter.bind(this));
    facetLink.addEventListener('keyup', (event) => {
      event.preventDefault();
      if (event.code.toUpperCase() === 'SPACE') this.closeFilter(event);
    });
  }

  closeFilter(event) {
    event.preventDefault();
    const form = this.closest('facet-filters-form') || document.querySelector('facet-filters-form');
    form.onActiveFilterClick(event);
  }
}

customElements.define('facet-remove', FacetRemove);


//----------handle show more------------// 

const loadmore = document.querySelector('#loadmore');
let currentItems = 5;

if (loadmore) {
  const elementList = document.querySelectorAll('.collection__menu .list-menu__item');
  if (elementList.length <= 5) {
    loadmore.style.display = 'none';
  }
  loadmore.addEventListener('click', (e) => {
    for (let i = currentItems; i < currentItems + 5; i++) {
      if (elementList[i]) {
        elementList[i].style.display = 'block';
      }
    }
    currentItems += 5;
    // Load more button will be hidden after list fully loaded
    if (currentItems >= elementList.length) {
      loadmore.style.display = 'none';
    }
  })
}


function fcl() {
  // click tab
  document.addEventListener('click', function (e) {

    if (e.target.classList.contains('collection_tablinks')) {
      e.target.closest('.tp-fcl__main').classList.add('overlay-body');
      var buttonActiveCurrent = document.querySelector('.collection_tablinks.active')
      if (buttonActiveCurrent) {
        buttonActiveCurrent.classList.remove('active')
      }

      var dataTabIndex = e.target.getAttribute('data-tab-index')
      var parentItemResult = document.querySelector(`.parent-item-${dataTabIndex}`)

      var parentItemActiveCurrent = document.querySelector('.parent-item.active')

      // Effect
      if (!e.target.classList.contains('active')) {

        e.target.classList.add('active')
        e.target.closest('.tp-fcl__main').classList.remove('overlay-body');
      }

      if (parentItemActiveCurrent) {
        parentItemActiveCurrent.classList.remove('active')
        // parentItemActiveCurrent.style.color = '#a3a3a3'
      }

      if (parentItemResult) {
        parentItemResult.classList.add('active')
      }
    }
  })

  // mobile js
  if (document.querySelector('#tpbox-select')) {
    document.querySelector('#tpbox-select').addEventListener('change', function () {
      let val = this.value;
      let parents = document.querySelectorAll('.parent-item');
      parents.forEach(function (item) {
        // console.log(item)
        if (item.classList.contains('active')) {
          item.classList.remove('active');
        }
        var current_item = document.querySelector(`.parent-item-${val}`);
        current_item.classList.add('active');
      })
    })
  }


  //---load more-----// 
  const jsLoadMore = document.querySelectorAll('.js-load-more')
  const wrapperItem = document.querySelector('.tp-featured-collection .tp-fcl__content')
  const parser = new DOMParser();

  if (jsLoadMore.length > 0) {
    jsLoadMore.forEach(function (item) {
      item.addEventListener("click", function (e) {
        var totalPages = parseInt(document.querySelector('#all-pages').value),
          currentPage = document.querySelector('#this-page');
        const loadMoreTextEle = item.querySelector('.load-more-text')
        const loadingEle = item.querySelector('.loading')

        loadMoreTextEle.classList.add('hide-text')
        loadingEle.classList.remove('hide')

        var nextUrl = document.querySelector('#next-link'),
          currentPageNew = parseInt(currentPage.value) + 1;

        fetch(nextUrl.value)
          .then(response => response.text())
          .then(function (data) {
            data = parser.parseFromString(data, "text/html");
            const wrapperItemRes = data.querySelector('.tp-featured-collection .tp-fcl__content')
            if (wrapperItemRes) {
              const listItemNew = wrapperItemRes.querySelectorAll('.tp-fcl__item')
              if (listItemNew.length > 0) {
                listItemNew.forEach(function (itemProduct) {
                  wrapperItem.appendChild(itemProduct)
                })
              }
            }
            let nextUrlString = nextUrl.value
            let numberPageCurrnent = parseInt(nextUrlString.substr(nextUrlString.length - 1))
            let numberPageNext = numberPageCurrnent + 1
            let nextUrlNew = nextUrlString.replace(`?page=${numberPageCurrnent}`, `?page=${numberPageNext}`)

            nextUrl.value = nextUrlNew
            currentPage.value = currentPageNew

            if (currentPageNew < totalPages) {
              item.removeAttribute("disabled")
              item.classList.remove('loading-effect')

              loadMoreTextEle.classList.remove('hide-text')
              loadingEle.classList.add('hide')
            }

            if (currentPageNew >= totalPages) {
              item.parentElement.remove()
            }
          })
      })
    })

  }
}
//------Js type slider-------//

function fclSlider() {
  const main_slide = document.querySelector('.tp-fcl__slider')

  let data_slide = main_slide.getAttribute('data-slide')
  if (data_slide === 'layout-slider-4') {
    if (document.querySelector('.fcSwiper')) {
      var fcSlider = new Swiper(".fcSwiper", {
        slidesPerView: 1,
        slidesPerGroup: 1,
        loop: false,
        grid: {
          rows: 2,
        },
        spaceBetween: 30,
        pagination: {
          clickable: true,
          el: ".swiper-pagination",
        },
        breakpoints: {
          1024: {
            slidesPerView: 3,
            slidesPerGroup: 6,
          },
          510: {
            slidesPerView: 1.5,
            slidesPerGroup: 4,
          },
          767: {
            slidesPerView: 2
          }
        }
      });
    }
  } else {
    const fcSwiper = document.querySelectorAll('.fcSwiper');
    if (fcSwiper.length > 0) {
      fcSwiper.forEach(function (fclItem) {
        var dataType = fclItem.getAttribute("data-type");
        var dataSlidesPerView = fclItem.getAttribute("data-slides-perview");
        var spaceBetween = 30;
        var slidesPerView = 4;
        if (dataType === 'layout-slider-2') {
          spaceBetween = 15
        }
        if (dataSlidesPerView === '3.5') {
          slidesPerView = 3.5;
        }else if (dataSlidesPerView === '3') {
            slidesPerView = 3;
        } else if (dataSlidesPerView === '4.5') {
          slidesPerView = 4.5;
        } else if (dataSlidesPerView === '5') {
          slidesPerView = 5;
        } else if (dataSlidesPerView === '5.5') {
          slidesPerView = 5.5;
        }
        var fcSlider = new Swiper(fclItem, {
          slidesPerView: 2,
          spaceBetween: 15,
          freeMode: true,
          preventClicks: true,
          a11y: false,
          scrollbar: {
            el: '.swiper-scrollbar',
            draggable: true,
          },
          breakpoints: {
            768: {
              slidesPerView: 3,
              spaceBetween: spaceBetween
            },
            1025: {
              slidesPerView: slidesPerView,
              spaceBetween: spaceBetween
            }

          },
          loop: false,
          navigation: {
            nextEl: ".swiper-nav-next",
            prevEl: ".swiper-nav-prev",
          },
          pagination: {
            clickable: true,
            el: ".swiper-pagination",
          },
        });
      })
    }
  }

  if (data_slide === 'layout-slider-1') {
    if (document.querySelector('.fcSwiper')) {
      var fcSlider = new Swiper(".fcSwiper", {
        slidesPerView: 1.5,
        slidesPerGroup: 1,
        loop: false,
        spaceBetween: 30,
        pagination: {
          clickable: true,
          el: ".swiper-pagination",
        },
        breakpoints: {
          768: {
            slidesPerView: 3,
            slidesPerGroup: 1,
          },
          1024: {
            slidesPerView: 4,
          }
        }
      });
    }
  }
}


document.querySelector('.tp-fcl__slider') && fclSlider();
fcl();
document.addEventListener("shopify:section:load", fcl);
document.addEventListener("shopify:section:unload", fcl);




var bestReviewer = new Swiper(".featured-post__list", {
  slidesPerView: 1,
  navigation: {
    nextEl: '.featured-post-next',
    prevEl: '.featured-post-prev',
  },
});


var bestReviewer = new Swiper(".top-recommend__list", {
  slidesPerView: 1,
  navigation: {
    nextEl: '.top-recommend-next',
    prevEl: '.top-recommend-prev',
  },
});

var bestReviewer = new Swiper(".best-review__list", {
  slidesPerView: 1,
  navigation: {
    nextEl: '.best-review-next',
    prevEl: '.best-review-prev',
  },
});
var productThumb = new Swiper(".products-vertical__thumb--ft", {
  spaceBetween: 15,
  slidesPerView: 4,
  direction: "vertical",

  navigation: {
    nextEl: ".products-vertical-next",
    prevEl: ".products-vertical-prev",
  },
});
var productbigImage = new Swiper(".products-vertical__main--ft", {
  navigation: {
    nextEl: ".products-vertical-next",
    prevEl: ".products-vertical-prev",
  },

  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  thumbs: {
    swiper: productThumb,
  },
});

const mainImage = document.querySelector('.products-vertical__main--ft img')
const thumbImage = document.querySelector('.products-vertical__thumb--ft')
// thumbImage.style.maxHeight = '680px'


if (thumbImage) {
  thumbImage.style.height = 0
}
setTimeout(function () {
  if (mainImage && thumbImage) {
    thumbImage.style.height = mainImage.clientHeight + 'px'
  }
}, 1300)


class VariantFeaturedProduct extends HTMLElement {
  constructor() {
    super();
    let selfClass = this;
    this.variants = JSON.parse(
      this.querySelector('[type="application/json"]').textContent
    );
    this.variantThumbs = this.querySelectorAll(".thumb");
    this.variantNameActive = this.querySelector(".variant-name-active__value");
    this.targetProductForm = document.querySelector(
      `#${this.getAttribute("data-target-product-form")}`
    );
    this.priceDOM = document.querySelector(
      `#price-${this.getAttribute("data-section")}`
    );
    this.quantityBox = document.querySelector(
      `#quantity-section-id-${this.getAttribute("data-section")}`
    );
    
    if (this.quantityBox) {
      this.inputQty = this.quantityBox.querySelector("input");
    }

    if (this.variantThumbs.length > 0) {
      this.variantThumbs.forEach((thumb) => {
        thumb.addEventListener("click", function (e) {
          selfClass.activeVariantThumb(e);
        });
      });
    }
    
  }

  activeVariantThumb(e) {
    let selfClass = this;

    // Rerender active style
    const parentThumbListThumb = e.target.closest(
      ".featured-product__right--list-thumb-variants"
    );
    const thumbActiveCurrent =
      parentThumbListThumb.querySelector(".thumb.active");
    const parentThumb = e.target.closest(".thumb");

    thumbActiveCurrent.classList.remove("active");
    parentThumb && parentThumb.classList.add("active");

    // Rerender variant active data
    const variantIdActiveNew = parentThumb.getAttribute("data-variant-id");
    const dataIndex = parentThumb.getAttribute("data-index");

    const variantDataCurrent = selfClass.variants.find((variant) => {
      return variant.id === parseInt(variantIdActiveNew);
    });

    selfClass.variantNameActive.innerHTML = `${variantDataCurrent.title}`;

    productThumb.slideTo(parseInt(dataIndex) - 1, 300);
    productbigImage.slideTo(parseInt(dataIndex) - 1, 300);

    selfClass.changeDataProductForm(variantDataCurrent.id);
    selfClass.renderPrice(
      variantDataCurrent.price,
      variantDataCurrent.compare_at_price
    );
  }

  changeDataProductForm(variantId) {
    let selfClass = this;
    const inputVariantId =
      selfClass.targetProductForm.querySelector('input[name="id"]');
    inputVariantId.value = variantId;

    
    selfClass.inputQty.setAttribute("value", selfClass.inputQty.value);
    const inputQtyForm = selfClass.targetProductForm.querySelector(
      'input[name="quantity"]'
    );
    inputQtyForm.value = selfClass.inputQty.value;
  }

  renderPrice(price, compareAtPrice = null) {
    if (!price) return;

    if (this.priceDOM.length == 0) return;
    let selfClass = this;

    // this.priceDOM.forEach(function (priceDOM) {
    const priceSale = this.priceDOM.querySelector(".price__sale");
    const priceRegular = this.priceDOM.querySelector(".price__regular");

    if (compareAtPrice != null) {
      // This sale

      priceSale.style.display = "block";
      priceRegular.style.display = "none";

      this.priceDOM.classList.contains("price--no-compare") &&
        this.priceDOM.classList.remove("price--no-compare");
      this.priceDOM.classList.add("price--on-sale");

      const priceItemSale = priceSale.querySelector(".price-item--sale");
      const priceCompareAtPrice = priceSale.querySelector(
        ".price-item--regular"
      );
      if (priceItemSale) {
        priceItemSale.textContent = selfClass.formatCurrency(price);
      }
      if (priceCompareAtPrice) {
        priceCompareAtPrice.textContent =
          selfClass.formatCurrency(compareAtPrice);
      }
    } else {
      // This regular
      priceSale.style.display = "none";
      priceRegular.style.display = "block";
      const priceCompareAtPrice = priceRegular.querySelector(
        ".price-item--regular"
      );
      if (priceCompareAtPrice) {
        priceCompareAtPrice.textContent = selfClass.formatCurrency(price);
      }

      this.priceDOM.classList.contains("price--on-sale") &&
        this.priceDOM.classList.remove("price--on-sale");
      this.priceDOM.classList.add("price--no-compare");
    }
    // })
  }

  formatCurrency(price) {
    price = price.toString();
    let firstPrice = price.substr(0, price.length - 2);
    let stringResult = new Intl.NumberFormat().format(parseInt(firstPrice));
    stringResult = stringResult.replace(".", ",");
    return window.currencyStrings.symbol + stringResult;
  }
}

customElements.define("variant-featured-product", VariantFeaturedProduct);

/*
 * Shopify Common JS
 *
 */
if (typeof window.Shopify == "undefined") {
  window.Shopify = {};
}
Shopify.bind = function (fn, scope) {
  return function () {
    return fn.apply(scope, arguments);
  };
};

Shopify.setSelectorByValue = function (selector, value) {
  for (var i = 0, count = selector.options.length; i < count; i++) {
    var option = selector.options[i];
    if (value === option.value || value === option.innerHTML) {
      selector.selectedIndex = i;
      return i;
    }
  }
};

Shopify.addListener = function (target, eventName, callback) {
  target.addEventListener
    ? target.addEventListener(eventName, callback, false)
    : target.attachEvent("on" + eventName, callback);
};

Shopify.postLink = function (path, options) {
  options = options || {};
  var method = options["method"] || "post";
  var params = options["parameters"] || {};

  var form = document.createElement("form");
  form.setAttribute("method", method);
  form.setAttribute("action", path);

  for (var key in params) {
    var hiddenField = document.createElement("input");
    hiddenField.setAttribute("type", "hidden");
    hiddenField.setAttribute("name", key);
    hiddenField.setAttribute("value", params[key]);
    form.appendChild(hiddenField);
  }
  document.body.appendChild(form);
  form.submit();
  document.body.removeChild(form);
};

Shopify.CountryProvinceSelector = function (
  country_domid,
  province_domid,
  options
) {
  this.countryEl = document.getElementById(country_domid);
  this.provinceEl = document.getElementById(province_domid);
  this.provinceContainer = document.getElementById(
    options["hideElement"] || province_domid
  );

  Shopify.addListener(
    this.countryEl,
    "change",
    Shopify.bind(this.countryHandler, this)
  );

  this.initCountry();
  this.initProvince();
};

Shopify.CountryProvinceSelector.prototype = {
  initCountry: function () {
    var value = this.countryEl.getAttribute("data-default");
    Shopify.setSelectorByValue(this.countryEl, value);
    this.countryHandler();
  },

  initProvince: function () {
    var value = this.provinceEl.getAttribute("data-default");
    if (value && this.provinceEl.options.length > 0) {
      Shopify.setSelectorByValue(this.provinceEl, value);
    }
  },

  countryHandler: function (e) {
    var opt = this.countryEl.options[this.countryEl.selectedIndex];
    var raw = opt.getAttribute("data-provinces");
    var provinces = JSON.parse(raw);

    this.clearOptions(this.provinceEl);
    if (provinces && provinces.length == 0) {
      this.provinceContainer.style.display = "none";
    } else {

      for (var i = 0; i < provinces.length; i++) {
        var opt = document.createElement("option");
        opt.value = provinces[i][0];
        opt.innerHTML = provinces[i][1];
        this.provinceEl.appendChild(opt);
      }

      this.provinceContainer.style.display = "";
    }
  },

  clearOptions: function (selector) {
    while (selector.firstChild) {
      selector.removeChild(selector.firstChild);
    }
  },

  setOptions: function (selector, values) {
    for (var i = 0, count = values.length; i < values.length; i++) {
      var opt = document.createElement("option");
      opt.value = values[i];
      opt.innerHTML = values[i];
      selector.appendChild(opt);
    }
  },
};

// function getFocusableElements(container) {
//   return Array.from(
//     container.querySelectorAll(
//       "summary, a[href], button:enabled, [tabindex]:not([tabindex^='-']), [draggable], area, input:not([type=hidden]):enabled, select:enabled, textarea:enabled, object, iframe"
//     )
//   );
// }

document.querySelectorAll('[id^="Details-"] summary').forEach((summary) => {
  summary.setAttribute("role", "button");
  summary.setAttribute(
    "aria-expanded",
    summary.parentNode.hasAttribute("open")
  );

  if (summary.nextElementSibling.getAttribute("id")) {
    summary.setAttribute("aria-controls", summary.nextElementSibling.id);
  }

  summary.addEventListener("click", (event) => {
    event.currentTarget.setAttribute(
      "aria-expanded",
      !event.currentTarget.closest("details").hasAttribute("open")
    );
  });

  if (summary.closest("header-drawer")) return;
  summary.parentElement.addEventListener("keyup", onKeyUpEscape);
});

// const trapFocusHandlers = {};

// function trapFocus(container, elementToFocus = container) {
//   var elements = getFocusableElements(container);
//   var first = elements[0];
//   var last = elements[elements.length - 1];

//   removeTrapFocus();

//   trapFocusHandlers.focusin = (event) => {
//     if (
//       event.target !== container &&
//       event.target !== last &&
//       event.target !== first
//     )
//       return;

//     document.addEventListener("keydown", trapFocusHandlers.keydown);
//   };

//   trapFocusHandlers.focusout = function () {
//     document.removeEventListener("keydown", trapFocusHandlers.keydown);
//   };

//   trapFocusHandlers.keydown = function (event) {
//     if (event.code.toUpperCase() !== "TAB") return; // If not TAB key
//     // On the last focusable element and tab forward, focus the first element.
//     if (event.target === last && !event.shiftKey) {
//       event.preventDefault();
//       first.focus();
//     }

//     //  On the first focusable element and tab backward, focus the last element.
//     if (
//       (event.target === container || event.target === first) &&
//       event.shiftKey
//     ) {
//       event.preventDefault();
//       last.focus();
//     }
//   };

//   document.addEventListener("focusout", trapFocusHandlers.focusout);
//   document.addEventListener("focusin", trapFocusHandlers.focusin);

//   elementToFocus.focus();
// }

// Here run the querySelector to figure out if the browser supports :focus-visible or not and run code based on it.
try {
  document.querySelector(":focus-visible");
} catch (e) {
  focusVisiblePolyfill();
}

function focusVisiblePolyfill() {
  const navKeys = [
    "ARROWUP",
    "ARROWDOWN",
    "ARROWLEFT",
    "ARROWRIGHT",
    "TAB",
    "ENTER",
    "SPACE",
    "ESCAPE",
    "HOME",
    "END",
    "PAGEUP",
    "PAGEDOWN",
  ];
  let currentFocusedElement = null;
  let mouseClick = null;

  window.addEventListener("keydown", (event) => {
    if (navKeys.includes(event.code.toUpperCase())) {
      mouseClick = false;
    }
  });

  window.addEventListener("mousedown", (event) => {
    mouseClick = true;
  });

  window.addEventListener(
    "focus",
    () => {
      if (currentFocusedElement)
        currentFocusedElement.classList.remove("focused");

      if (mouseClick) return;

      currentFocusedElement = document.activeElement;
      currentFocusedElement.classList.add("focused");
    },
    true
  );
}

function pauseAllMedia() {
  document.querySelectorAll(".js-youtube").forEach((video) => {
    video.contentWindow.postMessage(
      '{"event":"command","func":"' + "pauseVideo" + '","args":""}',
      "*"
    );
  });
  document.querySelectorAll(".js-vimeo").forEach((video) => {
    video.contentWindow.postMessage('{"method":"pause"}', "*");
  });
  document.querySelectorAll("video").forEach((video) => video.pause());
  document.querySelectorAll("product-model").forEach((model) => {
    if (model.modelViewerUI) model.modelViewerUI.pause();
  });
}

function removeTrapFocus(elementToFocus = null) {
  document.removeEventListener("focusin", trapFocusHandlers.focusin);
  document.removeEventListener("focusout", trapFocusHandlers.focusout);
  document.removeEventListener("keydown", trapFocusHandlers.keydown);

  if (elementToFocus) elementToFocus.focus();
}

function onKeyUpEscape(event) {
  if (event.code.toUpperCase() !== "ESCAPE") return;

  const openDetailsElement = event.target.closest("details[open]");
  if (!openDetailsElement) return;

  const summaryElement = openDetailsElement.querySelector("summary");
  openDetailsElement.removeAttribute("open");
  summaryElement.setAttribute("aria-expanded", false);
  summaryElement.focus();
}

class QuantityInput extends HTMLElement {
  constructor() {
    super();
    this.input = this.querySelector("input");
    this.changeEvent = new Event("change", { bubbles: true });
    this.sectionId = this.getAttribute("data-section");

    // single page product
    this.featuredProductQty = this.closest(".featured-product__right--qty")
      ? this.closest(".featured-product__right--qty")
      : null;
    if (this.featuredProductQty) {
      this.featuredProductQtySectionID =
        this.featuredProductQty.getAttribute("data-section");
      this.productFormTarget = document.querySelector(
        `#product-form-section-id-${this.featuredProductQtySectionID}`
      );
      if (this.productFormTarget) {
        this.inputQty = this.productFormTarget.querySelector(
          'input[name="quantity"]'
        );
      }
    }
    // value quantity buttons checkout & add to cart product detail
    this.inputQtyCheckout = document.querySelector("#qty_buy-buttons-checkout");
    this.inputStickyQuantity = document.querySelector(".input-sticky-quantity");
    this.inputDetailQuantity = document.querySelector(".input-detail-quantity");

    this.querySelectorAll("button").forEach((button) =>
      button.addEventListener("click", this.onButtonClick.bind(this))
    );
    this.input.addEventListener("change", this.onButtonClick.bind(this));
  }

  onButtonClick(e) {
    e.preventDefault();
    const previousValue = this.input.value;
    if (e.target.name === "minus") {
      this.input.stepDown();
    }
    if (e.target.name === "plus") {
      this.input.stepUp();
    }
    if (
      (previousValue !== this.input.value && !e.target.closest(".quick-view-quantity") &&
        e.target.closest(".cart-drawer")) ||
      e.target.closest(".tp-cart")
    ) {
      this.input.dispatchEvent(this.changeEvent);
    }

    if (this.featuredProductQty && this.inputQty) {
      this.inputQty.value = this.input.value;
    }
    if (this.inputQtyCheckout) {
      this.inputQtyCheckout.value = this.input.value;
    }

    if (this.inputStickyQuantity) {
      this.inputStickyQuantity.value = this.input.value;
    }
    if (this.inputDetailQuantity) {
      this.inputDetailQuantity.value = this.input.value;
    }

    // Remove fix error when quantity input in cart by hungkv 14/02/2023
    // console.log(this.inputProductItemQuantity)
    // this.inputProductItemQuantity = this.closest(
    //     ".content-wrapper"
    // ).querySelector(".input-product-item-quantity");
    // if (this.inputProductItemQuantity) {
    //   this.inputProductItemQuantity.value = this.input.value;
    // }

    // Custom
    const url = window.location.href;
    if (url.includes("products")) {
      const inputQtys = document.querySelectorAll(
        `.quantity-${this.sectionId}`
      );
      if (inputQtys.length > 0) {
        inputQtys.forEach((input) => {
          input.value = this.input.value;
        });
      }
    }
  }
}

customElements.define("quantity-input", QuantityInput);

function debounce(fn, wait) {
  let t;
  return (...args) => {
    clearTimeout(t);
    t = setTimeout(() => fn.apply(this, args), wait);
  };
}

function fetchConfig(type = "json") {
  return {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: `application/${type}`,
    },
  };
}

/*
 * Shopify Common JS
 *
 */
if (typeof window.Shopify == "undefined") {
  window.Shopify = {};
}

Shopify.bind = function (fn, scope) {
  return function () {
    return fn.apply(scope, arguments);
  };
};

Shopify.setSelectorByValue = function (selector, value) {
  for (var i = 0, count = selector.options.length; i < count; i++) {
    var option = selector.options[i];
    if (value == option.value || value == option.innerHTML) {
      selector.selectedIndex = i;
      return i;
    }
  }
};

Shopify.addListener = function (target, eventName, callback) {
  target.addEventListener
    ? target.addEventListener(eventName, callback, false)
    : target.attachEvent("on" + eventName, callback);
};

Shopify.postLink = function (path, options) {
  options = options || {};
  var method = options["method"] || "post";
  var params = options["parameters"] || {};

  var form = document.createElement("form");
  form.setAttribute("method", method);
  form.setAttribute("action", path);

  for (var key in params) {
    var hiddenField = document.createElement("input");
    hiddenField.setAttribute("type", "hidden");
    hiddenField.setAttribute("name", key);
    hiddenField.setAttribute("value", params[key]);
    form.appendChild(hiddenField);
  }
  document.body.appendChild(form);
  form.submit();
  document.body.removeChild(form);
};

Shopify.CountryProvinceSelector = function (
  country_domid,
  province_domid,
  options
) {
  this.countryEl = document.getElementById(country_domid);
  this.provinceEl = document.getElementById(province_domid);
  this.provinceContainer = document.getElementById(
    options["hideElement"] || province_domid
  );

  Shopify.addListener(
    this.countryEl,
    "change",
    Shopify.bind(this.countryHandler, this)
  );

  this.initCountry();
  this.initProvince();
};

Shopify.CountryProvinceSelector.prototype = {
  initCountry: function () {
    var value = this.countryEl.getAttribute("data-default");
    Shopify.setSelectorByValue(this.countryEl, value);
    this.countryHandler();
  },

  initProvince: function () {
    var value = this.provinceEl.getAttribute("data-default");
    if (value && this.provinceEl.options.length > 0) {
      Shopify.setSelectorByValue(this.provinceEl, value);
    }
  },

  countryHandler: function (e) {
    var opt = this.countryEl.options[this.countryEl.selectedIndex];
    var raw = opt.getAttribute("data-provinces");
    var provinces = JSON.parse(raw);

    this.clearOptions(this.provinceEl);
    if (provinces && provinces.length == 0) {
      this.provinceContainer.style.display = "none";
    } else {
      for (var i = 0; i < provinces.length; i++) {
        var opt = document.createElement("option");
        opt.value = provinces[i][0];
        opt.innerHTML = provinces[i][1];
        this.provinceEl.appendChild(opt);
      }

      this.provinceContainer.style.display = "";
    }
  },

  clearOptions: function (selector) {
    while (selector.firstChild) {
      selector.removeChild(selector.firstChild);
    }
  },

  setOptions: function (selector, values) {
    for (var i = 0, count = values.length; i < values.length; i++) {
      var opt = document.createElement("option");
      opt.value = values[i];
      opt.innerHTML = values[i];
      selector.appendChild(opt);
    }
  },
};

class MenuDrawer extends HTMLElement {
  constructor() {
    super();

    this.mainDetailsToggle = this.querySelector("details");

    if (navigator.platform === "iPhone")
      document.documentElement.style.setProperty(
        "--viewport-height",
        `${window.innerHeight}px`
      );

    this.addEventListener("keyup", this.onKeyUp.bind(this));
    this.addEventListener("focusout", this.onFocusOut.bind(this));
    this.bindEvents();
  }

  bindEvents() {
    this.querySelectorAll("summary").forEach((summary) =>
      summary.addEventListener("click", this.onSummaryClick.bind(this))
    );
    this.querySelectorAll("button").forEach((button) =>
      button.addEventListener("click", this.onCloseButtonClick.bind(this))
    );
  }

  onKeyUp(event) {
    if (event.code.toUpperCase() !== "ESCAPE") return;

    const openDetailsElement = event.target.closest("details[open]");
    if (!openDetailsElement) return;

    openDetailsElement === this.mainDetailsToggle
      ? this.closeMenuDrawer(
        event,
        this.mainDetailsToggle.querySelector("summary")
      )
      : this.closeSubmenu(openDetailsElement);
  }

  onSummaryClick(event) {
    const summaryElement = event.currentTarget;
    const detailsElement = summaryElement.parentNode;
    const parentMenuElement = detailsElement.closest(".has-submenu");
    const isOpen = detailsElement.hasAttribute("open");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    function addTrapFocus() {
      trapFocus(
        summaryElement.nextElementSibling,
        detailsElement.querySelector("button")
      );
      summaryElement.nextElementSibling.removeEventListener(
        "transitionend",
        addTrapFocus
      );
    }

    if (detailsElement === this.mainDetailsToggle) {
      if (isOpen) event.preventDefault();
      isOpen
        ? this.closeMenuDrawer(event, summaryElement)
        : this.openMenuDrawer(summaryElement);
    } else {
      setTimeout(() => {
        detailsElement.classList.add("menu-opening");
        summaryElement.setAttribute("aria-expanded", true);
        parentMenuElement && parentMenuElement.classList.add("submenu-open");
        !reducedMotion || reducedMotion.matches
          ? addTrapFocus()
          : summaryElement.nextElementSibling.addEventListener(
            "transitionend",
            addTrapFocus
          );
      }, 100);
    }
  }

  openMenuDrawer(summaryElement) {
    setTimeout(() => {
      this.mainDetailsToggle.classList.add("menu-opening");
    });
    summaryElement.setAttribute("aria-expanded", true);
    trapFocus(this.mainDetailsToggle, summaryElement);
    document.body.classList.add(`overflow-hidden-${this.dataset.breakpoint}`);
  }

  closeMenuDrawer(event, elementToFocus = false) {
    if (event === undefined) return;

    this.mainDetailsToggle.classList.remove("menu-opening");
    this.mainDetailsToggle.querySelectorAll("details").forEach((details) => {
      details.removeAttribute("open");
      details.classList.remove("menu-opening");
    });
    this.mainDetailsToggle
      .querySelectorAll(".submenu-open")
      .forEach((submenu) => {
        submenu.classList.remove("submenu-open");
      });
    document.body.classList.remove(
      `overflow-hidden-${this.dataset.breakpoint}`
    );
    removeTrapFocus(elementToFocus);
    this.closeAnimation(this.mainDetailsToggle);
  }

  onFocusOut(event) {
    setTimeout(() => {
      if (
        this.mainDetailsToggle.hasAttribute("open") &&
        !this.mainDetailsToggle.contains(document.activeElement)
      )
        this.closeMenuDrawer();
    });
  }

  onCloseButtonClick(event) {
    const detailsElement = event.currentTarget.closest("details");
    this.closeSubmenu(detailsElement);
  }

  closeSubmenu(detailsElement) {
    const parentMenuElement = detailsElement.closest(".submenu-open");
    parentMenuElement && parentMenuElement.classList.remove("submenu-open");
    detailsElement.classList.remove("menu-opening");
    detailsElement
      .querySelector("summary")
      .setAttribute("aria-expanded", false);
    removeTrapFocus(detailsElement.querySelector("summary"));
    this.closeAnimation(detailsElement);
  }

  closeAnimation(detailsElement) {
    let animationStart;

    const handleAnimation = (time) => {
      if (animationStart === undefined) {
        animationStart = time;
      }

      const elapsedTime = time - animationStart;

      if (elapsedTime < 400) {
        window.requestAnimationFrame(handleAnimation);
      } else {
        detailsElement.removeAttribute("open");
        if (detailsElement.closest("details[open]")) {
          trapFocus(
            detailsElement.closest("details[open]"),
            detailsElement.querySelector("summary")
          );
        }
      }
    };

    window.requestAnimationFrame(handleAnimation);
  }
}

customElements.define("menu-drawer", MenuDrawer);

class HeaderDrawer extends MenuDrawer {
  constructor() {
    super();
  }

  openMenuDrawer(summaryElement) {
    this.header = this.header || document.querySelector(".section-header");
    this.borderOffset =
      this.borderOffset ||
        this.closest(".header-wrapper").classList.contains(
          "header-wrapper--border-bottom"
        )
        ? 1
        : 0;
    document.documentElement.style.setProperty(
      "--header-bottom-position",
      `${parseInt(
        this.header.getBoundingClientRect().bottom - this.borderOffset
      )}px`
    );
    this.header.classList.add("menu-open");

    setTimeout(() => {
      this.mainDetailsToggle.classList.add("menu-opening");
    });

    summaryElement.setAttribute("aria-expanded", true);
    trapFocus(this.mainDetailsToggle, summaryElement);
    document.body.classList.add(`overflow-hidden-${this.dataset.breakpoint}`);
  }

  closeMenuDrawer(event, elementToFocus) {
    super.closeMenuDrawer(event, elementToFocus);
    this.header.classList.remove("menu-open");
  }
}

customElements.define("header-drawer", HeaderDrawer);

class ModalDialog extends HTMLElement {
  constructor() {
    super();
    this.querySelector('[id^="ModalClose-"]').addEventListener(
      "click",
      this.hide.bind(this, false)
    );
    this.addEventListener("keyup", (event) => {
      if (event.code.toUpperCase() === "ESCAPE") this.hide();
    });
    if (this.classList.contains("media-modal")) {
      this.addEventListener("pointerup", (event) => {
        if (
          event.pointerType === "mouse" &&
          !event.target.closest("deferred-media, product-model")
        )
          this.hide();
      });
    } else {
      this.addEventListener("click", (event) => {
        if (event.target === this) this.hide();
      });
    }
  }

  connectedCallback() {
    if (this.moved) return;
    this.moved = true;
    document.body.appendChild(this);
  }

  show(opener) {
    this.openedBy = opener;
    const popup = this.querySelector(".template-popup");
    document.body.classList.add("overflow-hidden");
    this.setAttribute("open", "");
    if (popup) popup.loadContent();
    trapFocus(this, this.querySelector('[role="dialog"]'));
    window.pauseAllMedia();
  }

  hide() {
    document.body.classList.remove("overflow-hidden");
    document.body.dispatchEvent(new CustomEvent("modalClosed"));
    this.removeAttribute("open");
    removeTrapFocus(this.openedBy);
    window.pauseAllMedia();
  }
}
customElements.define("modal-dialog", ModalDialog);

class ModalOpener extends HTMLElement {
  constructor() {
    super();

    const button = this.querySelector("button");

    if (!button) return;
    button.addEventListener("click", () => {
      const modal = document.querySelector(this.getAttribute("data-modal"));
      if (modal) modal.show(button);
    });
  }
}
customElements.define("modal-opener", ModalOpener);

class DeferredMedia extends HTMLElement {
  constructor() {
    super();
    const poster = this.querySelector('[id^="Deferred-Poster-"]');
    if (!poster) return;
    poster.addEventListener("click", this.loadContent.bind(this));
  }

  loadContent(focus = true) {
    document.querySelectorAll(".js-youtube").forEach((video) => {
      video.contentWindow.postMessage(
        '{"event":"command","func":"' + "pauseVideo" + '","args":""}',
        "*"
      );
    });
    document.querySelectorAll(".js-vimeo").forEach((video) => {
      video.contentWindow.postMessage('{"method":"pause"}', "*");
    });
    document.querySelectorAll("video").forEach((video) => video.pause());
    document.querySelectorAll("product-model").forEach((model) => {
      if (model.modelViewerUI) model.modelViewerUI.pause();
    });
    if (!this.getAttribute("loaded")) {
      const content = document.createElement("div");
      content.appendChild(
        this.querySelector("template").content.firstElementChild.cloneNode(true)
      );

      this.setAttribute("loaded", true);
      const deferredElement = this.appendChild(
        content.querySelector("video, model-viewer, iframe")
      );
      if (focus) deferredElement.focus();
    }
  }
}

customElements.define("deferred-media", DeferredMedia);

// Product form
//=============================================================================//
if (!customElements.get("product-form")) {
  customElements.define(
    "product-form",
    class ProductForm extends HTMLElement {
      constructor() {
        super();

        this.form = this.querySelector("form");
        if (this.form) {
          this.form.querySelector("[name=id]").disabled = false;
          this.form.addEventListener("submit", this.onSubmitHandler.bind(this));
        }
        this.cart = document.querySelector('cart-notification') || document.querySelector('cart-drawer');
        this.cartNotification = document.querySelector("cart-notification");
        this.submitButton = this.querySelector('[type="submit"]');
        this.addToCartText = this.querySelector(".add-to-cart-text");
        this.addToCartLoading = this.querySelector(".add-to-cart-loading");
      }

      onSubmitHandler(evt) {
        evt.preventDefault();
        if (this.submitButton.getAttribute("aria-disabled") === "true") return;
        this.handleErrorMessage();
        if (this.addToCartText && this.addToCartLoading) {
          this.addToCartText.classList.add("hidden");
          this.addToCartLoading.classList.remove("hidden");
        }

        const config = fetchConfig("javascript");
        config.headers["X-Requested-With"] = "XMLHttpRequest";
        delete config.headers["Content-Type"];

        const formData = new FormData(this.form);
        if (formData) {
          formData.append('sections', this.cart.getSectionsToRender().map((section) => section.id));

          formData.append("sections_url", window.location.pathname);
          config.body = formData;
        }

        fetch(`${routes.cart_add_url}`, config)
          .then((response) => response.json())
          .then((response) => {
            if (response.status) {
              this.handleErrorMessage(response.description);
              const soldOutMessage = this.submitButton.querySelector('.sold-out-message');
              if (!soldOutMessage) return;
              this.submitButton.setAttribute('aria-disabled', true);
              this.submitButton.querySelector('span').classList.add('hidden');
              soldOutMessage.classList.remove('hidden');
              this.error = true;
              return;
            }
            window.renderCountInCart();
            if (!this.error) publish(PUB_SUB_EVENTS.cartUpdate, { source: 'product-form' });
            this.error = false;
            this.cart.renderContents(response)
            // Render free shipping
            const freeShipping = document.querySelector(".tca-footer__freeship");
            if (freeShipping) {
              const freeShippingeffect = freeShipping.querySelector('.process-bar__data').getAttribute('data-effect');
              const freeShippingfscode = freeShipping.querySelector('.process-bar__data').getAttribute('data-fscode');
              const freeShippingCompare = freeShipping.querySelector('.process-bar__data').getAttribute('data-compare');
              if (freeShippingeffect === "true" && freeShippingCompare == "true" && window.localStorage.getItem("free-shipping") !== "yes") {
                confetti({
                  particleCount: 100,
                  spread: 70,
                  origin: {
                    y: 0.6
                  }
                });

                if (localStorage.getItem("free-shipping") !== "yes") {
                  window.localStorage.setItem('free-shipping', 'yes')
                }


                if (freeShippingfscode !== null && freeShippingfscode !== "") {
                  var url = window.location.href + "discount/" + freeShippingfscode;
                  fetch(url)
                    .then(response => {
                      console.log('discount code applied')
                    })
                    .then(data => { return data });
                }
              }
            }

          })
          .catch((e) => {
            console.error(e);
          })
          .finally(() => {
            this.querySelector(".add-to-cart-text").classList.remove("hidden");
            this.querySelector(".add-to-cart-loading").classList.add("hidden");
          });
      }

      handleErrorMessage(errorMessage) {
        if (!errorMessage) return;
        window.showNotifications(
          errorMessage
        );
      }
    }
  );
}

class CartRemoveButton extends HTMLElement {
  constructor() {
    super();

    this.addEventListener('click', (event) => {
      event.preventDefault();
      const cartItems = this.closest('cart-items') || this.closest('cart-drawer-items');
      cartItems.updateQuantity(this.dataset.index, 0);

      // Check Cart info
      setInterval(function () {
        const tp_cart = document.querySelector('.tp-cart')
        if (tp_cart) {
          let tpCartTable = tp_cart.querySelector(".tp-cart__table");
          if (!tpCartTable) {
            window.location.reload();
          }
        }
      }, 500);
      window.renderCountInCart()
    });
  }
}
customElements.define("cart-remove-button", CartRemoveButton);

class CartItems extends HTMLElement {
  constructor() {
    super();

    this.lineItemStatusElement = document.getElementById("shopping-cart-line-item-status") || document.getElementById('CartDrawer-LineItemStatus');
    this.currentItemCount = Array.from(
      this.querySelectorAll('[name="updates[]"]')
    ).reduce(
      (total, quantityInput) => total + parseInt(quantityInput.value),
      0
    );

    const debouncedOnChange = debounce((event) => {
      this.onChange(event);
    }, 300);

    this.addEventListener('change', debouncedOnChange.bind(this));
  }

  cartUpdateUnsubscriber = undefined;


  disconnectedCallback() {
    if (this.cartUpdateUnsubscriber) {
      this.cartUpdateUnsubscriber();
    }
  }
  onChange(event) {
    this.updateQuantity(event.target.dataset.index, event.target.value, document.activeElement.getAttribute("name")
    );
  }

  getSectionsToRender() {
    return [
      {
        id: "main-cart-items",
        section: document.getElementById("main-cart-items").dataset.id,
        selector: ".js-contents",
      },
      {
        selector: ".shopify-section",
      },
      {
        id: "cart-live-region-text",
        section: "cart-live-region-text",
        selector: ".shopify-section",
      },
    ];
  }

  updateQuantity(line, quantity, name) {
    // console.log('updateQuantity', line, quantity, name)
    this.enableLoading(line);
    const body = JSON.stringify({
      line,
      quantity,
      sections: this.getSectionsToRender().map((section) => section.section),
      sections_url: window.location.pathname,
    });

    fetch(`${routes.cart_change_url}`, {
      ...fetchConfig(),
      ...{
        body,
      },
    })
      .then((response) => {
        return response.text();

      })
      .then((state) => {
        const parsedState = JSON.parse(state);
        if (parsedState.errors) {
          window.showNotifications(
            parsedState.errors
          )
        }
        this.classList.toggle("is-empty", parsedState.item_count === 0);
        const cartFooter = document.getElementById("main-cart-footer");

        if (cartFooter)
          cartFooter.classList.toggle("is-empty", parsedState.item_count === 0);

        this.getSectionsToRender().forEach((section) => {
          const elementToReplace =
            document
              .getElementById(section.id)
              .querySelector(section.selector) ||
            document.getElementById(section.id);

          elementToReplace.innerHTML = this.getSectionInnerHTML(
            parsedState.sections[section.section],
            section.selector
          );
          const totalOrigin = document.querySelector(".totals__origin");

          if (totalOrigin) {
            const price = parsedState.original_total_price;
            if (price > 0){
              const originPrice = price.toString();
              console.log(typeof parsedState.original_total_price, parsedState.original_total_price);
              let firstPrice = originPrice.substr(0, originPrice.length - 2);
              let stringResult = new Intl.NumberFormat().format(parseInt(firstPrice));
              stringResult = stringResult.replace(".", ",");
  
  
              const currency_code_enabled = window.currencyStrings.currency_code
              if (currency_code_enabled == 'true') {
                totalOrigin.innerHTML = window.currencyStrings.symbol + stringResult + ' ' + window.currencyStrings.iso_code;
              } else {
                totalOrigin.innerHTML = window.currencyStrings.symbol + stringResult;
              }
            }else{
              totalOrigin.innerHTML = 0
            }
          }
        });

        this.updateLiveRegions(line, parsedState.item_count);
        const lineItem = document.getElementById(`CartItem-${line}`);
        if (lineItem && lineItem.querySelector(`[name="${name}"]`))
          lineItem.querySelector(`[name="${name}"]`).focus();
        this.disableLoading();

      })
      .catch(() => {
        this.querySelectorAll(".loading-overlay").forEach((overlay) =>
          overlay.classList.add("hidden")
        );
        if (document.getElementById("cart-errors")) {
          document.getElementById("cart-errors").textContent =
            window.cartStrings.error;
        }
        this.disableLoading();

      });
    // Render free shipping
    const freeShipping = document.querySelector(".tca-footer__freeship");
    if (document.querySelector(".tca-footer__freeship")){
      const freeShippingeffect = freeShipping.querySelector('.process-bar__data').getAttribute('data-effect');
      const freeShippingfscode = freeShipping.querySelector('.process-bar__data').getAttribute('data-fscode');
      const freeShippingCompare = freeShipping.querySelector('.process-bar__data').getAttribute('data-compare');
      if (freeShipping) {
        if (freeShippingeffect === "true" && freeShippingCompare == "true" && window.localStorage.getItem("free-shipping") !== "yes") {
          confetti({
            particleCount: 100,
            spread: 70,
            origin: {
              y: 0.6
            }
          });

          if (localStorage.getItem("free-shipping") !== "yes") {
            window.localStorage.setItem('free-shipping', 'yes')
          }


          if (freeShippingfscode !== null && freeShippingfscode !== "") {
            var url = window.location.href + "discount/" + freeShippingfscode;
            fetch(url)
                .then(response => {
                  console.log('discount code applied')
                })
                .then(data => { return data });
          }
        }
      }
    }
  }

  updateLiveRegions(line, itemCount) {
    if (this.currentItemCount === itemCount) {
      document
        .getElementById(`Line-item-error-${line}`)
        .querySelector(".cart-item__error-text").innerHTML =
        window.cartStrings.quantityError.replace(
          "[quantity]",
          document.getElementById(`Quantity-${line}`).value
        );
    }

    this.currentItemCount = itemCount;
    this.lineItemStatusElement.setAttribute("aria-hidden", true);

    const cartStatus = document.getElementById("cart-live-region-text");
    cartStatus.setAttribute("aria-hidden", false);

    setTimeout(() => {
      cartStatus.setAttribute("aria-hidden", true);
    }, 1000);
  }

  getSectionInnerHTML(html, selector) {
    return new DOMParser()
      .parseFromString(html, "text/html")
      .querySelector(selector).innerHTML;
  }

  enableLoading(line) {
    this.loadingCartDrawer = document.querySelector(".loading-drawer");
    if (this.loadingCartDrawer) {
      this.loadingCartDrawer.closest(".drawer__inner")?.classList.add("overlay-cart");
      this.loadingCartDrawer.classList.remove("hidden");
    }
  }

  disableLoading() {
    this.loadingCartDrawer = document.querySelector(".loading-drawer");
    if (this.loadingCartDrawer) {
      this.loadingCartDrawer.classList.add("hidden");
      this.loadingCartDrawer.closest(".drawer__inner")?.classList.remove("overlay-cart");
    }
    window.renderCountInCart();
  }
}

customElements.define("cart-items", CartItems);
class CartDrawer extends HTMLElement {
  constructor() {
    super();
    this.addEventListener('keyup', (evt) => evt.code === 'Escape' && this.close());
    this.querySelector('#CartDrawer-Overlay').addEventListener('click', this.close.bind(this));
  }



  open(triggeredBy) {
    if (triggeredBy) this.setActiveElement(triggeredBy);
    // here the animation doesn't seem to always get triggered. A timeout seem to help
    setTimeout(() => { this.classList.add('animate', 'active') });

    document.body.classList.add('overlay-body-cart-drawn');
  }

  close() {
    this.classList.remove('active');
    document.body.classList.remove('overlay-body-cart-drawn');
  }

  // setSummaryAccessibility(cartDrawerNote) {
  //   cartDrawerNote.setAttribute('role', 'button');
  //   cartDrawerNote.setAttribute('aria-expanded', 'false');

  //   if(cartDrawerNote.nextElementSibling.getAttribute('id')) {
  //     cartDrawerNote.setAttribute('aria-controls', cartDrawerNote.nextElementSibling.id);
  //   }

  //   cartDrawerNote.addEventListener('click', (event) => {
  //     event.currentTarget.setAttribute('aria-expanded', !event.currentTarget.closest('details').hasAttribute('open'));
  //   });

  //   cartDrawerNote.parentElement.addEventListener('keyup', onKeyUpEscape);
  // }

  renderContents(parsedState) {
    this.querySelector('.drawer__inner').classList.contains('is-empty') && this.querySelector('.drawer__inner').classList.remove('is-empty');
    this.productId = parsedState.id;
    this.getSectionsToRender().forEach((section => {

      const sectionElement = section.selector ? document.querySelector(section.selector) : document.getElementById(section.id);
      sectionElement.innerHTML =
        this.getSectionInnerHTML(parsedState.sections[section.id], section.selector);

    }));

    setTimeout(() => {
      this.querySelector('#CartDrawer-Overlay').addEventListener('click', this.close.bind(this));
      this.open();
    });
  }

  getSectionInnerHTML(html, selector = '.shopify-section') {
    return new DOMParser()
      .parseFromString(html, 'text/html')
      .querySelector(selector).innerHTML;
  }

  getSectionsToRender() {
    return [
      {
        id: 'cart-drawer',
        selector: '#CartDrawer'
      },
      // {
      //   id: 'cart-icon-bubble'
      // }
    ];
  }

  getSectionDOM(html, selector = '.shopify-section') {
    return new DOMParser()
      .parseFromString(html, 'text/html')
      .querySelector(selector);
  }

  setActiveElement(element) {
    this.activeElement = element;
  }
}

customElements.define('cart-drawer', CartDrawer);

class CartDrawerItems extends CartItems {
  getSectionsToRender() {
    return [
      {
        id: 'CartDrawer',
        section: 'cart-drawer',
        selector: '.drawer__inner'
      },
      {
        // id: 'cart-icon-bubble',
        // section: 'cart-icon-bubble',
        selector: '.shopify-section'
      }
    ];
  }
}

customElements.define('cart-drawer-items', CartDrawerItems);


// cart-notification js
//=============================================================================//

class CartNotification extends HTMLElement {
  constructor() {
    super();

    this.notification = document.getElementById("cart-notification");
    this.header = document.querySelector("sticky-header");
    this.onBodyClick = this.handleBodyClick.bind(this);

    this.notification.addEventListener(
      "keyup",
      (evt) => evt.code === "Escape" && this.close()
    );
    this.querySelectorAll('button[type="button"]').forEach((closeButton) =>
      closeButton.addEventListener("click", this.close.bind(this))
    );
  }

  open() {
    this.notification.classList.add("animate", "active");

    this.notification.addEventListener(
      "transitionend",
      () => {
        this.notification.focus();
        trapFocus(this.notification);
      },
      {
        once: true,
      }
    );

    document.body.addEventListener("click", this.onBodyClick);
  }

  close() {
    this.notification.classList.remove("active");

    document.body.removeEventListener("click", this.onBodyClick);

    removeTrapFocus(this.activeElement);
  }

  renderContents(parsedState) {
    this.cartItemKey = parsedState.key;
    this.getSectionsToRender().forEach((section) => {
      document.getElementById(section.id).innerHTML = this.getSectionInnerHTML(
        parsedState.sections[section.id],
        section.selector
      );
    });

    if (this.header) this.header.reveal();
    this.open();
  }

  getSectionsToRender() {
    return [
      {
        id: "cart-notification-product",
        selector: `[id="cart-notification-product-${this.cartItemKey}"]`,
      },
      {
        id: "cart-notification-button",
      },
      // {
      //   id: "cart-icon-bubble",
      // },
    ];
  }

  getSectionInnerHTML(html, selector = ".shopify-section") {
    return new DOMParser()
      .parseFromString(html, "text/html")
      .querySelector(selector).innerHTML;
  }

  handleBodyClick(evt) {
    const target = evt.target;
    if (target !== this.notification && !target.closest("cart-notification")) {
      const disclosure = target.closest("details-disclosure, header-menu");
      this.activeElement = disclosure
        ? disclosure.querySelector("summary")
        : null;
      this.close();
    }
  }

  setActiveElement(element) {
    this.activeElement = element;
  }
}

customElements.define("cart-notification", CartNotification);
// Product item
//=============================================================================//
class VariantRadiosStorepify extends HTMLElement {
  constructor() {
    super();
    this.addEventListener("change", this.onVariantChange);
    this.fieldsets = Array.from(this.querySelectorAll("fieldset"));
    this.priceDOM = document.querySelector(
      `#price-${this.dataset.section}-${this.dataset.productId}`
    );
    this.currencyActive = window.Shopify.currency.active;

  }

  onVariantChange(e) {
    this.updateOptions(e);
    this.updateMasterId();
    this.renderProductInfo(e);
    this.activeIconVariant(e);

    if (!this.currentVariant) {
      this.toggleAddButton(true, true);
    } else {
      if (this.currentVariant.available) {
        this.updateVariantInput();
      }
      this.toggleAddButton(!this.currentVariant.available, true);
    }
  }

  updateVariantInput() {
    const formAddCart = document.querySelector(
      `.quick-add-${this.dataset.section}${this.dataset.productId}`
    );
    if (!formAddCart) return;

    const inputIncludeVariantId = formAddCart.querySelector("input[name='id']");
    if (!inputIncludeVariantId) return;

    inputIncludeVariantId.value = this.currentVariant.id;
  }

  updateOptions(event) {
    let arrRadioCheckedValue = [];

    if (!event.target.hasAttribute("checked")) {
      let thisFieldset = event.target.closest("fieldset");
      let checkedBefore = thisFieldset.querySelector("input[checked]");

      checkedBefore && checkedBefore.removeAttribute("checked");
      event.target.setAttribute("checked", true);
    }

    this.fieldsets.forEach(function (fieldset) {
      fieldset.querySelectorAll("input").forEach(function (radio) {
        if (radio.hasAttribute("checked")) {
          arrRadioCheckedValue.push(radio.value);
        }
      });
    });

    // this.inputActive = arrRadioChecked
    this.options = arrRadioCheckedValue;
  }

  updateMasterId() {
    this.currentVariant = this.getVariantData().find((variant) => {
      return !variant.options
        .map((option, index) => {
          return this.options[index] === option;
        })
        .includes(false);
    });
  }
  renderProductInfo() {
    // re render image main
    const media = this.closest(".card-wrapper").querySelector(
      ".card__media .media"
    );
    if (this.currentVariant) {
      if (media) {
        const imgMain = media.querySelector("img");
        if (imgMain && this.currentVariant.featured_image) {
          let srcSetImgVariant = this.currentVariant.featured_image.src + ' 165w, '
            + this.currentVariant.featured_image.src + ' 330w' + ', '
            + this.currentVariant.featured_image.src + ' 535w' + ', '
            + this.currentVariant.featured_image.src + ' 750w' + ', '
            + this.currentVariant.featured_image.src + ' 1000w' + ', '
            + this.currentVariant.featured_image.src + ' 1500w' + ', '
            + this.currentVariant.featured_image.src + ' 3000w ';
          imgMain.setAttribute("src", srcSetImgVariant);
          imgMain.setAttribute("srcset", srcSetImgVariant);
        }
      }

      // re render price
      const priceCurrentVariant = this.currentVariant.price;
      const compareAtPriceCurrentVariant = this.currentVariant.compare_at_price;

      this.renderPrice(priceCurrentVariant, compareAtPriceCurrentVariant);
    }
  }

  activeIconVariant(e) {
    const target = e.target;

    // Reset active icon variant
    const listVariant = target.closest("fieldset");
    if (listVariant) {
      listVariant.querySelector(".active") &&
        listVariant.querySelector(".active").classList.remove("active");
      listVariant.querySelector(`label[for='${target.id}']`) &&
        listVariant
          .querySelector(`label[for='${target.id}']`)
          .classList.add("active");
    }
  }

  renderPrice(price, compareAtPrice = null) {
    if (!price) return;

    if (this.priceDOM.length == 0) return;
    let selfClass = this;

    // this.priceDOM.forEach(function (priceDOM) {
    const priceSale = this.priceDOM.querySelector(".price__sale");
    const priceRegular = this.priceDOM.querySelector(".price__regular");

    if (compareAtPrice != null && compareAtPrice != "") {
      // This sale

      priceSale.style.display = "flex";
      priceRegular.style.display = "none";

      this.priceDOM.classList.contains("price--no-compare") &&
        this.priceDOM.classList.remove("price--no-compare");
      this.priceDOM.classList.add("price--on-sale");

      const priceItemSale = priceSale.querySelector(".price-item--sale");
      const priceCompareAtPrice = priceSale.querySelector(
        ".price-item--regular"
      );

      if (priceItemSale) {
        priceItemSale.textContent = selfClass.formatCurrency(price);
      }
      if (priceCompareAtPrice) {
        priceCompareAtPrice.textContent =
          selfClass.formatCurrency(compareAtPrice);
      }
    } else {
      // This regular
      priceSale.style.display = "none";
      priceRegular.style.display = "block";
      const priceCompareAtPrice = priceRegular.querySelector(
        ".price-item--regular"
      );
      if (priceCompareAtPrice) {
        priceCompareAtPrice.textContent = selfClass.formatCurrency(price);
      }

      this.priceDOM.classList.contains("price--on-sale") &&
        this.priceDOM.classList.remove("price--on-sale");
      this.priceDOM.classList.add("price--no-compare");
    }
    // })
  }

  formatCurrency(price) {
    price = price.toString();
    let firstPrice = price.substr(0, price.length - 2);
    let stringResult = new Intl.NumberFormat().format(parseInt(firstPrice));
    stringResult = stringResult.replace(".", ",");
    return window.currencyStrings.symbol + stringResult;
  }

  toggleAddButton(disable, modifyClass = true) {
    const productForms = document.querySelectorAll(
      `.quick-add-${this.dataset.section}${this.dataset.productId}`
    );
    if (!productForms.length > 0) return;
    productForms.forEach(function (productForm) {
      const quickBuyButton = productForm.querySelector('button[type="submit"]');
      if (quickBuyButton) {
        const textAddToCart = quickBuyButton.querySelector('.add-to-cart-text')
        const textSoldOut = quickBuyButton.querySelector('.sold-out-message')
      }
      if (!quickBuyButton) return;
      // if (disable) {
      //   quickBuyButton.setAttribute("disabled", "disabled");
      //   textAddToCart.classList.add('hidden')
      //   textSoldOut.classList.remove('hidden')
      // } else {
      //   quickBuyButton.removeAttribute("disabled");
      //   textAddToCart.classList.remove('hidden')
      //   textSoldOut.classList.add('hidden')
      // }

    });

    if (!modifyClass) return;
  }

  getVariantData() {
    this.variantData =
      this.variantData ||
      JSON.parse(this.querySelector('[type="application/json"]').textContent);
    return this.variantData;
  }
}
customElements.define("variant-radios-storepify", VariantRadiosStorepify);
//click variant image product item

class VariantImageProductItem extends VariantRadiosStorepify {
  constructor() {
    super();
    let selfClass = this;
    this.imageVariantItem = this.querySelectorAll(".image-variant-item");
    this.priceDOM = document.querySelector(
      `#price-${this.dataset.section}-${this.dataset.productId}`
    );
    this.imageVariantItem.forEach(function (variantImg) {
      variantImg.addEventListener("click", function (e) {
        this.cardWrapper = e.target.closest(".card-wrapper");

        //click change image
        let imageVariantItemActive = e.target.closest("variant-image-product-item").querySelector(".image-variant-item.active");
        if (!e.target.classList.contains("active") && imageVariantItemActive) {
          e.target.classList.add("active");
          imageVariantItemActive.classList.remove("active");
        }

        let srcImgVariant = e.target.getAttribute("data-src");
        let imgProductMain = this.cardWrapper.querySelector(".media img");
        let srcSetImgVariant = srcImgVariant + ' 165w, '
          + srcImgVariant + ' 330w' + ', '
          + srcImgVariant + ' 535w' + ', '
          + srcImgVariant + ' 750w' + ', '
          + srcImgVariant + ' 1000w' + ', '
          + srcImgVariant + ' 1500w' + ', '
          + srcImgVariant + ' 3000w ';
        imgProductMain.setAttribute("src", srcImgVariant);
        imgProductMain.setAttribute("srcset", srcSetImgVariant);

        // click change price
        const priceCurrentVariant = this.getAttribute("data-price");
        const compareAtPriceCurrentVariant = this.getAttribute("data-price-compare");
        selfClass.renderPrice(priceCurrentVariant, compareAtPriceCurrentVariant);

        //update form add to cart
        this.inputFormAddToCart = this.cardWrapper.querySelector(
          ".variant-id-form-add-cart"
        );
        this.variantId = this.getAttribute("data-id-variant");
        this.inputFormAddToCart.value = this.variantId;

        //---click sold out variant---//
        const btnAddToCart = e.target.closest('.card-wrapper').querySelector('.quick-add__submit')
        const textAddToCart = btnAddToCart.querySelector('.add-to-cart-text')
        const textSoldOut = btnAddToCart.querySelector('.sold-out-message')
        if (e.target.classList.contains('variant-outstock')) {
          btnAddToCart.disabled = true
          btnAddToCart.style.cursor = 'not-allowed'
          textAddToCart.classList.add('hidden')
          textSoldOut.classList.remove('hidden')
        } else {
          btnAddToCart.disabled = false
          btnAddToCart.style.cursor = 'pointer'
          textAddToCart.classList.remove('hidden')
          textSoldOut.classList.add('hidden')
        }
      });
    });
  }
}
customElements.define("variant-image-product-item", VariantImageProductItem);
// Product modal
//=============================================================================//
if (!customElements.get("product-modal")) {
  customElements.define(
    "product-modal",
    class ProductModal extends ModalDialog {
      constructor() {
        super();
      }

      hide() {
        super.hide();
      }

      show(opener) {
        super.show(opener);
        this.showActiveMedia();
      }

      showActiveMedia() {
        this.querySelectorAll(
          `[data-media-id]:not([data-media-id="${this.openedBy.getAttribute(
            "data-media-id"
          )}"])`
        ).forEach((element) => {
          element.classList.remove("active");
        });
        const activeMedia = this.querySelector(
          `[data-media-id="${this.openedBy.getAttribute("data-media-id")}"]`
        );
        const activeMediaTemplate = activeMedia.querySelector("template");
        const activeMediaContent = activeMediaTemplate
          ? activeMediaTemplate.content
          : null;
        activeMedia.classList.add("active");
        activeMedia.scrollIntoView();

        const container = this.querySelector('[role="document"]');
        container.scrollLeft = (activeMedia.width - container.clientWidth) / 2;

        if (
          activeMedia.nodeName == "DEFERRED-MEDIA" &&
          activeMediaContent &&
          activeMediaContent.querySelector(".js-youtube")
        )
          activeMedia.loadContent();
      }
    }
  );
}
// Product model
//=============================================================================//
if (!customElements.get("product-model")) {
  customElements.define(
    "product-model",
    class ProductModel extends DeferredMedia {
      constructor() {
        super();
      }

      loadContent() {
        super.loadContent();

        Shopify.loadFeatures([
          {
            name: "model-viewer-ui",
            version: "1.0",
            onLoad: this.setupModelViewerUI.bind(this),
          },
        ]);
      }

      setupModelViewerUI(errors) {
        if (errors) return;

        this.modelViewerUI = new Shopify.ModelViewerUI(
          this.querySelector("model-viewer")
        );
      }
    }
  );
}

window.ProductModel = {
  loadShopifyXR() {
    Shopify.loadFeatures([
      {
        name: "shopify-xr",
        version: "1.0",
        onLoad: this.setupShopifyXR.bind(this),
      },
    ]);
  },

  setupShopifyXR(errors) {
    if (errors) return;

    if (!window.ShopifyXR) {
      document.addEventListener("shopify_xr_initialized", () =>
        this.setupShopifyXR()
      );
      return;
    }

    document.querySelectorAll('[id^="ProductJSON-"]').forEach((modelJSON) => {
      window.ShopifyXR.addModels(JSON.parse(modelJSON.textContent));
      modelJSON.remove();
    });
    window.ShopifyXR.setupXRElements();
  },
};

window.addEventListener("DOMContentLoaded", () => {
  if (window.ProductModel) window.ProductModel.loadShopifyXR();
});

// quick add js
//=============================================================================//

if (!customElements.get("quick-add-modal")) {
  customElements.define(
    "quick-add-modal",
    class QuickAddModal extends ModalDialog {
      constructor() {
        super();
        this.modalContent = this.querySelector('[id^="QuickAddInfo-"]');
      }

      hide(preventFocus = false) {
        const cartNotification = document.querySelector("cart-notification");
        if (cartNotification) cartNotification.setActiveElement(this.openedBy);
        this.modalContent.innerHTML = "";

        if (preventFocus) this.openedBy = null;
        super.hide();
      }

      show(opener) {
        opener.setAttribute("aria-disabled", true);
        opener.classList.add("loading");
        opener
          .querySelector(".loading-overlay__spinner")
          .classList.remove("hidden");

        fetch(opener.getAttribute("data-product-url"))
          .then((response) => response.text())
          .then((responseText) => {
            const responseHTML = new DOMParser().parseFromString(
              responseText,
              "text/html"
            );
            this.productElement = responseHTML.querySelector(
              'section[id^="MainProduct-"]'
            );
            this.preventDuplicatedIDs();
            this.removeDOMElements();
            this.setInnerHTML(this.modalContent, this.productElement.innerHTML);

            if (window.Shopify && Shopify.PaymentButton) {
              Shopify.PaymentButton.init();
            }

            if (window.ProductModel) window.ProductModel.loadShopifyXR();

            this.removeGalleryListSemantic();
            this.preventVariantURLSwitching();
            super.show(opener);
          })
          .finally(() => {
            opener.removeAttribute("aria-disabled");
            opener.classList.remove("loading");
            opener
              .querySelector(".loading-overlay__spinner")
              .classList.add("hidden");
          });
      }

      setInnerHTML(element, html) {
        element.innerHTML = html;

        // Reinjects the script tags to allow execution. By default, scripts are disabled when using element.innerHTML.
        element.querySelectorAll("script").forEach((oldScriptTag) => {
          const newScriptTag = document.createElement("script");
          Array.from(oldScriptTag.attributes).forEach((attribute) => {
            newScriptTag.setAttribute(attribute.name, attribute.value);
          });
          newScriptTag.appendChild(
            document.createTextNode(oldScriptTag.innerHTML)
          );
          oldScriptTag.parentNode.replaceChild(newScriptTag, oldScriptTag);
        });
      }

      preventVariantURLSwitching() {
        this.modalContent
          .querySelector("variant-radios,variant-selects")
          .setAttribute("data-update-url", "false");
      }

      removeDOMElements() {
        const pickupAvailability = this.productElement.querySelector(
          "pickup-availability"
        );
        if (pickupAvailability) pickupAvailability.remove();

        const productModal = this.productElement.querySelector("product-modal");
        if (productModal) productModal.remove();
      }

      preventDuplicatedIDs() {
        const sectionId = this.productElement.dataset.section;
        this.productElement.innerHTML =
          this.productElement.innerHTML.replaceAll(
            sectionId,
            `quickadd-${sectionId}`
          );
        this.productElement
          .querySelectorAll("variant-selects, variant-radios")
          .forEach((variantSelect) => {
            variantSelect.dataset.originalSection = sectionId;
          });
      }

      removeGalleryListSemantic() {
        const galleryList = this.modalContent.querySelector(
          '[id^="Slider-Gallery"]'
        );
        if (!galleryList) return;

        galleryList.setAttribute("role", "presentation");
        galleryList
          .querySelectorAll('[id^="Slide-"]')
          .forEach((li) => li.setAttribute("role", "presentation"));
      }
    }
  );
}
// show more js
//=============================================================================//

class ShowMoreButton extends HTMLElement {
  constructor() {
    super();
    const button = this.querySelector("button");
    button.addEventListener("click", (event) => {
      this.expandShowMore(event);
      const nextElementToFocus = event.target
        .closest(".parent-display")
        .querySelector(".show-more-item");
      if (
        nextElementToFocus &&
        !nextElementToFocus.classList.contains("hidden")
      ) {
        nextElementToFocus.querySelector("input").focus();
      }
    });
  }
  expandShowMore(event) {
    const parentDisplay = event.target
      .closest('[id^="Show-More-"]')
      .closest(".parent-display");
    const parentWrap = parentDisplay.querySelector(".parent-wrap");
    this.querySelectorAll(".label-text").forEach((element) =>
      element.classList.toggle("hidden")
    );
    parentDisplay
      .querySelectorAll(".show-more-item")
      .forEach((item) => item.classList.toggle("hidden"));
  }
}

customElements.define("show-more-button", ShowMoreButton);

// theme editor js
//=============================================================================//

document.addEventListener("shopify:block:select", function (event) {
  const blockSelectedIsSlide =
    event.target.classList.contains("slideshow__slide");
  if (!blockSelectedIsSlide) return;

  const parentSlideshowComponent = event.target.closest("slideshow-component");
  parentSlideshowComponent.pause();

  setTimeout(function () {
    parentSlideshowComponent.slider.scrollTo({
      left: event.target.offsetLeft,
    });
  }, 200);
});

document.addEventListener("shopify:block:deselect", function (event) {
  const blockDeselectedIsSlide =
    event.target.classList.contains("slideshow__slide");
  if (!blockDeselectedIsSlide) return;
  const parentSlideshowComponent = event.target.closest("slideshow-component");
  if (parentSlideshowComponent.autoplayButtonIsSetToPlay)
    parentSlideshowComponent.play();
});

// wishlist js
//=============================================================================//

var wishListContainer = document.querySelector("#wishlist");
var isPageWishList = false;
if (wishListContainer) {
  isPageWishList = wishListContainer.getAttribute("data-page-wishlist");
  if (isPageWishList == "true") {
    isPageWishList = true;
  } else {
    isPageWishList = false;
  }
}

var LOCAL_STORAGE_WISHLIST_KEY = "shopify-wishlist";
var LOCAL_STORAGE_DELIMITER = ",";
var BUTTON_ACTIVE_CLASS = "active";
var GRID_LOADED_CLASS = "loaded";

var selectors = {
  button: "[button-wishlist]",
  grid: "[grid-wishlist]",
};

document.addEventListener("DOMContentLoaded", function () {
  initButtons();
  initGrid();
});

var setupGrid = function (grid) {
  var wishlist = getWishlist();
  var requests = wishlist.map(function (handle) {
    var productTileTemplateUrl = "/products/" + handle + "?view=card";
    return fetch(productTileTemplateUrl).then(function (res) {
      if (res.status == 200) {
        return res.text();
      }
    });
  });
  Promise.all(requests).then(function (responses) {
    var wishlistProductCards = responses.join("");
    if (!wishlistProductCards) {
      var iconLoading = grid
        .closest(".wishlist")
        .querySelector(".icon-loading-wishlist");
      iconLoading.classList.add("hidden");
      grid.classList.add("wishlist-empty");
      wishlistProductCards = "No Product Data";
    }
    var iconLoading = grid
      .closest(".wishlist")
      .querySelector(".icon-loading-wishlist");
    iconLoading.classList.add("hidden");
    grid.innerHTML = wishlistProductCards;
    grid.classList.add(GRID_LOADED_CLASS);
    initButtons();

    var event = new CustomEvent("shopify-wishlist:init-product-grid", {
      detail: {
        wishlist: wishlist,
      },
    });
    document.dispatchEvent(event);
  });
};

var setupButtons = function (buttons) {
  buttons.forEach(function (button) {
    var productHandle = button.dataset.productHandle || false;
    if (!productHandle)
      return console.error(
        "[Shopify Wishlist] Missing `data-product-handle` attribute. Failed to update the wishlist."
      );
    if (wishlistContains(productHandle))
      button.classList.add(BUTTON_ACTIVE_CLASS);
  });
};

var initGrid = function () {
  var grid = document.querySelector(selectors.grid) || false;
  if (grid) setupGrid(grid);
};

var initButtons = function () {
  var buttons = document.querySelectorAll(selectors.button) || [];
  if (buttons.length) setupButtons(buttons);
  else return;
  var event = new CustomEvent("shopify-wishlist:init-buttons", {
    detail: {
      wishlist: getWishlist(),
    },
  });
  document.dispatchEvent(event);
};

var getWishlist = function () {
  var wishlist = localStorage.getItem(LOCAL_STORAGE_WISHLIST_KEY) || false;
  if (wishlist) return wishlist.split(LOCAL_STORAGE_DELIMITER);
  return [];
};

var setWishlist = function (array) {
  var wishlist = array.join(LOCAL_STORAGE_DELIMITER);
  if (array.length) localStorage.setItem(LOCAL_STORAGE_WISHLIST_KEY, wishlist);
  else localStorage.removeItem(LOCAL_STORAGE_WISHLIST_KEY);
  return wishlist;
};

var updateWishlist = function (handle) {
  var wishlist = getWishlist();
  var indexInWishlist = wishlist.indexOf(handle);
  if (indexInWishlist === -1) wishlist.push(handle);
  else wishlist.splice(indexInWishlist, 1);
  return setWishlist(wishlist);
};

var wishlistContains = function (handle) {
  var wishlist = getWishlist();
  return wishlist.indexOf(handle) !== -1;
};

var resetWishlist = function () {
  return setWishlist([]);
};

document.addEventListener("click", function (e) {
  if (e.target.classList.contains("button-wishlist")) {
    let productHandle = e.target.getAttribute("data-product-handle") || false;
    updateWishlist(productHandle);
    if (wishlistContains(productHandle)) {
      e.target.classList.add(BUTTON_ACTIVE_CLASS);
      window.showNotifications(
        window.messNotifications.added_product_to_wish_list
      );
      window.renderCountWishlist();
    } else {
      e.target.classList.remove(BUTTON_ACTIVE_CLASS);
      window.showNotifications(
        window.messNotifications.removed_product_from_wish_list
      );
      window.renderCountWishlist();

      if (isPageWishList) {
        const cardWrapper = e.target.closest(".card-wrapper");
        cardWrapper && cardWrapper.remove();
        // Check wishlist remove empty

        setInterval(function () {
          let docCardWrapper = document.querySelector(
            ".wishlist .card-wrapper"
          );
          if (!docCardWrapper) {
            window.location.reload();
          }
        }, 500);
      }
    }
  }
  if (e.target.classList.contains("icon-heart-normal")) {
    const button = e.target.closest(".button-wishlist");
    let productHandle = button.getAttribute("data-product-handle") || false;
    updateWishlist(productHandle);
    if (wishlistContains(productHandle)) {
      button.classList.add(BUTTON_ACTIVE_CLASS);
    } else {
      button.classList.remove(BUTTON_ACTIVE_CLASS);
      if (isPageWishList) {
        const cardWrapper = e.target.closest(".card-wrapper");
        cardWrapper && cardWrapper.remove();
      }
    }
  }
});

// pickup availability js
//=============================================================================//

if (!customElements.get("pickup-availability")) {
  customElements.define(
    "pickup-availability",
    class PickupAvailability extends HTMLElement {
      constructor() {
        super();

        if (!this.hasAttribute("available")) return;

        this.errorHtml =
          this.querySelector("template").content.firstElementChild.cloneNode(
            true
          );
        this.onClickRefreshList = this.onClickRefreshList.bind(this);
        this.fetchAvailability(this.dataset.variantId);
      }

      fetchAvailability(variantId) {
        const variantSectionUrl = `${this.dataset.baseUrl}variants/${variantId}/?section_id=pickup-availability`;

        fetch(variantSectionUrl)
          .then((response) => response.text())
          .then((text) => {
            const sectionInnerHTML = new DOMParser()
              .parseFromString(text, "text/html")
              .querySelector(".shopify-section");
            this.renderPreview(sectionInnerHTML);
          })
          .catch((e) => {
            const button = this.querySelector("button");
            if (button)
              button.removeEventListener("click", this.onClickRefreshList);
            this.renderError();
          });
      }

      onClickRefreshList(evt) {
        this.fetchAvailability(this.dataset.variantId);
      }

      renderError() {
        this.innerHTML = "";
        this.appendChild(this.errorHtml);

        this.querySelector("button").addEventListener(
          "click",
          this.onClickRefreshList
        );
      }

      renderPreview(sectionInnerHTML) {
        const drawer = document.querySelector("pickup-availability-drawer");
        if (drawer) drawer.remove();
        if (!sectionInnerHTML.querySelector("pickup-availability-preview")) {
          this.innerHTML = "";
          this.removeAttribute("available");
          return;
        }

        this.innerHTML = sectionInnerHTML.querySelector(
          "pickup-availability-preview"
        ).outerHTML;
        this.setAttribute("available", "");

        document.body.appendChild(
          sectionInnerHTML.querySelector("pickup-availability-drawer")
        );

        this.querySelector("button").addEventListener("click", (evt) => {
          document.querySelector("pickup-availability-drawer").show(evt.target);
        });
      }
    }
  );
}

if (!customElements.get("pickup-availability-drawer")) {
  customElements.define(
    "pickup-availability-drawer",
    class PickupAvailabilityDrawer extends HTMLElement {
      constructor() {
        super();

        this.onBodyClick = this.handleBodyClick.bind(this);

        this.querySelector("button").addEventListener("click", () => {
          this.hide();
        });

        this.addEventListener("keyup", () => {
          if (event.code.toUpperCase() === "ESCAPE") this.hide();
        });
      }

      handleBodyClick(evt) {
        const target = evt.target;
        if (
          target !== this &&
          !target.closest("pickup-availability-drawer") &&
          target.id !== "ShowPickupAvailabilityDrawer"
        ) {
          this.hide();
        }
      }

      hide() {
        this.removeAttribute("open");
        document.body.removeEventListener("click", this.onBodyClick);
        document.body.classList.remove("overflow-hidden");
        removeTrapFocus(this.focusElement);
      }

      show(focusElement) {
        this.focusElement = focusElement;
        this.setAttribute("open", "");
        document.body.addEventListener("click", this.onBodyClick);
        document.body.classList.add("overflow-hidden");
        trapFocus(this);
      }
    }
  );
}

// media-gallery js
//=============================================================================//

if (!customElements.get("media-gallery")) {
  customElements.define(
    "media-gallery",
    class MediaGallery extends HTMLElement {
      constructor() {
        super();
        this.elements = {
          liveRegion: this.querySelector('[id^="GalleryStatus"]'),
          viewer: this.querySelector('[id^="GalleryViewer"]'),
          thumbnails: this.querySelector('[id^="GalleryThumbnails"]'),
        };
        this.mql = window.matchMedia("(min-width: 750px)");
        if (!this.elements.thumbnails) return;

        this.elements.viewer.addEventListener(
          "slideChanged",
          debounce(this.onSlideChanged.bind(this), 500)
        );
        this.elements.thumbnails
          .querySelectorAll("[data-target]")
          .forEach((mediaToSwitch) => {
            mediaToSwitch
              .querySelector("button")
              .addEventListener(
                "click",
                this.setActiveMedia.bind(
                  this,
                  mediaToSwitch.dataset.target,
                  false
                )
              );
          });
        if (this.dataset.desktopLayout !== "stacked" && this.mql.matches)
          this.removeListSemantic();
      }

      onSlideChanged(event) {
        const thumbnail = this.elements.thumbnails.querySelector(
          `[data-target="${event.detail.currentElement.dataset.mediaId}"]`
        );
        this.setActiveThumbnail(thumbnail);
      }

      setActiveMedia(mediaId, prepend) {
        const activeMedia = this.elements.viewer.querySelector(
          `[data-media-id="${mediaId}"]`
        );
        this.elements.viewer
          .querySelectorAll("[data-media-id]")
          .forEach((element) => {
            element.classList.remove("is-active");
          });
        activeMedia.classList.add("is-active");

        if (prepend) {
          activeMedia.parentElement.prepend(activeMedia);
          if (this.elements.thumbnails) {
            const activeThumbnail = this.elements.thumbnails.querySelector(
              `[data-target="${mediaId}"]`
            );
            activeThumbnail.parentElement.prepend(activeThumbnail);
          }
          if (this.elements.viewer.slider) this.elements.viewer.resetPages();
        }

        this.preventStickyHeader();
        window.setTimeout(() => {
          if (this.elements.thumbnails) {
            activeMedia.parentElement.scrollTo({
              left: activeMedia.offsetLeft,
            });
          }
          if (
            !this.elements.thumbnails ||
            this.dataset.desktopLayout === "stacked"
          ) {
            activeMedia.scrollIntoView({
              behavior: "smooth",
            });
          }
        });
        this.playActiveMedia(activeMedia);

        if (!this.elements.thumbnails) return;
        const activeThumbnail = this.elements.thumbnails.querySelector(
          `[data-target="${mediaId}"]`
        );
        this.setActiveThumbnail(activeThumbnail);
        this.announceLiveRegion(
          activeMedia,
          activeThumbnail.dataset.mediaPosition
        );
      }

      setActiveThumbnail(thumbnail) {
        if (!this.elements.thumbnails || !thumbnail) return;

        this.elements.thumbnails
          .querySelectorAll("button")
          .forEach((element) => element.removeAttribute("aria-current"));
        thumbnail.querySelector("button").setAttribute("aria-current", true);
        if (this.elements.thumbnails.isSlideVisible(thumbnail, 10)) return;

        this.elements.thumbnails.slider.scrollTo({
          left: thumbnail.offsetLeft,
        });
      }

      announceLiveRegion(activeItem, position) {
        const image = activeItem.querySelector(
          ".product__modal-opener--image img"
        );
        if (!image) return;
        image.onload = () => {
          this.elements.liveRegion.setAttribute("aria-hidden", false);
          this.elements.liveRegion.innerHTML =
            window.accessibilityStrings.imageAvailable.replace(
              "[index]",
              position
            );
          setTimeout(() => {
            this.elements.liveRegion.setAttribute("aria-hidden", true);
          }, 2000);
        };
        image.src = image.src;
      }

      playActiveMedia(activeItem) {
        window.pauseAllMedia();
        const deferredMedia = activeItem.querySelector(".deferred-media");
        if (deferredMedia) deferredMedia.loadContent(false);
      }

      preventStickyHeader() {
        this.stickyHeader =
          this.stickyHeader || document.querySelector("sticky-header");
        if (!this.stickyHeader) return;
        this.stickyHeader.dispatchEvent(new Event("preventHeaderReveal"));
      }

      removeListSemantic() {
        if (!this.elements.viewer.slider) return;
        this.elements.viewer.slider.setAttribute("role", "presentation");
        this.elements.viewer.sliderItems.forEach((slide) =>
          slide.setAttribute("role", "presentation")
        );
      }
    }
  );
}

// customer js
//=============================================================================//
// Note: remove 30/05/2022
// details-disclosure js
//=============================================================================//

class DetailsDisclosure extends HTMLElement {
  constructor() {
    super();
    this.mainDetailsToggle = this.querySelector("details");
    this.content =
      this.mainDetailsToggle.querySelector("summary").nextElementSibling;

    this.mainDetailsToggle.addEventListener(
      "focusout",
      this.onFocusOut.bind(this)
    );
    this.mainDetailsToggle.addEventListener("toggle", this.onToggle.bind(this));
  }

  onFocusOut() {
    setTimeout(() => {
      if (!this.contains(document.activeElement)) this.close();
    });
  }

  onToggle() {
    if (!this.animations) this.animations = this.content.getAnimations();

    if (this.mainDetailsToggle.hasAttribute("open")) {
      this.animations.forEach((animation) => animation.play());
    } else {
      this.animations.forEach((animation) => animation.cancel());
    }
  }

  close() {
    this.mainDetailsToggle.removeAttribute("open");
    this.mainDetailsToggle
      .querySelector("summary")
      .setAttribute("aria-expanded", false);
  }
}

customElements.define("details-disclosure", DetailsDisclosure);

class HeaderMenu extends DetailsDisclosure {
  constructor() {
    super();
    this.header = document.querySelector(".header-wrapper");
  }

  onToggle() {
    if (!this.header) return;
    this.header.preventHide = this.mainDetailsToggle.open;

    if (
      document.documentElement.style.getPropertyValue(
        "--header-bottom-position-desktop"
      ) !== ""
    )
      return;
    document.documentElement.style.setProperty(
      "--header-bottom-position-desktop",
      `${Math.floor(this.header.getBoundingClientRect().bottom)}px`
    );
  }
}

customElements.define("header-menu", HeaderMenu);

// details-modal js
//=============================================================================//

class DetailsModal extends HTMLElement {
  constructor() {
    super();
    this.detailsContainer = this.querySelector("details");
    this.summaryToggle = this.querySelector("summary");

    this.detailsContainer.addEventListener(
      "keyup",
      (event) => event.code.toUpperCase() === "ESCAPE" && this.close()
    );
    this.summaryToggle.addEventListener(
      "click",
      this.onSummaryClick.bind(this)
    );
    if (this.querySelector('button[type="button"]')) {
      this.querySelector('button[type="button"]').addEventListener(
        "click",
        this.close.bind(this)
      );
    }

    this.summaryToggle.setAttribute("role", "button");
  }

  isOpen() {
    return this.detailsContainer.hasAttribute("open");
  }

  onSummaryClick(event) {
    event.preventDefault();
    event.target.closest("details").hasAttribute("open")
      ? this.close()
      : this.open(event);
  }

  onBodyClick(event) {
    if (
      !this.contains(event.target) ||
      event.target.classList.contains("modal-overlay")
    )
      this.close(false);
  }

  open(event) {
    this.onBodyClickEvent =
      this.onBodyClickEvent || this.onBodyClick.bind(this);
    event.target.closest("details").setAttribute("open", true);
    document.body.addEventListener("click", this.onBodyClickEvent);
    document.body.classList.add("overflow-hidden");
    document.querySelector(".tp-main-wrapper").classList.add("overlay-body");

    trapFocus(
      this.detailsContainer.querySelector('[tabindex="-1"]'),
      this.detailsContainer.querySelector('input:not([type="hidden"])')
    );
  }

  close(focusToggle = true) {
    removeTrapFocus(focusToggle ? this.summaryToggle : null);
    this.detailsContainer.removeAttribute("open");
    document.body.removeEventListener("click", this.onBodyClickEvent);
    document.body.classList.remove("overflow-hidden");
    document.querySelector(".tp-main-wrapper").classList.remove("overlay-body");
    document
      .querySelector(".tp-main-wrapper")
      .classList.remove("overlay-body-cart");
  }
}

customElements.define("details-modal", DetailsModal);

// predictive-search js
//=============================================================================//

class PredictiveSearch extends HTMLElement {
  constructor() {
    super();
    this.cachedResults = {};
    this.input = this.querySelector('input[type="search"]');
    this.predictiveSearchResults = this.querySelector(
      "[data-predictive-search]"
    );
    this.isOpen = false;
    this.selectCate = this.querySelector("select");
    if (this.selectCate) {
      let selfClass = this;
      this.selectCate.addEventListener("change", function (e) {
        const inputValue = selfClass.input.value;
        const searchTerm = this.value;
        const queryKey = searchTerm.replace(" ", "-").toLowerCase();
        selfClass.setLiveRegionLoadingState();

        if (selfClass.cachedResults[queryKey]) {
          selfClass.renderSearchResults(selfClass.cachedResults[queryKey]);
          return;
        }

        fetch(
          `${routes.predictive_search_url}?q=product_type:${encodeURIComponent(
            searchTerm
          )}&${encodeURIComponent(
            "resources[type]"
          )}=product&${encodeURIComponent(
            "resources[limit]"
          )}=4&section_id=predictive-search`
        )
          .then((response) => {
            if (!response.ok) {
              var error = new Error(response.status);
              selfClass.close();
              throw error;
            }

            return response.text();
          })
          .then((text) => {
            const resultsMarkup = new DOMParser()
              .parseFromString(text, "text/html")
              .querySelector("#shopify-section-predictive-search").innerHTML;
            selfClass.cachedResults[queryKey] = resultsMarkup;
            selfClass.renderSearchResults(resultsMarkup);
          })
          .catch((error) => {
            selfClass.close();
            throw error;
          });
      });
    }
    this.setupEventListeners();
  }

  setupEventListeners() {
    const form = this.querySelector("form.search");
    form.addEventListener("submit", this.onFormSubmit.bind(this));

    this.input.addEventListener(
      "input",
      debounce((event) => {
        this.onChange(event);
      }, 300).bind(this)
    );
    this.input.addEventListener("focus", this.onFocus.bind(this));
    this.addEventListener("focusout", this.onFocusOut.bind(this));
    this.addEventListener("keyup", this.onKeyup.bind(this));
    this.addEventListener("keydown", this.onKeydown.bind(this));
  }

  getQuery() {
    return this.input.value.trim();
  }

  onChange() {
    const searchTerm = this.getQuery();

    if (!searchTerm.length) {
      this.close(true);
      return;
    }

    this.getSearchResults(searchTerm);
  }

  onFormSubmit(event) {
    if (
      !this.getQuery().length ||
      this.querySelector('[aria-selected="true"] a')
    )
      event.preventDefault();
  }

  onFocus() {
    const searchTerm = this.getQuery();

    if (!searchTerm.length) return;

    if (this.getAttribute("results") === "true") {
      this.open();
    } else {
      this.getSearchResults(searchTerm);
    }
  }

  onFocusOut() {
    setTimeout(() => {
      if (!this.contains(document.activeElement)) this.close();
    });
  }

  onKeyup(event) {
    if (!this.getQuery().length) this.close(true);
    event.preventDefault();

    switch (event.code) {
      case "ArrowUp":
        this.switchOption("up");
        break;
      case "ArrowDown":
        this.switchOption("down");
        break;
      case "Enter":
        this.selectOption();
        break;
    }
  }

  onKeydown(event) {
    // Prevent the cursor from moving in the input when using the up and down arrow keys
    if (event.code === "ArrowUp" || event.code === "ArrowDown") {
      event.preventDefault();
    }
  }

  switchOption(direction) {
    if (!this.getAttribute("open")) return;

    const moveUp = direction === "up";
    const selectedElement = this.querySelector('[aria-selected="true"]');
    const allElements = this.querySelectorAll("li");
    let activeElement = this.querySelector("li");

    if (moveUp && !selectedElement) return;

    this.statusElement.textContent = "";

    if (!moveUp && selectedElement) {
      activeElement = selectedElement.nextElementSibling || allElements[0];
    } else if (moveUp) {
      activeElement =
        selectedElement.previousElementSibling ||
        allElements[allElements.length - 1];
    }

    if (activeElement === selectedElement) return;

    activeElement.setAttribute("aria-selected", true);
    if (selectedElement) selectedElement.setAttribute("aria-selected", false);

    this.setLiveRegionText(activeElement.textContent);
    this.input.setAttribute("aria-activedescendant", activeElement.id);
  }

  selectOption() {
    const selectedProduct = this.querySelector(
      '[aria-selected="true"] a, [aria-selected="true"] button'
    );

    if (selectedProduct) selectedProduct.click();
  }

  getSearchResults(searchTerm) {
    const queryKey = searchTerm.replace(" ", "-").toLowerCase();
    this.setLiveRegionLoadingState();

    if (this.cachedResults[queryKey]) {
      this.renderSearchResults(this.cachedResults[queryKey]);
      return;
    }

    fetch(
      `${routes.predictive_search_url}?q=${encodeURIComponent(
        searchTerm
      )}&${encodeURIComponent("resources[type]")}=product&${encodeURIComponent(
        "resources[limit]"
      )}=4&section_id=predictive-search`
    )
      .then((response) => {
        if (!response.ok) {
          var error = new Error(response.status);
          this.close();
          throw error;
        }

        return response.text();
      })
      .then((text) => {
        const resultsMarkup = new DOMParser()
          .parseFromString(text, "text/html")
          .querySelector("#shopify-section-predictive-search").innerHTML;
        this.cachedResults[queryKey] = resultsMarkup;
        this.renderSearchResults(resultsMarkup);
      })
      .catch((error) => {
        this.close();
        throw error;
      });
  }

  setLiveRegionLoadingState() {
    this.statusElement =
      this.statusElement || this.querySelector(".predictive-search-status");
    this.loadingText =
      this.loadingText || this.getAttribute("data-loading-text");

    this.setLiveRegionText(this.loadingText);
    this.setAttribute("loading", true);
  }

  setLiveRegionText(statusText) {
    this.statusElement.setAttribute("aria-hidden", "false");
    this.statusElement.textContent = statusText;

    setTimeout(() => {
      this.statusElement.setAttribute("aria-hidden", "true");
    }, 1000);
  }

  renderSearchResults(resultsMarkup) {
    this.predictiveSearchResults.innerHTML = resultsMarkup;
    this.setAttribute("results", true);

    this.setLiveRegionResults();
    this.open();
  }

  setLiveRegionResults() {
    this.removeAttribute("loading");
    // this.setLiveRegionText(this.querySelector('[data-predictive-search-live-region-count-value]').textContent);
  }

  getResultsMaxHeight() {
    this.resultsMaxHeight =
      window.innerHeight -
      document.querySelector(".section-header").getBoundingClientRect().bottom;
    return this.resultsMaxHeight;
  }

  open() {
    this.predictiveSearchResults.style.maxHeight =
      this.resultsMaxHeight || `${this.getResultsMaxHeight()}px`;
    this.setAttribute("open", true);
    this.input.setAttribute("aria-expanded", true);
    this.isOpen = true;
  }

  close(clearSearchTerm = false) {
    if (clearSearchTerm) {
      this.input.value = "";
      this.removeAttribute("results");
    }

    const selected = this.querySelector('[aria-selected="true"]');

    if (selected) selected.setAttribute("aria-selected", false);

    this.input.setAttribute("aria-activedescendant", "");
    this.removeAttribute("open");
    this.input.setAttribute("aria-expanded", false);
    this.resultsMaxHeight = false;
    this.predictiveSearchResults.removeAttribute("style");

    this.isOpen = false;
  }
}

customElements.define("predictive-search", PredictiveSearch);
// share js
//=============================================================================//

if (!customElements.get("share-button")) {
  customElements.define(
    "share-button",
    class ShareButton extends DetailsDisclosure {
      constructor() {
        super();

        this.elements = {
          shareButton: this.querySelector("button"),
          shareSummary: this.querySelector("summary"),
          closeButton: this.querySelector(".share-button__close"),
          successMessage: this.querySelector('[id^="ShareMessage"]'),
          urlInput: this.querySelector("input"),
        };
        this.urlToShare = this.elements.urlInput
          ? this.elements.urlInput.value
          : document.location.href;

        if (navigator.share) {
          this.mainDetailsToggle.setAttribute("hidden", "");
          this.elements.shareButton.classList.remove("hidden");
          this.elements.shareButton.addEventListener("click", () => {
            navigator.share({
              url: this.urlToShare,
              title: document.title,
            });
          });
        } else {
          this.mainDetailsToggle.addEventListener(
            "toggle",
            this.toggleDetails.bind(this)
          );
          this.mainDetailsToggle
            .querySelector(".share-button__copy")
            .addEventListener("click", this.copyToClipboard.bind(this));
          this.mainDetailsToggle
            .querySelector(".share-button__close")
            .addEventListener("click", this.close.bind(this));
        }
      }

      toggleDetails() {
        if (!this.mainDetailsToggle.open) {
          this.elements.successMessage.classList.add("hidden");
          this.elements.successMessage.textContent = "";
          this.elements.closeButton.classList.add("hidden");
          this.elements.shareSummary.focus();
        }
      }

      copyToClipboard() {
        navigator.clipboard.writeText(this.elements.urlInput.value).then(() => {
          this.elements.successMessage.classList.remove("hidden");
          this.elements.successMessage.textContent =
            window.accessibilityStrings.shareSuccess;
          this.elements.closeButton.classList.remove("hidden");
          this.elements.closeButton.focus();
        });
      }

      updateUrl(url) {
        this.urlToShare = url;
        this.elements.urlInput.value = url;
      }
    }
  );
}
// password modal js
//=============================================================================//

class PasswordModal extends DetailsModal {
  constructor() {
    super();

    if (this.querySelector('input[aria-invalid="true"]'))
      this.open({
        target: this.querySelector("details"),
      });
  }
}

customElements.define("password-modal", PasswordModal);

//--------header mobile--------//

const headerMobile = document.querySelector(".header-mobile"),
  iconOpenHeaderMobile = document.querySelector(".icon-header-mobile"),
  panelMenuMobile = document.querySelector(".panel-menu-mobile"),
  buttonCloseHeaderMobile = document.querySelector(".close-parent"),
  menuItem = document.querySelectorAll(".header-mobile .menu-item"),
  iconBacks = document.querySelectorAll(".tp-back-menu");
if (iconOpenHeaderMobile) {
  iconOpenHeaderMobile.addEventListener("click", function () {
    panelMenuMobile.classList.add("open-header-mobile");
    panelMenuMobile.closest("body").classList.add("overlay-body");
  });
}

if (buttonCloseHeaderMobile) {
  buttonCloseHeaderMobile.addEventListener("click", function (e) {
    e.stopPropagation();
    panelMenuMobile.classList.remove("open-header-mobile");
    panelMenuMobile.closest("body").classList.remove("overlay-body");
  });
}
if (menuItem.length > 0) {
  menuItem.forEach(function (item) {
    if (item.querySelector("a")) {
      item.querySelector("a").addEventListener("click", function (e) {
        e.stopPropagation();
        let subMenu = e.target
          .closest(".menu-item")
          .querySelector(".sub-menu-mobile");
        subMenu.classList.add("open-sub-menu");
      });
    }
  });
}
if (iconBacks.length > 0) {
  iconBacks.forEach(function (iconBack) {
    iconBack.addEventListener("click", function (itemSub) {
      itemSub.stopPropagation();
      let subMenuLv2 = itemSub.target
        .closest(".menu-item")
        .querySelector(".sub-menu-mobile");
      subMenuLv2.classList.remove("open-sub-menu");
    });
  });
}

if (headerMobile) {
  window.addEventListener("click", function (e) {
    if (
      !e.target.classList.contains("icon-header-mobile") &&
      !e.target.closest(".panel-menu-mobile")
    ) {
      panelMenuMobile.classList.remove("open-header-mobile");
      if (panelMenuMobile.closest("body")) {
        panelMenuMobile.closest("body").classList.remove("overlay-body");
      }
    }
  });
}
/*----- js back to top----*/
var btnBackToTop = document.getElementById("backToTop");
if (document.getElementById("backToTop")) {

  // When the user scrolls down 20px from the top of the document, show the buttonfoote
  window.onscroll = function () {
    scrollFunction();
  };

  function scrollFunction() {
    const isScrolled = document.body.scrollTop > 20 || document.documentElement.scrollTop > 20;
    btnBackToTop.style.opacity = isScrolled ? 1 : 0;
  }

  // When the user clicks on the button, scroll to the top of the document
  btnBackToTop.addEventListener("click", function () {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });

  if (iconBacks.length > 0) {
    iconBacks.forEach(function (iconBack) {
      iconBack.addEventListener("click", function (itemSub) {
        let subMenuLv2 = itemSub.target
          .closest(".menu-item")
          .querySelector(".sub-menu-mobile");
        subMenuLv2.classList.remove("open-sub-menu");
      });
    });
  }

  function hasTouch() {
    return (
      "ontouchstart" in document.documentElement ||
      navigator.maxTouchPoints > 0 ||
      navigator.msMaxTouchPoints > 0
    );
  }

}

// click close announcement bar

document.addEventListener("click", function (e) {
  if (e.target.classList.contains("announcement-bar__close")) {
    e.target.closest(".shopify-section").classList.add("close-announ");
  }
});

// set height banner layout 1

const bannerLayout1 = document.querySelectorAll(".tp-image-card__layout-1");
if (bannerLayout1.length > 0) {
  bannerLayout1.forEach(function (itemLayout) {
    const sectionId = itemLayout.getAttribute("data-section");
    const bannerLayout1Private = document.querySelector(
      `.tp-image-card__layout-1-${sectionId}`
    );
    
    // Kiểm tra bannerLayout1Private tồn tại
    if (bannerLayout1Private) {
      const bannerItem1 = bannerLayout1Private.querySelector(".banner-item-1");
      
      // Kiểm tra bannerItem1 tồn tại trước khi truy cập offsetHeight
      if (bannerItem1) {
        var heightBannerItem1 = bannerItem1.offsetHeight;
        var bannerItem = bannerLayout1Private.querySelectorAll(
          ".tp-image-card__item img"
        );
        
        if (bannerItem.length > 0) {
          bannerItem.forEach(function (item) {
            item.style.height = heightBannerItem1 + "px";
          });
        }
      }
    }
  });
}

// Features List
let featuresLink = document.querySelectorAll(".features-list__link");
if (featuresLink.length > 0) {
  featuresLink.forEach(function (link, index) {
    link.addEventListener("click", function (event) {
      let dataIndex = event.target.getAttribute("data-index");
      let featuresList = event.target.closest(".features-list__content");
      if (featuresList) {
        let dataId = featuresList.getAttribute("data-section-id");
        if (dataId) {
          let actLink = featuresList.querySelector(
            ".features-list__link.active"
          );
          if (actLink) {
            actLink.classList.remove("active");
          }
          link.classList.add("active");
          if (event.target.classList.contains("active")) {
            let boxes = featuresList.querySelectorAll(".features-list__image");
            boxes.forEach((box, indexChild) => {
              box.classList.remove("active");
              if (box.getAttribute("data-index") == dataIndex) {
                box.classList.add("active");
              }
            });
          }
        }
      }
    });
  });
}

// Rtl-click
const rtlClickEl = document.querySelector('.rtl-click');

if (rtlClickEl) {
  rtlClickEl.addEventListener('click', function () {
    const nowRtl = rtlClickEl.getAttribute('data-rtl') === 'true';
    const updateRtlData = {
      attributes: {
        rtl_click: !nowRtl
      }
    };

    fetch(window.Shopify.routes.root + 'cart/update.js', {
      method: 'POST',
      credentials: 'same-origin',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updateRtlData)
    })
      .then(res => res.json())
      .then(() => window.location.reload())
      .catch(error => console.error('Request failed', error));
  });
}

// wow
new WOW().init();

// Enabled age 
document.addEventListener('DOMContentLoaded', function () {
  // const urlParams = new URLSearchParams(window.location.search);
  // const verifyAge = urlParams.get("verify-age");
  const tpModalEnableAge = document.querySelector('#tp_modal_enable_age');

  if (tpModalEnableAge) {
    function getCookie(cname) {
      let name = cname + "=";
      let decodedCookie = decodeURIComponent(document.cookie);
      let ca = decodedCookie.split(';');
      for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === '') {
          c = c.substring(1);
        }
        if (c.indexOf(name) === 0) {
          return c.substring(name.length, c.length);
        }
      }
      return "";
    }

    let checkCookieVerifyAge = getCookie('tp_age_verify')
    if (checkCookieVerifyAge !== 'confirm') {
      const tpModalEnableAge = document.querySelector('#tp_modal_enable_age')
      if (tpModalEnableAge) {
        tpModalEnableAge.classList.add('is-open-tp-modal')
        document.body.classList.add("overlay-body-not-click-hide")
      }

      document.addEventListener('click', function (e) {
        if (e.target.classList.contains('btn-under-age')) {
          if (tpModalEnableAge) {
            const ageVerifyTxt = tpModalEnableAge.querySelector('.age-verify-txt')
            const ageVerifyButtons = tpModalEnableAge.querySelector('.age-verify-buttons')
            const ageVerifyTxtError = tpModalEnableAge.querySelector('.age-verify-txt-error')

            ageVerifyTxt && ageVerifyTxt.classList.add('hidden')
            ageVerifyButtons && ageVerifyButtons.classList.add('hidden')
            ageVerifyTxtError && ageVerifyTxtError.classList.remove('hidden')
          }
        }

        if (e.target.classList.contains('btn-older-age')) {
          if (tpModalEnableAge) {
            tpModalEnableAge.classList.remove('is-open-tp-modal')
            document.body.classList.remove("overlay-body-not-click-hide")

            const exdays = 1
            const d = new Date();
            d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
            let expires = "expires=" + d.toUTCString();
            document.cookie = 'tp_age_verify' + "=" + 'confirm' + ";" + expires + ";path=/";
          }
        }
      })
    }
  }
})

// pre-loader
const preLoader = document.querySelector(".pre-loader")
if (preLoader) {
  window.addEventListener("load", function () {
    preLoader.classList.remove("loading-page");
    preLoader.classList.remove("loading-page-done");
  });
}


// tab products details mobile //
if (window.innerWidth < 600) {
  let tpTitleTabs = document.querySelectorAll(".tp-title-tabs");
  if (tpTitleTabs.length > 0) {
    tpTitleTabs.forEach(function (link, index) {
      link.addEventListener("click", function (event) {
        let dataIndex = event.target.getAttribute("data-tab-index");
        let mainProInfoTab = event.target.closest(".main-product-info__tab");
        if (mainProInfoTab) {
          let boxes = mainProInfoTab.querySelectorAll(".tp-product-detail__description");
          boxes.forEach((box, index) => {
            if (index == (dataIndex - 1)) {
              box.classList.add("pro-isshow");
            } else {
              box.classList.remove("pro-isshow");
            }
          });
        }
      });
    });
  }

  var tpdes = document.querySelectorAll(".tp-product-detail__description");
  if (tpdes.length > 0) {
    tpdes.forEach(function (elm, evt) {
      elm.addEventListener("click", function (e1) {
        if (e1.target.classList.contains("pro-isshow")) {
          e1.target.classList.remove("pro-isshow");
        }
      });
    })
  }
}

// Code show demo all function

const tpqueryString = window.location.search;
const tpurlParams = new URLSearchParams(tpqueryString);


// Show demo for RTL
const tpparamsRtl = tpurlParams.get('preview_rtl');

if (tpparamsRtl === "1") {
  document.querySelector('html').setAttribute("rtl", "true");
  const updateRtlData = {
    attributes: {
      rtl_click: "true"
    }
  };

  fetch(window.Shopify.routes.root + 'cart/update.js', {
    method: 'POST',
    credentials: 'same-origin',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updateRtlData)
  })
    .then(res => res.json())
    // .then(() => window.location.reload())
    .catch(error => console.error('Request failed', error));
}


var TpLazyloadImg = (function () {
  return {
    init: function () {
      this.lazyReady();
    },
    lazyReady: function () {
      if (!!window.IntersectionObserver) {
        let observer = new IntersectionObserver(
          (entries, observer) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                entry.target.width = entry.boundingClientRect.width;
                entry.target.height = entry.boundingClientRect.height;
                entry.target.sizes = `${entry.boundingClientRect.width}px`;
                entry.target.classList.add("tp-loaded-image");
                entry.target
                  .closest(".tp-image-js")
                  .classList.remove("tp-loading-image");
                observer.unobserve(entry.target);
              }
            });
          },
          { rootMargin: "10px" }
        );
        document.querySelectorAll(".tp-image-js img").forEach((img) => {
          observer.observe(img);
        });
      }
    },
  };
})();
TpLazyloadImg.init();

// swiperService for mobile ==> sontt
if (window.innerWidth <= 767) {
  const tpService = document.querySelectorAll('.tp-service');
  if (tpService.length > 0) {
    tpService.forEach(function (item) {
      item.classList.add('swiper');
      let swiperWrapper = document.querySelectorAll(".tp-service__main");
      if (swiperWrapper.length > 0) {
        swiperWrapper.forEach(function (itsw) {
          itsw.classList.add('swiper-wrapper')
        })
        const swiperaItem = item.querySelectorAll('.tp-service__item');
        swiperaItem.forEach(function (itemSlide) {
          itemSlide.classList.add('swiper-slide');
        });
        var swiper = new Swiper(".myService", {
          slidesPerView: 1.6,
          loop: true,
          autoplay:
          {
            delay: 1500,
          },
          breakpoints: {
            640: {
              slidesPerView: 2.5,
            },
          },
        });
      }
    })
  }
}




const megaMenuBlockListProduct = document.querySelector('.mega-menu-block__list-product .swiper')
const headerMenu = document.querySelector('.header__menu')
const header_transparent = document.querySelector('.header-transparent')
const header_design_1 = document.querySelector('.header-ds1')
const header_design_2 = document.querySelector('.header-ds2')

if (megaMenuBlockListProduct) {
    var listProductMenuHeader = new Swiper(megaMenuBlockListProduct, {
        slidesPerView: 3,
        spaceBetween: 15,
        navigation: {
            nextEl: '.list-product-head__navigation .icon-next-type1',
            prevEl: '.list-product-head__navigation .icon-prev-type1',
        },
        breakpoints: {
            1290: {
                slidesPerView: 3
            },
            767: {
                slidesPerView: 2
            }
        }
    });
}
// set color buy now in header
if (headerMenu) {
    let menuItem = headerMenu.querySelectorAll('.menu-item')
    if (menuItem.length > 0) {
        menuItem.forEach(function (item) {
            if (item.getAttribute('data-value-title') == 'BUY NOW') {
                item.querySelector('a').setAttribute('class', 'menu-buy-now');
                item.querySelector('a').setAttribute('target', '_blank');
            }
        })
    }
}

if (header_transparent) {
    var lastScrollTop = 0;
    document.addEventListener("scroll", function () {
        const headerWrapper = header_transparent.querySelector('.header-wrapper')
        var st = window.pageYOffset || document.documentElement.scrollTop;
        if (st >= 100) {
            headerWrapper.classList.add("bg-header")
            header_transparent.style.top = 0
        } else {
            headerWrapper.classList.remove("bg-header")
            header_transparent.style.top = 36 + 'px'
        }

        lastScrollTop = st <= 0 ? 0 : st; // For Mobile or negative scrolling
    }, false);
}
//header design 1(category)
if (header_design_1) {
    document.addEventListener('DOMContentLoaded', function () {
        const categories_nav = header_design_1.querySelector('.categories-nav')
        const sub_menu_category = header_design_1.querySelectorAll('.sub-menu-category')
        let width_categories_nav = categories_nav.clientWidth
        sub_menu_category.forEach(function (item) {
            item.style.width = width_categories_nav - 400 + 'px'
        })
    });
}

// header design 2
if (header_design_2) {
    document.addEventListener('mouseover', function (e) {
      var header_design_2Taget = e.target.closest('.header-ds2');
      if (e.target.classList.contains('menu-title')) {
        var dataIndexHover = e.target.getAttribute('data-hover-index');
        var menuItemResult = document.querySelector(".header-ds2__bottom-item-".concat(dataIndexHover));
        if (header_design_2Taget && header_design_2Taget.querySelector('.menu-title.active')) {
          header_design_2Taget.querySelector('.menu-title.active').classList.remove('active');
          e.target.classList.add('active');
          header_design_2Taget.querySelector('.header-ds2__bottom-item.active').classList.add('hidden')
          header_design_2Taget.querySelector('.header-ds2__bottom-item.active').classList.remove('active')
          menuItemResult && menuItemResult.classList.remove('hidden')
          menuItemResult && menuItemResult.classList.add('active')
        }
      }
    });
  }

//select currency 
const modal_curency = document.querySelector('.modal-curency')
if (modal_curency) {
    document.addEventListener('click', function (e) {
        if (e.target.classList.contains('icon-currency')) {
            modal_curency.classList.add('open-modal-curency')
            e.target.closest('body').classList.add('overflow-hidden-currency')
            e.target.closest('.tp-main-wrapper').classList.add('overlay-body-currency')
        }
        if (!e.target.classList.contains('icon-currency') && !e.target.closest('.modal-curency')) {
            modal_curency.classList.remove('open-modal-curency')
            e.target.closest('body').classList.remove('overflow-hidden-currency')
            e.target.closest('.tp-main-wrapper').classList.remove('overlay-body-currency')
        }
    })
}


document.addEventListener('click', function (e) {
    if (e.target.classList.contains('icon-search')) {
        e.stopPropagation();
        e.target.closest('.hs__popup').querySelector('.search-modal').classList.add('open');
        e.target.closest('.tp-main-wrapper').classList.add('overlay-body');
    }
    if(!e.target.classList.contains('search-modal__quicksearch') &&!e.target.classList.contains('search-container') && !e.target.classList.contains('icon-search') && !e.target.classList.contains('search__input') && !e.target.classList.contains('search-modal')) {
        document.querySelector('.search-modal').classList.remove('open');
        document.querySelector('.tp-main-wrapper').classList.remove('overlay-body');
    }
})

document.addEventListener('click', function (e) {
    const disclosureButton = e.target.closest('.disclosure__button');
    if (disclosureButton) {
        const disclosure = disclosureButton.closest('.disclosure');
        // Remove all open classes


        console.log(disclosure.classList.contains('open'));
        // disclosure.classList.toggle('open');

        if (disclosure.classList.contains('open') === true) {
            disclosure.classList.remove('open');
        } else {
            const openDisclosures = document.querySelectorAll('.disclosure.open');
            for (const disclosure of openDisclosures) {
                if (disclosure.classList.contains('open')) {
                    disclosure.classList.remove('open');
                }
            }
            disclosure.classList.add('open');
        }

    } else {
        const openDisclosures = document.querySelectorAll('.disclosure.open');
        for (const disclosure of openDisclosures) {
            disclosure.classList.remove('open');
        }
    }
})

// Dropdown currency and language selecter on mobile

document.addEventListener('click', function (e) {
    if (e.target.classList.contains('header-mobile__title')) {
        e.target.closest('.header-mobile__open').classList.toggle('open')
    }
    if (e.target.classList.contains('header__icon--cart')) {
        const cart_drawer = e.target.closest('body').querySelector('cart-drawer')
        e.target.closest('body').classList.add('overlay-body-cart-drawn')
        cart_drawer.classList.add('active')
    }
})

function initInstagram() {
  const instagramMain = document.querySelector('.tp-instagram')
  if (instagramMain) {
    const instagramWrapper = instagramMain.querySelector('.tp-instagram__wrapper')
    const dataAccessToken = instagramMain.getAttribute('data-access-token');
    const dataShowInstagram = instagramMain.getAttribute('data-show_instagram');
    const datagetType = instagramMain.getAttribute('data-type');
    if(datagetType === 'data_instagram') {
      var instagramUrl = `https://graph.instagram.com/me/media?fields=caption,id,media_type,media_url,permalink,thumbnail_url,timestamp,username&access_token=${dataAccessToken}`
    }
    if (instagramUrl) {
      fetch(instagramUrl)
          .then(response => response.text())
          .then(function (data) {
            if (data) {
              let arrTmp = JSON.parse(data)
              let dataArray = Object.values(arrTmp)[0];
              let htmlItems = ''
              if (dataArray.length) {
                dataArray.slice(0, dataShowInstagram).forEach(function (item) {
                  if (instagramWrapper) {
                    let srcImage = item.media_url
                    let permalink = item.permalink
                    let mediaType = item.media_type

                    htmlItems +=
                        `<div class="tp-instagram__item">
                        <a href="${permalink}" title="instagram item">
                            <svg fill="none" height="30" viewbox="0 0 48 49" width="30" xmlns="http://www.w3.org/2000/svg">
                              <path d="M24 0C17.487 0 16.668 0.030625 14.109 0.147C11.55 0.2695 9.807 0.679875 8.28 1.28625C6.67828 1.90126 5.22747 2.86597 4.029 4.11294C2.80823 5.33701 1.86332 6.81786 1.26 8.4525C0.666 10.0083 0.261 11.7906 0.144 14.3937C0.03 17.0122 0 17.8452 0 24.5031C0 31.1548 0.03 31.9878 0.144 34.6001C0.264 37.2094 0.666 38.9887 1.26 40.5475C1.875 42.1584 2.694 43.5243 4.029 44.8871C5.361 46.2499 6.699 47.089 8.277 47.7137C9.807 48.3201 11.547 48.7336 14.103 48.853C16.665 48.9694 17.481 49 24 49C30.519 49 31.332 48.9694 33.894 48.853C36.447 48.7305 38.196 48.3201 39.723 47.7137C41.3237 47.0984 42.7735 46.1337 43.971 44.8871C45.306 43.5243 46.125 42.1584 46.74 40.5475C47.331 38.9887 47.736 37.2094 47.856 34.6001C47.97 31.9878 48 31.1548 48 24.5C48 17.8452 47.97 17.0122 47.856 14.3968C47.736 11.7906 47.331 10.0083 46.74 8.4525C46.1368 6.81781 45.1918 5.33694 43.971 4.11294C42.7729 2.86551 41.322 1.90073 39.72 1.28625C38.19 0.679875 36.444 0.266438 33.891 0.147C31.329 0.030625 30.516 0 23.994 0H24.003H24ZM21.849 4.41613H24.003C30.411 4.41613 31.17 4.43756 33.699 4.557C36.039 4.66419 37.311 5.06537 38.157 5.39919C39.276 5.84325 40.077 6.37612 40.917 7.23362C41.757 8.09112 42.276 8.90575 42.711 10.0511C43.041 10.9117 43.431 12.2102 43.536 14.5989C43.653 17.1806 43.677 17.9554 43.677 24.4939C43.677 31.0323 43.653 31.8102 43.536 34.3919C43.431 36.7806 43.038 38.0761 42.711 38.9397C42.3262 40.0035 41.7121 40.9653 40.914 41.7541C40.074 42.6116 39.276 43.1414 38.154 43.5855C37.314 43.9224 36.042 44.3205 33.699 44.4308C31.17 44.5471 30.411 44.5747 24.003 44.5747C17.595 44.5747 16.833 44.5471 14.304 44.4308C11.964 44.3205 10.695 43.9224 9.849 43.5855C8.8065 43.1933 7.86338 42.5675 7.089 41.7541C6.29025 40.9641 5.67517 40.0013 5.289 38.9366C4.962 38.0761 4.569 36.7776 4.464 34.3888C4.35 31.8071 4.326 31.0323 4.326 24.4877C4.326 17.9462 4.35 17.1745 4.464 14.5928C4.572 12.2041 4.962 10.9056 5.292 10.0419C5.727 8.89962 6.249 8.08194 7.089 7.22444C7.929 6.36694 8.727 5.83713 9.849 5.39306C10.695 5.05619 11.964 4.65806 14.304 4.54781C16.518 4.44369 17.376 4.41306 21.849 4.41V4.41613ZM36.813 8.48312C36.4348 8.48312 36.0603 8.55917 35.7109 8.70692C35.3615 8.85467 35.044 9.07123 34.7765 9.34423C34.5091 9.61724 34.297 9.94134 34.1522 10.298C34.0075 10.6547 33.933 11.037 33.933 11.4231C33.933 11.8092 34.0075 12.1915 34.1522 12.5482C34.297 12.9049 34.5091 13.229 34.7765 13.502C35.044 13.775 35.3615 13.9916 35.7109 14.1393C36.0603 14.2871 36.4348 14.3631 36.813 14.3631C37.5768 14.3631 38.3094 14.0534 38.8495 13.502C39.3896 12.9507 39.693 12.2029 39.693 11.4231C39.693 10.6434 39.3896 9.89559 38.8495 9.34423C38.3094 8.79287 37.5768 8.48312 36.813 8.48312ZM24.003 11.9192C22.3682 11.8932 20.7447 12.1994 19.2269 12.8201C17.7092 13.4407 16.3275 14.3633 15.1625 15.5343C13.9974 16.7053 13.0721 18.1011 12.4405 19.6406C11.809 21.1801 11.4837 22.8325 11.4837 24.5015C11.4837 26.1706 11.809 27.823 12.4405 29.3625C13.0721 30.902 13.9974 32.2978 15.1625 33.4688C16.3275 34.6397 17.7092 35.5624 19.2269 36.183C20.7447 36.8036 22.3682 37.1099 24.003 37.0838C27.2386 37.0323 30.3246 35.684 32.5949 33.33C34.8652 30.9759 36.1377 27.805 36.1377 24.5015C36.1377 21.1981 34.8652 18.0271 32.5949 15.6731C30.3246 13.3191 27.2386 11.9708 24.003 11.9192ZM24.003 16.3323C26.125 16.3323 28.1601 17.1928 29.6606 18.7246C31.161 20.2563 32.004 22.3338 32.004 24.5C32.004 26.6662 31.161 28.7437 29.6606 30.2754C28.1601 31.8072 26.125 32.6677 24.003 32.6677C21.881 32.6677 19.8459 31.8072 18.3454 30.2754C16.845 28.7437 16.002 26.6662 16.002 24.5C16.002 22.3338 16.845 20.2563 18.3454 18.7246C19.8459 17.1928 21.881 16.3323 24.003 16.3323Z" fill="white"/>
                            </svg>
                          <div class="tp-instagram__image">`
                    if (mediaType == 'IMAGE') {
                      htmlItems += `
                            <img width="317" height="317" loading="lazy" alt="${mediaType}" src="${srcImage}">
                            `
                    } else if (mediaType == 'VIDEO') {
                      htmlItems += `
                            <video src="${srcImage}" loop muted autoplay></video>`
                    }

                    htmlItems += `
                          </div>
                        </a>
                    </div>`
                    instagramWrapper.innerHTML = htmlItems
                  }

                });
              }
              instagramMobile()
            }
          })
    }
    instagramMobile()
    function instagramMobile() {
      if (window.innerWidth < 768 && document.querySelector('.tp-instagram__list')) {
        const wpItemMain = document.querySelector('.tp-instagram__list');
        if (wpItemMain) {
          wpItemMain.classList.add('swiper');
          let swiperWrapper = wpItemMain.firstElementChild;
          swiperWrapper.classList.add('swiper-wrapper');
          const swiperaItem = wpItemMain.querySelectorAll('.tp-instagram__item');
          swiperaItem.forEach(function (itemSlide) {
            itemSlide.classList.add('swiper-slide')
          })
          var mobileSliderRecenlty = new Swiper(wpItemMain, {
            slidesPerView: 1.5,
            spaceBetween: 0,
            breakpoints: {
              600: {
                slidesPerView: 2.5,
              },
            },
          });
        }

      }
    }
  }

}

initInstagram()
document.addEventListener('shopify:section:load', initInstagram);
document.addEventListener('shopify:section:unload', initInstagram);

document.addEventListener("DOMContentLoaded", function() {
    var lazyBackgrounds = [].slice.call(document.querySelectorAll(".lazy-background"));

    if ("IntersectionObserver" in window) {
        let lazyBackgroundObserver = new IntersectionObserver(function(entries, observer) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                    lazyBackgroundObserver.unobserve(entry.target);
                }
            });
        });

        lazyBackgrounds.forEach(function(lazyBackground) {
            lazyBackgroundObserver.observe(lazyBackground);
        });
    }
});
function initListCollection() {
  const tpListCollectionMains = document.querySelectorAll(".tp-list-collection__main");
  if(tpListCollectionMains.length > 0){
    tpListCollectionMains.forEach(function(tpListCollectionMain){
      let slides_perview = JSON.parse(tpListCollectionMain.getAttribute('data-slides-perview'))
      if (window.innerWidth > 768 && window.innerWidth < 1024){
        if(slides_perview == 5.5 || slides_perview == 4.5){
           slides_perview = 2.5
        }
        else{
          slides_perview = slides_perview
        }
      }
      

      const data_space_between = JSON.parse(tpListCollectionMain.getAttribute('data-space-between'))

        var centeredSlides = (slides_perview === 4.5 || slides_perview === 5.5) ? true : false;

        var listCollection = new Swiper(tpListCollectionMain, {
        slidesPerView: 1,
        loop: true,
        centeredSlides: centeredSlides,
        preventClicks: true,
        a11y: false,
        breakpoints: {
          390: {
            slidesPerView: 1.5,
            spaceBetween: 15,
          },
          767: {
            slidesPerView: slides_perview,
            spaceBetween: data_space_between,
          },
          1024: {
            slidesPerView: slides_perview,
            spaceBetween: data_space_between,
          },
        },
        navigation: {
          nextEl: ".tp-lcl-button-next",
          prevEl: ".tp-lcl-button-prev",
        },
        on: {
          lazyImageReady: (swiper) => {
            swiper.update();
          },
        },
      });
    })
  }

  //type hover change image
  const hoverChangeImage = document.querySelector('.tp-list-collection__hv-change-img')
  if (hoverChangeImage) {
    document.addEventListener('mouseover', function (e) {
      var hoverChangeImageTaget = e.target.closest('.tp-list-collection__hv-change-img');
      var imageItemCurrent = document.querySelector('.tp-list-collection__item.active');

      if (e.target.classList.contains('tp-content__title')) {
        var dataIndexHover = e.target.getAttribute('data-hover-index');
        var imageItemResult = document.querySelector(".tp-list-collection__item-".concat(dataIndexHover));

        if (hoverChangeImageTaget && hoverChangeImageTaget.querySelector('.tp-content__title.active')) {
          hoverChangeImageTaget.querySelector('.tp-content__title.active').classList.remove('active');
          e.target.classList.add('active');
          imageItemCurrent.classList.add('hidden');
          imageItemCurrent.classList.remove('active');
          imageItemResult.classList.remove('hidden');
          imageItemResult.classList.add('active');
        }
      }
    });
  }
}

initListCollection();

if (Shopify.designMode) {
  // This will only render in the theme editor
  document.addEventListener("shopify:section:load", initListCollection);
  document.addEventListener("shopify:section:unload", initListCollection);
}

function ListProduct() {
  const getElementFacetsHori = () => {
    const facetsFilterHorizontal = document.querySelector(
      ".facets-horizontal #main-collection-filters"
    );
    return facetsFilterHorizontal;
  };

  const getHeightRealFacetsHori = () => {
    const facetsFilterHorizontal = getElementFacetsHori();
    if (facetsFilterHorizontal) {
      const heightReal = facetsFilterHorizontal.clientHeight;
      return heightReal;
    }
  };

  const closeFilterFacets = () => {
    const checkExistfacetsHori = getElementFacetsHori();
    if (!checkExistfacetsHori) {
      const mainCollectionFilters = document.querySelector(
        "#main-collection-filters"
      );
      if (mainCollectionFilters) {
        if (mainCollectionFilters.classList.contains("show-facets-drawer")) {
          mainCollectionFilters.classList.remove("show-facets-drawer");
          mainCollectionFilters
            .closest("body")
            .classList.remove("overlay-body-filter");
        }
      }
    }
    return;
  };

  window.addEventListener("DOMContentLoaded", (event) => {
    const facetsHorizontal = getElementFacetsHori();
    if (facetsHorizontal) {
      window.heightReal = getHeightRealFacetsHori();
      facetsHorizontal.style.height = 0;
    }

    function checkDeviceWidth() {
      const productGrid = document.querySelector("#product-grid");

      const typeList4Col = document.querySelector(
        '.icon-type-list[data-type="grid-4-col"]'
      );
      const typeList3Col = document.querySelector(
        '.icon-type-list[data-type="grid-3-col"]'
      );
      const typeList2col = document.querySelector(
        '.icon-type-list[data-type="grid-2-col"]'
      );
      const typeList1col = document.querySelector(
        '.icon-type-list[data-type="grid-1-col"]'
      );

      const facetsVertical = document.querySelector(".facets-vertical");
      const asideEle = document.querySelector("aside");
      const filterToggleEle = document.querySelector(
        ".product-grid__head-right--filter-toggle"
      );

      if (window.outerWidth <= 768) {
        if (facetsVertical) {
          facetsVertical.classList.add("facets-vertical--drawer");
          facetsVertical
            .querySelector(".facets-wrapper")
            .classList.add("facets-drawer--left");
        }
        if (productGrid) {
          productGrid.classList.remove("grid-4-col", "grid-3-col");
          fetch("/cart.json")
            .then((res) => res.json())
            .then((data) => {
              let typeColumnInit = 2;
              if (data.attributes.collection_products_column_show == "1") {
                typeColumnInit = 1;
              }
              let updateData = {
                attributes: {
                  collection_products_column_show: typeColumnInit,
                },
              };
              fetch(window.Shopify.routes.root + "cart/update.js", {
                method: "POST",
                credentials: "same-origin",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(updateData),
              })
                .then((res) => res.json())
                .then((data) => {
                  // window.location.reload();
                  productGrid.classList.add(`grid-${typeColumnInit}-col`);
                  if (typeColumnInit == 2)
                    typeList2col && typeList2col.classList.add("active");
                  if (typeColumnInit == 1)
                    typeList1col && typeList1col.classList.add("active");
                })
                .catch(function (error) {
                  console.error("Request failed", error);
                });
            });
        }

        // Check filter wrapper has class facet-drawer--left || facet-drawer-right ?
        if (
          facetsVertical &&
          facetsVertical.classList.contains("list-have-sidebar-normal")
        ) {
          if (!facetsVertical.classList.contains("facets-vertical--drawer")) {
            facetsVertical.classList.add("facets-vertical--drawer");
            asideEle.classList.add("facets-drawer--left");
          }

          if (filterToggleEle && filterToggleEle.classList.contains("d-none")) {
            filterToggleEle.classList.remove("d-none");
          }
        }
      }
    }

    checkDeviceWidth();

    window.addEventListener("resize", function () {
      checkDeviceWidth();
    });
  });

  document.addEventListener("click", function (e) {
    if (e.target.classList.contains("btn-select-filter-sort")) {
      let facetFiltersField = e.target.closest(".facet-filters__field");
      facetFiltersField.classList.toggle("show-select");
      if (facetFiltersField.classList.contains("show-select")) {
        facetFiltersField.classList.remove("show-select");
      } else {
        facetFiltersField.classList.add("show-select");
      }
    }

    if (e.target.classList.contains("item-sort")) {
      let facetFiltersField = e.target.closest(".facet-filters__field");
      let facetFiltersSort = facetFiltersField.querySelector(
        ".facet-filters__sort"
      );

      // reset active span select
      let isSelectedCurrent = facetFiltersSort.querySelector(".is-selected");
      isSelectedCurrent && isSelectedCurrent.classList.remove("is-selected");

      e.target.classList.add("is-selected");

      if (facetFiltersField) {
        let button = facetFiltersField.querySelector("button");
        if (button) {
          let dataValueCurrent = button.getAttribute("data-value");
          let dataValueNew = e.target.getAttribute("value");
          let textDataValueNew = e.target.textContent;

          button.setAttribute("data-value", dataValueNew);
          button.querySelector("span").textContent = textDataValueNew;
        }
      }
    }

    if (e.target.closest(".icon-type-list")) {
      let productGrid = document.querySelector("#product-grid");
      let productGridHeadTypeList = e.target.closest(
        ".product-grid__head-type-list"
      );

      let targetIconType = e.target.closest(".icon-type-list");
      let dataType = targetIconType.getAttribute("data-type");

      // reset active icon type
      let activeCurrent = productGridHeadTypeList.querySelector(".active");
      activeCurrent && activeCurrent.classList.remove("active");

      targetIconType.classList.add("active");

      productGrid.className = "";

      productGrid.classList.add("product-grid", `${dataType}`);

      let dataTypeStrTmp = dataType.replace("grid-", "");
      let resulTypeColumn = dataTypeStrTmp.replace("-col", "");

      let updateData = {
        attributes: {
          collection_products_column_show: parseInt(resulTypeColumn),
        },
      };
      fetch(window.Shopify.routes.root + "cart/update.js", {
        method: "POST",
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updateData),
      })
        .then((res) => res.json())
        .then((data) => {
          // window.location.reload();
        })
        .catch(function (error) {
          console.error("Request failed", error);
        });
    }

    if (
      e.target.classList.contains("product-grid__head-right--filter-toggle")
    ) {
      e.stopPropagation();
      const mainCollectionFilters = document.querySelector(
        "#main-collection-filters"
      );
      if (mainCollectionFilters) {
        mainCollectionFilters.classList.toggle("show-facets-drawer");
        if (e.target.closest(".facets-vertical--drawer")) {
          e.target.closest("body").classList.add("overlay-body-filter");
        }
        const facetsHorizontal = getElementFacetsHori();
        if (facetsHorizontal) {
          mainCollectionFilters.style.height =
            mainCollectionFilters.classList.contains("show-facets-drawer")
              ? window.heightReal + "px"
              : 0;
        }
      }
    }

    if (e.target.classList.contains("facets-head__close")) {
      closeFilterFacets();
    }
  });

  window.addEventListener("click", function (e) {
    if (!e.target.classList.contains("btn-select-filter-sort")) {
      let facetFiltersFields = document.querySelectorAll(
        ".facet-filters__field"
      );
      if (facetFiltersFields.length > 0) {
        facetFiltersFields.forEach(function (item) {
          item.classList.contains("show-select") &&
            item.classList.remove("show-select");
        });
      }
    }

    if (!e.target.closest(".facets-wrapper")) {
      if (!e.target.classList.contains("facets-head__close")) {
        closeFilterFacets();
      }
    }
  });

  // Loadmore button function
  if (document.querySelector("#product-grid")) {
    document.addEventListener("click", function (e) {
      if (e.target.classList.contains("load-more_btn")) {
        const loadmoreButton = document.querySelector("#loadmore-collection");

        if (loadmoreButton) {
          const dataLoadMoreType = loadmoreButton.getAttribute("data-type");
          const load_more_btn =
            document.getElementsByClassName("load-more_btn")[0];
          const load_more_spinner =
            document.getElementsByClassName("load-more_spinner")[0];
          if (dataLoadMoreType === "click") {
            loadMoreProducts(loadmoreButton, load_more_btn, load_more_spinner);
          }
        }
      }
    });

    window.addEventListener("scroll", function (e) {
      const loadmoreButton = document.querySelector("#loadmore-collection");

      if (loadmoreButton) {
        const dataLoadMoreType = loadmoreButton.getAttribute("data-type");
        const load_more_btn =
          document.getElementsByClassName("load-more_btn")[0];
        const load_more_spinner =
          document.getElementsByClassName("load-more_spinner")[0];
        if (dataLoadMoreType !== "click") {
          var position = loadmoreButton.getBoundingClientRect();
          if (
            position.top >= 0 &&
            position.bottom <= window.innerHeight &&
            !loadmoreButton.getAttribute("loading")
          ) {
            loadMoreProducts(loadmoreButton, load_more_btn, load_more_spinner);
          }
        }
      }
    });

    function loadMoreProducts(
      loadmoreButton,
      load_more_btn,
      load_more_spinner
    ) {
      loadmoreButton.setAttribute("loading", "true");

      let productGridDOM = document.querySelector("#product-grid");
      if (productGridDOM) {
        let dataUrlNextCurrent = productGridDOM.getAttribute("data-url");
        if (dataUrlNextCurrent) {
          load_more_btn.style.display = "none";
          load_more_spinner.style.display = "block";

          fetch(dataUrlNextCurrent)
            .then((res) => res.text())
            .then((data) => {
              const parser = new DOMParser();
              const dataNextDOM = parser.parseFromString(data, "text/html");
              const productgridDataNextDOM =
                dataNextDOM.querySelector("#product-grid");
              const newProductItems =
                productgridDataNextDOM.querySelectorAll(".grid__item");

              if (newProductItems.length > 0) {
                newProductItems.forEach((item) => {
                  productGridDOM.appendChild(item);
                });
              }

              if (!productgridDataNextDOM.getAttribute("data-url")) {
                productGridDOM.removeAttribute("data-url");
                load_more_btn.style.display = "none";
              } else {
                productGridDOM.setAttribute(
                  "data-url",
                  productgridDataNextDOM.getAttribute("data-url")
                );
                load_more_btn.style.display = "inline-block";
              }

              load_more_spinner.style.display = "none";
            })
            .then(() => {
              loadmoreButton.removeAttribute("loading");
            })
            .catch((error) => {
              console.log(error);
            });
        }
      }
    }
  }
}

ListProduct();
document.addEventListener("shopify:section:load", ListProduct);
document.addEventListener("shopify:section:unload", ListProduct);

function toggleBoxContentLoginPopup(classHeaderTarger, idContentTarget) {
    const tpDrawerHeader = tpModalLogin.querySelector('.tp-drawer__header')

    if (tpDrawerHeader) {
        const activeCurrent = tpDrawerHeader.querySelector('span:not(.hidden)')
        activeCurrent && activeCurrent.classList.add('hidden')

        const targetActive = tpDrawerHeader.querySelector(`.${classHeaderTarger}`)
        targetActive && targetActive.classList.remove('hidden')
    }

    const tpDrawerMain = tpModalLogin.querySelector('.tp-drawer__content')
    if (tpDrawerMain) {
        const activeCurrent = tpDrawerMain.querySelector('.box-content:not(.hidden)')
        activeCurrent && activeCurrent.classList.add('hidden')

        const targetActive = tpDrawerMain.querySelector(`#${idContentTarget}`)
        targetActive && targetActive.classList.remove('hidden')
    }
}

// function resetPopupLogin() {
//     toggleBoxContentLoginPopup('is--login', 'form_login_popup')
// }

const tpModalLogin = document.querySelector('#tp_modal_login')
document.addEventListener('click', function (e) {
    // console.log(e.target);
    // if (e.target.classList.contains("overlay-body-quick-view")) {
    //     console.log('here abcd');
    //     resetPopupLogin()
    // }

    if (e.target.classList.contains('account-button') || e.target.closest('.account-button')) {
        let target = null
        if (e.target.classList.contains('account-button')) {
            target = e.target
        }
        if (e.target.closest('.account-button')) {
            target = e.target.closest('.account-button')
        }

        if (tpModalLogin) {
            tpModalLogin.classList.add('is-open-tp-modal')
            document.body.classList.add("overlay-body-quick-view");
        }
    }

    if (e.target.classList.contains('login__forgot--popup')) {
        if (tpModalLogin) {
            toggleBoxContentLoginPopup('is--recover', 'form_recover_popup')
        }
    }

    if (e.target.classList.contains('login__cancel--popup')) {
        if (tpModalLogin) {
            toggleBoxContentLoginPopup('is--login', 'form_login_popup')
        }
    }

    if (e.target.classList.contains('create-account-popup')) {
        if (tpModalLogin) {
            toggleBoxContentLoginPopup('is--create', 'form_register_popup')
        }
    }

    if (e.target.classList.contains('close-tp-modal')) {
        document.body.classList.remove('overlay-body-quick-view')
        tpModalLogin && tpModalLogin.classList.remove('is-open-tp-modal')
    }

    if (e.target.classList.contains("overlay-body-quick-view")) {
        e.target.classList.remove('overlay-body-quick-view')
        // contentModal.classList.remove('is-open-tp-modal')
        if (e.target.querySelector(".tp-modal-login")) {
            if (e.target.querySelector('.tp-modal-login').classList.contains('is-open-tp-modal')) {
                if (e.target.querySelector('.tp-modal-login')){
                    e.target.querySelector('.tp-modal-login').classList.remove('is-open-tp-modal')
                }
            }
        }
    }
})

// Path: src\js\login-popup.js
// Newletter Popup

function modalNewletter() {
    const tpModalNewsletter = document.querySelector('.tp-modal-newletter');
        if (tpModalNewsletter) {
            var tpnTimeout = tpModalNewsletter.getAttribute('data-timeout');
            if (localStorage.getItem("show_newletter") === "displayed") {
                return;
            }

            setTimeout(function(){
                tpModalNewsletter.classList.add('is-open-tp-modal')
                document.body.classList.add("newsletter-overlay-body");
            }, (tpnTimeout * 1000));
            // console.log(tpnTimeout);
            document.addEventListener('click', function (e) {
                const confirmChecked = tpModalNewsletter.querySelector('#cfNewletter');

                if (e.target.classList.contains("newsletter-overlay-body")) {

                    setTimeout(() => {
                        // Run after 100 milliseconds
                        tpModalNewsletter.classList.remove('is-open-tp-modal')
                    }, 300);

                    setTimeout(() => {
                        // Run after 100 milliseconds
                        document.body.classList.remove("newsletter-overlay-body");
                    }, 500);

                    if (confirmChecked) {
                        if (confirmChecked.checked) {
                            localStorage.setItem("show_newletter", "displayed");
                        }
                    }
                }

                if (e.target.classList.contains("close-tp-modal")) {
                    const confirmChecked = tpModalNewsletter.querySelector('#cfNewletter');
                    setTimeout(() => {
                        // Run after 100 milliseconds
                        tpModalNewsletter.classList.remove('is-open-tp-modal')
                    }, 300);

                    setTimeout(() => {
                        // Run after 100 milliseconds
                        document.body.classList.remove("newsletter-overlay-body");
                    }, 500);
                    console.log(confirmChecked)
                    if (confirmChecked) {
                        if (confirmChecked.checked) {
                            localStorage.setItem("show_newletter", "displayed");
                        }
                    }

                }
            });

        }
}
modalNewletter();
//---load more-----// 
const jsLoadMore = document.querySelectorAll('.js-load-more')
const wrapperItem = document.querySelector('.blog-list')
const parser = new DOMParser();

if (jsLoadMore.length > 0) {
  jsLoadMore.forEach(function (item) {
    item.addEventListener("click", function (e) {
      var totalPages = parseInt(document.querySelector('#all-pages').value),
        currentPage = document.querySelector('#this-page');
      const loadMoreTextEle = item.querySelector('.load-more-text')
      const loadingEle = item.querySelector('.loading')

      loadMoreTextEle.classList.add('hidden')
      loadingEle.classList.remove('hidden')

      var nextUrl = document.querySelector('#next-link'),
        currentPageNew = parseInt(currentPage.value) + 1;


      fetch(nextUrl.value)
        .then(response => response.text())
        .then(function (data) {
          data = parser.parseFromString(data, "text/html");
          const wrapperItemRes = data.querySelector('.blog-list')
          if (wrapperItemRes) {
            const listItemNew = wrapperItemRes.querySelectorAll('.blog-item')
            if (listItemNew.length > 0) {
              listItemNew.forEach(function (itemProduct) {
                wrapperItem.appendChild(itemProduct)
              })
            }
          }
          let nextUrlString = nextUrl.value
          let numberPageCurrnent = parseInt(nextUrlString.substr(nextUrlString.length - 1))
          let numberPageNext = numberPageCurrnent
          let nextUrlNew = nextUrlString.replace(`?page=${numberPageCurrnent}`, `?page=${numberPageNext}`)

          nextUrl.value = nextUrlNew
          currentPage.value = currentPageNew

          if (currentPageNew < totalPages) {
            item.removeAttribute("disabled")
            item.classList.remove('loading-effect')
            loadMoreTextEle.classList.remove('hidden')
            loadingEle.classList.add('hidden')
          }
          if (currentPageNew >= totalPages) {
            item.parentElement.remove()
          }
        })
    })
  })

}

const productVerticalThumb = document.querySelector('.products-vertical__thumb')

if (productVerticalThumb) {
  let dataThumbType = productVerticalThumb.getAttribute('data-thumb-type')
  var direction = 'horizontal'
  var slidesPerView = 5
  if (dataThumbType == 'vertical') {
    direction = 'vertical'
    slidesPerView = 4
  }
}

var productThumb = new Swiper(".products-vertical__thumb", {
  spaceBetween: 15,
  slidesPerView: slidesPerView,
  direction: direction,

  navigation: {
    nextEl: ".products-vertical-next",
    prevEl: ".products-vertical-prev",
  },
});
var productbigImage = new Swiper(".swiperProType1", {

  navigation: {
    nextEl: ".products-vertical-next",
    prevEl: ".products-vertical-prev",
  },


  thumbs: {
    swiper: productThumb,
  },
});


// setHeight slide
const box = document.querySelector('.tp-img-product img');

const tpImgThumb = document.querySelector(".products-vertical__thumb");
if (tpImgThumb) {
  tpImgThumb.style.height = box.clientHeight + "px";
}



class VariantSelects extends HTMLElement {
  constructor() {
    super();
    this.addEventListener('change', this.onVariantChange);
    this.sectionId = this.getAttribute("data-section")
    this.availabilityInfo = document.querySelector('.item-availability-info')
    this.options = []
    this.changeImage = this.getAttribute('data-change-thumb')
  }
  onVariantChange(e) {
    this.updateOptions(e)
    this.updateMasterId()
    this.toggleAddButton(true, '', false)
    this.removeErrorMessage()
    this.updateStock()

    if (!this.currentVariant) {
      this.toggleAddButton(true, '', true);
      // this.setUnavailable();
    } else {

      this.activeVariantItem(e)

      this.updateMedia();
      this.updateURL();
      this.updateVariantInput();
      this.renderProductInfo();
    }
  }

  updateOptions() {
    this.options = Array.from(this.querySelectorAll('select'), (select) => select.value);
  }

  renderActive(inputActive = []) {
    if (inputActive.length === 0) return;

    this.removeActiveCurrent()
    inputActive.forEach(function (item) {
      let idItem = item.getAttribute('id')
      let labelFollowIdItem = document.querySelector(`label[for='${idItem}']`)

      if (labelFollowIdItem) {
        labelFollowIdItem.classList.add('active')
      }
    })
  }

  removeActiveCurrent() {
    const variantItemsActiveCurrent = this.querySelectorAll('.active')
    if (variantItemsActiveCurrent.length === 0) return;
    variantItemsActiveCurrent.forEach(function (item) {
      item.classList.remove('active')
    })
  }

  updateMasterId() {
    this.currentVariant = this.getVariantData().find((variant) => {
      return !variant.options.map((option, index) => {
        return this.options[index] === option;
      }).includes(false);
    });
  }

  activeVariantItem(e) {
    const fieldsetEle = e.target.closest('fieldset.product-form__input')
    // if (!fieldsetEle) {
    //   throw console.error('Not variant item');
    // }
    if (fieldsetEle) {
      const activeCurrent = fieldsetEle.querySelector('.active')
      activeCurrent && activeCurrent.classList.remove('active')

      const thisId = e.target.id

      const labelThis = fieldsetEle.querySelector(`label[for='${thisId}']`)
      labelThis && labelThis.classList.add('active')
    }

  }

  updateMedia() {
    if (!this.currentVariant) return;
    if (this.currentVariant.featured_media) {
      if (this.changeImage === 'true') {
        if (this.currentVariant && this.currentVariant.featured_image) {
          const dataMediaPositionSlideTwoWay = parseInt(this.currentVariant.featured_image.position)
          productThumb.slideTo((dataMediaPositionSlideTwoWay - 1), 0)
          productbigImage.slideTo((dataMediaPositionSlideTwoWay - 1), 0)
        }
      }
    }
  }

  updateURL() {
    if (!this.currentVariant || this.dataset.updateUrl === 'false') return;
    window.history.replaceState({}, '', `${this.dataset.url}?variant=${this.currentVariant.id}`);
  }


  updateVariantInput() {
    const formAddCart = document.querySelector('.tp-box-btn');
    if (!formAddCart) return;

    const inputIncludeVariantId = formAddCart.querySelector(".input-detail-variant");
    if (!inputIncludeVariantId) return;

    inputIncludeVariantId.value = this.currentVariant.id;

  }

  updateStock() {
    if (this.availabilityInfo) {
      const tp_notify_product = document.querySelector('.tp-notify-product');
      const variantAvailable = this.currentVariant.available;
      const instockClass = 'instock';
      const outstockClass = 'outstock';
      const instockText = this.availabilityInfo.getAttribute('data-instock');
      const outstockText = this.availabilityInfo.getAttribute('data-outstock');
      const textContent = variantAvailable ? instockText : outstockText;
      const targetClass = variantAvailable ? instockClass : outstockClass;
      const removeClass = variantAvailable ? outstockClass : instockClass;
      this.availabilityInfo.textContent = textContent;
      this.availabilityInfo.classList.add(targetClass);
      this.availabilityInfo.classList.remove(removeClass);

      // js show subscrible outstock
      if(tp_notify_product){
        if(targetClass == 'outstock'){
          tp_notify_product.style.maxHeight = 90 + 'px'
          tp_notify_product.style.marginBottom = 30 + 'px'
        }else{
          tp_notify_product.style.maxHeight = '0px'
          tp_notify_product.style.marginBottom = 0 + 'px'
        }
      }
    }

  }
  removeErrorMessage() {
    const section = this.closest('section');
    if (!section) return;

    const productForm = section.querySelector('product-form');
    if (productForm) productForm.handleErrorMessage();
  }

  renderProductInfo() {
    fetch(`${this.dataset.url}?variant=${this.currentVariant.id}&section_id=${this.dataset.originalSection ? this.dataset.originalSection : this.dataset.section}`)
      .then((response) => response.text())
      .then((responseText) => {
        const html = new DOMParser().parseFromString(responseText, 'text/html')
        const destination = document.getElementById(`price-${this.dataset.section}`);
        const source = html.getElementById(`price-${this.dataset.originalSection ? this.dataset.originalSection : this.dataset.section}`);
        if (source && destination) destination.innerHTML = source.innerHTML;

        const price = document.getElementById(`price-${this.dataset.section}`);

        if (price) price.classList.remove('visibility-hidden');
        this.toggleAddButton(!this.currentVariant.available, window.variantStrings.soldOut);
      });
  }

  toggleAddButton(disable = true, text, modifyClass = true) {
    const productForm = document.getElementById(`product-form-${this.dataset.section}`);
    if (!productForm) return;
    const addButton = productForm.querySelector('[name="add"]');
    const addButtonText = productForm.querySelector('[name="add"] > span');
    if (!addButton) return;

    if (disable) {
      addButton.setAttribute('disabled', 'disabled');
      if (text) addButtonText.textContent = text;
    } else {
      addButton.removeAttribute('disabled');
      addButtonText.textContent = window.variantStrings.addToCart;
    }

    if (!modifyClass) return;
  }
  getVariantData() {
    this.variantData = this.variantData || JSON.parse(this.querySelector('[type="application/json"]').textContent);
    return this.variantData;
  }
}

customElements.define('variant-selects', VariantSelects);

class VariantRadios extends VariantSelects {
  constructor() {
    super();
    this.changeImage = this.getAttribute('data-change-thumb')
  }

  updateOptions(e) {
    // handle checked important 
    const fieldsetParent = e.target.closest('fieldset.product-form__input')
    const checkedCurrent = fieldsetParent.querySelector("input[checked]")

    checkedCurrent && checkedCurrent.removeAttribute('checked')
    e.target.setAttribute('checked', '')

    const fieldsets = Array.from(this.querySelectorAll('fieldset'));
    this.options = fieldsets.map((fieldset) => {
      return Array.from(fieldset.querySelectorAll('input')).find((radio) => radio.hasAttribute('checked')).value;
    })
  }

  updateMasterId() {
    this.currentVariant = this.getVariantData().find((variant) => {
      return !variant.options.map((option, index) => {
        return this.options[index] === option;
      }).includes(false);
    })

    this.connectStickyProductDetail()
  }

  connectStickyProductDetail() {
    let selfClass = this

    const sticky = document.querySelector("sticky-product-detail")
    if (!sticky) return;

    const thumb = sticky.querySelector('.sticky__info--thumb img')
    if (thumb) {
      selfClass.stickyRenderThumb(thumb)
    }

    if (selfClass.currentVariant) {
      const priceCurrentVariant = selfClass.currentVariant.price
      const compareAtPriceCurrentVariant = selfClass.currentVariant.compare_at_price
      selfClass.stickyRenderPrice(priceCurrentVariant, compareAtPriceCurrentVariant)
      selfClass.stickyRenderVariant()

      selfClass.stickyToggleAddButton(!selfClass.currentVariant.available, window.variantStrings.soldOut)
    }

  }

  stickyRenderThumb(thumb) {
    let selfClass = this

    if (selfClass.currentVariant && selfClass.currentVariant.featured_image) {
      thumb.setAttribute('src', selfClass.currentVariant.featured_image.src)
      thumb.setAttribute('alt', selfClass.currentVariant.featured_image.alt)
    }
  }

  stickyRenderPrice(price, compareAtPrice = null) {
    const stickyPriceProduct = document.querySelector(`.sticky-price-product`)

    if (!price) return;
    if (!stickyPriceProduct) return;

    let selfClass = this

    const priceSale = stickyPriceProduct.querySelector('.price__sale')
    const priceRegular = stickyPriceProduct.querySelector(".price__regular")

    if (compareAtPrice != null) {
      // This sale
      priceSale.style.display = 'block'
      priceRegular.style.display = 'none'

      stickyPriceProduct.classList.contains('price--no-compare') && stickyPriceProduct.classList.remove('price--no-compare')
      stickyPriceProduct.classList.add('price--on-sale')

      const priceItemSale = priceSale.querySelector('.price-item--sale')
      const priceCompareAtPrice = priceSale.querySelector(".price-item--regular")

      priceItemSale.textContent = selfClass.formatCurrency(price)
      if (priceCompareAtPrice) {
        priceCompareAtPrice.textContent = selfClass.formatCurrency(compareAtPrice)
      }

    } else {
      // This regular
      priceSale.style.display = 'none'
      priceRegular.style.display = 'block'
      const priceCompareAtPrice = priceRegular.querySelector(".price-item--regular")
      priceCompareAtPrice.textContent = selfClass.formatCurrency(price)
      stickyPriceProduct.classList.contains('price--on-sale') && stickyPriceProduct.classList.remove('price--on-sale')
      stickyPriceProduct.classList.add('price--no-compare')
    }
  }

  stickyRenderVariant() {
    let selfClass = this

    const variantSelectOptions = document.querySelector("sticky-product-detail .select__select")
    if (!variantSelectOptions) return;

    variantSelectOptions.value = selfClass.currentVariant.title
  }

  formatCurrency(price) {
    price = price.toString()
    let firstPrice = price.substr(0, price.length - 2);
    let stringResult = new Intl.NumberFormat().format(parseInt(firstPrice))
    stringResult = stringResult.replace('.', ',')
    return window.currencyStrings.symbol + stringResult
  }

  stickyToggleAddButton(disable = true, text, modifyClass = true) {
    let sticky = document.querySelector("sticky-product-detail")
    if (!sticky) return;
    const productForm = sticky.querySelector(`product-form`);
    if (!productForm) return;
    const addButton = productForm.querySelector('[name="add"]');
    const addButtonText = productForm.querySelector('[name="add"] > span');
    if (!addButton) return;

    if (disable) {
      addButton.setAttribute('disabled', 'disabled');
      if (text) addButtonText.textContent = text;
    } else {
      addButton.removeAttribute('disabled');
      addButtonText.textContent = window.variantStrings.addToCart;
    }

    if (!modifyClass) return;
  }
}

customElements.define('variant-radios', VariantRadios);



//click variant image product item

class VariantImageProduct extends HTMLElement {
  constructor() {
    super()
    let selfClass = this
    this.imageVariantItem = this.querySelectorAll('.image-variant-item')
    this.variantBigDOM = document.querySelector('variant-image-product')
    if (this.variantBigDOM) {
      this.changeImage = this.variantBigDOM.getAttribute('data-change-thumb')
      this.sectionId = this.variantBigDOM.getAttribute("data-section")
    }
    this.imageVariantItem.forEach(function (variantImg) {
      variantImg.addEventListener('click', function (e) {
        //click change image 
        let imageVariantItemActive = e.target.closest('variant-image-product').querySelector('.image-variant-item.active')
        if (!e.target.classList.contains('active')) {
          e.target.classList.add('active')
          imageVariantItemActive.classList.remove('active')
        }
        // re render price
        const priceCurrentVariant = this.getAttribute('data-price')
        const compareAtPriceCurrentVariant = this.getAttribute('data-price-compare')
        const positionId = this.getAttribute('data-id-position')

        selfClass.updatePrice(priceCurrentVariant, compareAtPriceCurrentVariant)
        selfClass.updateMedia(positionId)
      })
    })


  }
  updatePrice(price, compareAtPrice = null) {
    if (!price) return;
    const priceBig = document.querySelector('.price-product-detail-big')
    if (!priceBig) return;

    let selfClass = this

    const priceSale = priceBig.querySelector('.price__sale')
    const priceRegular = priceBig.querySelector(".price__regular")


    if (compareAtPrice != null) {
      // This sale
      priceSale.style.display = 'block'
      priceRegular.style.display = 'none'

      priceBig.classList.contains('price--no-compare') && priceBig.classList.remove('price--no-compare')
      priceBig.classList.add('price--on-sale')

      const priceItemSale = priceSale.querySelector('.price-item--sale')
      const priceCompareAtPrice = priceSale.querySelector(".price-item--regular")

      priceItemSale.textContent = selfClass.formatCurrency(price)

      priceCompareAtPrice.textContent = selfClass.formatCurrency(compareAtPrice)
    } else {
      // This regular
      priceSale.style.display = 'none'
      priceRegular.style.display = 'block'
      const priceCompareAtPrice = priceRegular.querySelector(".price-item--regular")
      priceCompareAtPrice.textContent = selfClass.formatCurrency(price)
      priceBig.classList.contains('price--on-sale') && priceBig.classList.remove('price--on-sale')
      priceBig.classList.add('price--no-compare')
    }
  }

  formatCurrency(price) {
    if (price > 0) {
      price = price.toString()
      let firstPrice = price.substr(0, price.length - 2);
      let stringResult = new Intl.NumberFormat().format(parseInt(firstPrice))
      stringResult = stringResult.replace('.', ',')
      return window.currencyStrings.symbol + stringResult
    }

  }
  updateMedia(positionId) {
    if (this.changeImage === 'true') {
      const keyEndPoint = this.sectionId + '-' + positionId
      const slideBigImage = document.querySelector(`.tp-img-product__item[data-media-id='${keyEndPoint}']`)
      if (slideBigImage) {
        const dataMediaPositionSlideTwoWay = slideBigImage.getAttribute('data-index')
        if (dataMediaPositionSlideTwoWay) {
          productThumb.slideTo((parseInt(dataMediaPositionSlideTwoWay) - 1), 0)
          productbigImage.slideTo((parseInt(dataMediaPositionSlideTwoWay) - 1), 0)
        }
      }
    }
  }

}
customElements.define('variant-image-product', VariantImageProduct);

document.addEventListener('click', function (e) {
  if (e.target.classList.contains('tab-links')) {
    var buttonActiveCurrent = document.querySelector('.tab-links.active')
    if (buttonActiveCurrent) {
      buttonActiveCurrent.classList.remove('active')
    }

    var dataTabIndex = e.target.getAttribute('data-tab-index')
    var parentItemResult = document.querySelector(`.tab-content-${dataTabIndex}`)

    var parentItemActiveCurrent = document.querySelector('.tab-content.active')

    // Effect
    if (!e.target.classList.contains('active')) {

      e.target.classList.add('active')
    }

    if (parentItemActiveCurrent) {
      parentItemActiveCurrent.classList.add('d-none')
      parentItemActiveCurrent.classList.remove('active')
      // parentItemActiveCurrent.style.color = '#a3a3a3'
    }

    if (parentItemResult) {
      parentItemResult.classList.remove('d-none')
      parentItemResult.classList.add('active')
    }
  }
})

window.addEventListener('scroll', function () {
  if (window.innerWidth > 768) {
    var qtyWrapper = document.querySelector('.qty-wrapper__cart');
    var qtyWrapperSticky = document.querySelector('.sticky-product-detail');

    if (qtyWrapper && qtyWrapperSticky) {
      var position = qtyWrapper.getBoundingClientRect();

      // checking whether fully visible
      if (position.top >= 0 && position.bottom <= window.innerHeight) {
        qtyWrapperSticky.style.bottom = '-' + qtyWrapperSticky.clientHeight + 'px';
      } else {
        qtyWrapperSticky.style.bottom = '0';
      }
    }
  }
});

class RenderVariantProductDetail {
  constructor() {
    this.variantBigDOM = document.querySelector('variant-radios')
    if (this.variantBigDOM) {
      this.changeImage = this.variantBigDOM.getAttribute('data-change-thumb')
      this.sectionId = this.variantBigDOM.getAttribute("data-section")
    }
  }

  updateCurrentVariant(currentVariant) {
    this.currentVariant = currentVariant
  }

  activeVariantItem() {
    if (!this.variantBigDOM) return;

    const fieldsets = this.variantBigDOM.querySelectorAll('fieldset')
    if (fieldsets.length > 0) {
      fieldsets.forEach((fieldset, index) => {
        const labelActiveCurrent = fieldset.querySelector("label.active")
        if (labelActiveCurrent) {
          labelActiveCurrent.classList.remove('active')

          const inputTargetLabelThis = fieldset.querySelector(`input[id='${labelActiveCurrent.getAttribute('for')}']`)

          if (inputTargetLabelThis && inputTargetLabelThis.hasAttributes('checked')) {
            inputTargetLabelThis.removeAttribute('checked')
          }
        }

        const inputActiveNew = fieldset.querySelector(`input[value='${this.currentVariant.options[index]}']`)
        const labelTargetActiveNew = fieldset.querySelector(`label[for='${inputActiveNew.getAttribute('id')}']`)

        labelTargetActiveNew && labelTargetActiveNew.classList.add('active')
        inputActiveNew.setAttribute('checked', '')
      })
    }
  }

  updateMedia() {
    if (!this.currentVariant) return;
    if (this.currentVariant.featured_media) {
      if (this.changeImage === 'true') {
        const keyEndPoint = this.sectionId + '-' + this.currentVariant.featured_media.id
        const slideBigImage = document.querySelector(`.tp-img-product__item[data-media-id='${keyEndPoint}']`)
        if (slideBigImage) {
          const dataMediaPositionSlideTwoWay = slideBigImage.getAttribute('data-index')
          if (dataMediaPositionSlideTwoWay) {
            productThumb.slideTo((parseInt(dataMediaPositionSlideTwoWay) - 1), 0)
            productbigImage.slideTo((parseInt(dataMediaPositionSlideTwoWay) - 1), 0)
          }
        }
      }
    }
  }

  updatePrice(price, compareAtPrice = null) {

    if (!price) return;
    const priceBig = document.querySelector('.price-product-detail-big')
    if (!priceBig) return;

    let selfClass = this

    const priceSale = priceBig.querySelector('.price__sale')
    const priceRegular = priceBig.querySelector(".price__regular")


    if (compareAtPrice != null) {
      // This sale
      priceSale.style.display = 'block'
      priceRegular.style.display = 'none'

      priceBig.classList.contains('price--no-compare') && priceBig.classList.remove('price--no-compare')
      priceBig.classList.add('price--on-sale')

      const priceItemSale = priceSale.querySelector('.price-item--sale')
      const priceCompareAtPrice = priceSale.querySelector(".price-item--regular")

      priceItemSale.textContent = selfClass.formatCurrency(price)

      priceCompareAtPrice.textContent = selfClass.formatCurrency(compareAtPrice)
    } else {
      // This regular
      priceSale.style.display = 'none'
      priceRegular.style.display = 'block'
      const priceCompareAtPrice = priceRegular.querySelector(".price-item--regular")
      priceCompareAtPrice.textContent = selfClass.formatCurrency(price)
      priceBig.classList.contains('price--on-sale') && priceBig.classList.remove('price--on-sale')
      priceBig.classList.add('price--no-compare')
    }
  }

  formatCurrency(price) {
    price = price.toString()
    let firstPrice = price.substr(0, price.length - 2);
    let stringResult = new Intl.NumberFormat().format(parseInt(firstPrice))
    stringResult = stringResult.replace('.', ',')
    return window.currencyStrings.symbol + stringResult
  }

  updateToggleButton(disable = true, text, modifyClass = true) {
    const productForm = document.getElementById(`product-form-${this.sectionId}`);
    if (!productForm) return;
    const addButton = productForm.querySelector('[name="add"]');
    const addButtonText = productForm.querySelector('[name="add"] > span');
    if (!addButton) return;

    if (disable) {
      addButton.setAttribute('disabled', 'disabled');
      if (text) addButtonText.textContent = text;
    } else {
      addButton.removeAttribute('disabled');
      addButtonText.textContent = window.variantStrings.addToCart;
    }

    if (!modifyClass) return;
  }

  updateVariantIdHiddenBig(variantId) {
    const qtyWrapperCart = document.querySelector('.qty-wrapper__cart')
    if (!qtyWrapperCart) return;

    const inputHiddenVariantId = qtyWrapperCart.querySelector('input[name=id]')
    if (!inputHiddenVariantId) return;

    inputHiddenVariantId.value = variantId
  }
}

class StickyProductDetail extends HTMLElement {
  constructor() {
    super();
    let selfClass = this

    this.thumb = this.querySelector('.sticky__info--thumb img')
    this.priceDOM = this.querySelector(`.sticky-price-product`)
    this.variantSelectOptions = this.querySelector(".select__select")
    if (this.variantSelectOptions) {
      this.variantSelectOptions.addEventListener('change', function () {
        selfClass.updateVariant(this)
      })
    }
    this.application = this.querySelector('[type="application/json"]');
    if (this.application) {
      this.dataVariants = this.application.textContent
    }
    
    selfClass.init()
    
  }

  init() {
    let selfClass = this

    const queryString = window.location.search
    const urlParams = new URLSearchParams(queryString)
    const variantIdFromUrl = urlParams.get('variant')

    if (variantIdFromUrl) {
      if (JSON.parse(selfClass.dataVariants).length > 0) {
        JSON.parse(selfClass.dataVariants).forEach(variant => {
          if (variant.id === parseInt(variantIdFromUrl)) {
            selfClass.currentVariant = variant
          }
        })

        if (selfClass.currentVariant) {
          selfClass.renderThumb()

          const priceCurrentVariant = this.currentVariant.price
          const compareAtPriceCurrentVariant = this.currentVariant.compare_at_price
          selfClass.renderPrice(priceCurrentVariant, compareAtPriceCurrentVariant)

          selfClass.toggleAddButton(!selfClass.currentVariant.available, window.variantStrings.soldOut)

          // connect to info product detail BIG
          let variantBig = new RenderVariantProductDetail()
          variantBig.updateCurrentVariant(selfClass.currentVariant)
          variantBig.activeVariantItem()
          variantBig.updateMedia()
          variantBig.updateToggleButton(!selfClass.currentVariant.available, window.variantStrings.soldOut)

          // Render init variant select sticky add to cart
          selfClass.variantSelectOptions.value = selfClass.currentVariant.title
        }
      }
    }
  }

  updateVariant(event) {
    let selfClass = this

    selfClass.currentVariant = JSON.parse(selfClass.dataVariants).find(variant => {
      return variant.title == event.value
    })

    if (selfClass.currentVariant) {
      selfClass.renderThumb()

      const priceCurrentVariant = this.currentVariant.price
      const compareAtPriceCurrentVariant = this.currentVariant.compare_at_price
      selfClass.renderPrice(priceCurrentVariant, compareAtPriceCurrentVariant)
      selfClass.toggleAddButton(!selfClass.currentVariant.available, window.variantStrings.soldOut)
      selfClass.updateVariantIdHidden()

      // connect to info product detail BIG
      let variantBig = new RenderVariantProductDetail()
      variantBig.updateCurrentVariant(selfClass.currentVariant)
      variantBig.activeVariantItem()
      variantBig.updateMedia()
      variantBig.updateToggleButton(!selfClass.currentVariant.available, window.variantStrings.soldOut)
      variantBig.updateVariantIdHiddenBig(selfClass.currentVariant.id)
      variantBig.updatePrice(priceCurrentVariant, compareAtPriceCurrentVariant)
    }
  }

  updateVariantIdHidden() {
    const inputHiddenVariantId = this.querySelector('input[name=id]')
    if (!inputHiddenVariantId) return;

    inputHiddenVariantId.value = this.currentVariant.id
  }


  renderThumb() {
    let selfClass = this
    if (!selfClass.thumb) return

    if (selfClass.currentVariant.featured_image) {
      selfClass.thumb.setAttribute('src', selfClass.currentVariant.featured_image.src)
      selfClass.thumb.setAttribute('alt', selfClass.currentVariant.featured_image.alt)
    }
  }

  formatCurrency(price) {
    price = price.toString()
    let firstPrice = price.substr(0, price.length - 2);
    let stringResult = new Intl.NumberFormat().format(parseInt(firstPrice))
    stringResult = stringResult.replace('.', ',')
    return window.currencyStrings.symbol + stringResult
  }

  toggleAddButton(disable = true, text, modifyClass = true) {
    let selfClass = this
    const productForm = selfClass.querySelector(`product-form`);
    if (!productForm) return;
    const addButton = productForm.querySelector('[name="add"]');
    const addButtonText = productForm.querySelector('[name="add"] > span');
    if (!addButton) return;

    if (disable) {
      addButton.setAttribute('disabled', 'disabled');
      if (text) addButtonText.textContent = text;
    } else {
      addButton.removeAttribute('disabled');
      addButtonText.textContent = window.variantStrings.addToCart;
    }

    if (!modifyClass) return;
  }

  renderPrice(price, compareAtPrice = null) {
    if (!price) return;
    if (this.priceDOM.length == 0) return;

    let selfClass = this

    const priceSale = this.priceDOM.querySelector('.price__sale')
    const priceRegular = this.priceDOM.querySelector(".price__regular")


    if (compareAtPrice != null) {
      // This sale
      priceSale.style.display = 'block'
      priceRegular.style.display = 'none'

      this.priceDOM.classList.contains('price--no-compare') && this.priceDOM.classList.remove('price--no-compare')
      this.priceDOM.classList.add('price--on-sale')

      const priceItemSale = priceSale.querySelector('.price-item--sale')
      const priceCompareAtPrice = priceSale.querySelector(".price-item--regular")

      priceItemSale.textContent = selfClass.formatCurrency(price)

      priceCompareAtPrice.textContent = selfClass.formatCurrency(compareAtPrice)
    } else {
      // This regular
      priceSale.style.display = 'none'
      priceRegular.style.display = 'block'
      const priceCompareAtPrice = priceRegular.querySelector(".price-item--regular")
      priceCompareAtPrice.textContent = selfClass.formatCurrency(price)
      this.priceDOM.classList.contains('price--on-sale') && this.priceDOM.classList.remove('price--on-sale')
      this.priceDOM.classList.add('price--no-compare')
    }
  }
}

customElements.define('sticky-product-detail', StickyProductDetail);
if(document.querySelector('.mobile-search__close')){
    document.querySelector('.mobile-search__close').addEventListener("click", closemobileSearch);
}

if(document.querySelector('.bottom-navbar__search')){
    document.querySelector('.bottom-navbar__search').addEventListener("click", openmobileSearch);
}

function closemobileSearch(){
    if(document.querySelector('.mobile-search')){
        if(document.querySelector('.mobile-search').classList.contains('show')){
            document.querySelector('.mobile-search').classList.remove('show');
        }
        document.querySelector('.mobile-search').classList.add('hidden');
    }
}
function openmobileSearch(){
    if(document.querySelector('.mobile-search')){
        if(document.querySelector('.mobile-search').classList.contains('hidden')){
            document.querySelector('.mobile-search').classList.remove('hidden');
        }
        document.querySelector('.mobile-search').classList.add('show');
    }
}



// Get the modal
var modalSingleProduct = document.getElementById('modal_single_product');

var galleryTopSwiperEleGallerySingleProduct = new Swiper('.modal_single_product', {
  loop: true,
  spaceBetween: 10,
  navigation: {
    prevEl: ".swiper-button-prev.swiper-button-white",
    nextEl: ".swiper-button-next.swiper-button-white",
  }
});

if (modalSingleProduct) {
  // modalSingleProduct.style.display = "none";
  modalSingleProduct.style.width = '0'
  modalSingleProduct.style.height = '0'

  document.addEventListener('keydown', function (e) {
    if (e.key === "Escape") {
      // modalSingleProduct.style.display = "none";
      modalSingleProduct.classList.remove('open-modal')
      modalSingleProduct.style.width = '0'
      modalSingleProduct.style.height = '0'
    }
  });
}

document.addEventListener("click", function (e) {
  if (e.target.classList.contains('image-main')) {
    // modalSingleProduct.style.display = "block";
    modalSingleProduct.classList.add('open-modal')
    modalSingleProduct.style.width = '100%'
    modalSingleProduct.style.height = '100%'

    let initIndexSlide = e.target.getAttribute('data-index-modal') || 0

    galleryTopSwiperEleGallerySingleProduct.slideTo((parseInt(initIndexSlide) + 1), 0, false);
  }
  if (e.target.classList.contains('close') && modalSingleProduct) {
    // modalSingleProduct.style.display = "none";
    modalSingleProduct.classList.remove('open-modal')
    modalSingleProduct.style.width = '0'
    modalSingleProduct.style.height = '0'
  }
})





function initOurTestimonial() {
  const tpOurTestimonial = document.querySelector('.tp-our-testimonial__main');
  var slidesPerView = 2
  let spaceBetween = 30

  if (tpOurTestimonial) {
    const dataLayout = tpOurTestimonial.getAttribute('data-layout')
    if (dataLayout === 'layout_2') {
      spaceBetween = 0
    } else {
      if (dataLayout === 'layout_3') {
        slidesPerView = 1
      }
    }

  }

  var ourTestimonial = new Swiper(".tp-our-testimonial__main", {
    slidesPerView: 1,
    loop: true,
    navigation: {
      nextEl: ".tp-our-testimonial-next",
      prevEl: ".tp-our-testimonial-prev"
    },
    effect: 'slide',
    observer: true,
    observeParents: true,
    pagination: {
      el: ".tp-our-testimonial__pagination",
      clickable: true,
      renderBullet: function (index, className) {
        return '<span class="' + className + '"></span>';
      },
    },
    breakpoints: {
      767: {
        slidesPerView: slidesPerView,
        spaceBetween: spaceBetween,
      },
    }
  });
}

initOurTestimonial()
if (Shopify.designMode) {
  // This will only render in the theme editor
  document.addEventListener('shopify:section:load', initOurTestimonial);
  document.addEventListener('shopify:section:unload', initOurTestimonial);
}

function partner() {
  var swiperPartner = new Swiper(".partnerSwiper", {
    slidesPerView: 2,
    spaceBetween: 10,
    loop: true,
    autoplay: true,
    breakpoints: {
      1024: {
        slidesPerView: 5,
      },
      768: {
        slidesPerView: 4,
      },
      440: {
        slidesPerView: 3,
      }
    }
  });

}

partner();
document.addEventListener("shopify:section:load", partner);
document.addEventListener("shopify:section:unload", partner);
//==== First load page =========
const wrapperPortfolio = document.querySelector(".wrapper-portfolio")

if (wrapperPortfolio) {
  const inputTagFilter = document.querySelector('#tag_filter')
  const listItemPortfolio = wrapperPortfolio.querySelectorAll('.item')

  var valueInputTagFilterCurrent = inputTagFilter.value
  if (listItemPortfolio.length > 0) {
    listItemPortfolio.forEach(function (item, index) {
      if (item.getAttribute('data-tag') !== valueInputTagFilterCurrent) {
        item.classList.add('hide-item')
      }
    })
  }




  //===========================

  document.addEventListener('click', function (e) {
    if (e.target.classList.contains('tab')) {
      //Change input hidden filter_tag
      let valueTag = e.target.getAttribute('data-value')

      inputTagFilter.value = valueTag

      //effect active tag filter
      const parentFilterTag = e.target.parentElement
      const tagFilterActiveCurrent = parentFilterTag.querySelector('.active-tag')
      if (tagFilterActiveCurrent) {
        tagFilterActiveCurrent.classList.remove('active-tag')
      }
      e.target.classList.add('active-tag')

      //Re-render content 

      listItemPortfolio.forEach(function (item, index) {
        if (item.getAttribute('data-tag') !== valueTag) {
          if (!item.classList.contains('hide-item')) {
            item.classList.add('hide-item')
          }
        } else {
          if (item.classList.contains('hide-item')) {
            item.classList.remove('hide-item')
          }
        }
      })
    }
  })


}




//===== Modal swiper gallery - portfolio ============
// Get the modal
var modalPortfolio = document.getElementById('modal_gallery');

var galleryTopSwiperEleGalleryPortfolio = new Swiper('.modal_gallery', {
  slidesPerView: 1,
  loop: true,
  navigation: {
    prevEl: ".swiper-button-prev.swiper-button-white",
    nextEl: ".swiper-button-next.swiper-button-white",
  }
});

if (modalPortfolio) {
  // modalPortfolio.style.display = "none";
  modalPortfolio.style.width = '0'
  modalPortfolio.style.height = '0'

  document.addEventListener('keydown', function (e) {
    if (e.key === "Escape") {
      // modalPortfolio.style.display = "none";
      modalPortfolio.classList.remove('open-modal')
      modalPortfolio.style.width = '0'
      modalPortfolio.style.height = '0'
    }
  });

  document.addEventListener("click", function (e) {
    if (e.target.classList.contains('modal-item__image') || e.target.classList.contains('icon-zoom')) {
      // modalPortfolio.style.display = "block";
      modalPortfolio.classList.add('open-modal')
      modalPortfolio.style.width = '100%'
      modalPortfolio.style.height = '100%'

      let initIndexSlide = e.target.getAttribute('data-index') || 0

      galleryTopSwiperEleGalleryPortfolio.slideTo((parseInt(initIndexSlide) + 1), 0, false);
    }
    if (e.target.classList.contains('close') && modalPortfolio) {
      // modalPortfolio.style.display = "none";
      modalPortfolio.classList.remove('open-modal')
      modalPortfolio.style.width = '0'
      modalPortfolio.style.height = '0'
    }
  })
}

// Path: src\js\product-detail.js
function randomNumberView(min, max) {
    // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min)
}
const viewWrapper = document.querySelector('.tpproduct__viewing-left');
if (viewWrapper) {
    const numberView = viewWrapper.querySelector('.number-view');
    const min = viewWrapper.getAttribute('data-min');
    const max = viewWrapper.getAttribute('data-max');
    const time = viewWrapper.getAttribute('data-time');
    setInterval(() => numberView.innerHTML = randomNumberView(min, max), time);
}
// product detail copy url button
const copyButton = document.querySelector('.product-share__link');
const textCopied = document.querySelector('.text-copied');
let timeoutId = null;

if (copyButton) {
    const copyUrl = copyButton.getAttribute('data-url');
    copyButton.addEventListener('click', (e) => {
        navigator.clipboard.writeText(copyUrl);
        copyButton.classList.add('hidden');
        textCopied.classList.remove('hidden');
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
            textCopied.classList.add('hidden');
            copyButton.classList.remove('hidden');
        }, 2000);
    });
}


//js click checked buy it now
const buy_button__bottom = document.querySelector('.buy-button__bottom');
if (buy_button__bottom && document.querySelector('.agree_terms_conditions')) {
    const agree_terms_conditions = buy_button__bottom.querySelector('.agree_terms_conditions')
    let x = setInterval(function () {
        const button_buy_it_now = buy_button__bottom.querySelector('.shopify-payment-button__button')
        if (button_buy_it_now) {
            button_buy_it_now.setAttribute('disabled', 'disabled')
            button_buy_it_now.classList.add('disabled')
            if (button_buy_it_now.hasAttribute('disabled')) {
                clearInterval(x)
            }
        }
    }, 1000)
    if (agree_terms_conditions) {
        agree_terms_conditions.addEventListener('change', function (e) {
            const btn_buy_it_now_target = e.target.closest('.buy-button__bottom').querySelector('.shopify-payment-button__button')
            if (e.target.checked === true) {
                btn_buy_it_now_target.removeAttribute('disabled')
                btn_buy_it_now_target.classList.remove('disabled')
            } else {
                btn_buy_it_now_target.setAttribute('disabled', 'disabled')
                btn_buy_it_now_target.classList.add('disabled')
            }

        })
    }
}

// agree_terms_conditions click
document.addEventListener('click', function (e) {
    if (e.target.classList.contains('agreetc-class')) {
        const agreeTermsConditionsInput = e.target.querySelector('.agree_terms_conditions')
        agreeTermsConditionsInput.checked = !agreeTermsConditionsInput.checked

        const btn_buy_it_now_target = e.target.closest('.buy-button__bottom').querySelector('.shopify-payment-button__button')
        if (agreeTermsConditionsInput.checked === true) {
            btn_buy_it_now_target.removeAttribute('disabled')
            btn_buy_it_now_target.classList.remove('disabled')
        } else {
            btn_buy_it_now_target.setAttribute('disabled', 'disabled')
            btn_buy_it_now_target.classList.add('disabled')
        }
    }
})

function tpdesactive() {
    const tpdes = document.querySelector(".tp-product-detail__description");
    if (tpdes) {
        tpdes.addEventListener("click", function (e) {
            if (e.target.classList.contains("active")) {
                e.target.classList.remove("active");
            }
        });
    }
}
tpdesactive();


var subscrible_outstock = (function () {
    return {
        init: function () {
            this.click_subscrible_outstock()
            this.click_close_message()
        },
        click_subscrible_outstock: function () {
            const tp_notify_product = document.querySelector('.tp-notify-product');
            if (!tp_notify_product) return
            const btn_subscrible_outstock = tp_notify_product.querySelector('.js-subscrible-outstock');
            btn_subscrible_outstock.addEventListener('click', function () {
                const notifySite = tp_notify_product.querySelector('input[name=tp-notify-product-site]').value,
                    //email customer enter
                    notifyMail = tp_notify_product.querySelector('#prd-subscrible').value,
                    //email Form
                    notifyToMail = tp_notify_product.querySelector('input[name=tp-notify-product-notify-form-mail]').value,
                    //token Email
                    notifyTokenMail = tp_notify_product.querySelector('input[name=tp-notify-product-notify-form-token-mail]').value,
                    notifySiteUrl = tp_notify_product.querySelector('input[name=tp-notify-product-site-url]').value,
                    notifySubjectMail = tp_notify_product.querySelector('input[name=tp-notify-product-email-subject-line]').value,
                    productName = tp_notify_product.querySelector('input[name=tp-notify-product-title]').value,
                    productUrl = tp_notify_product.querySelector('input[name=tp-notify-product-link]').value,
                    productVariant = tp_notify_product.querySelector('input[name=tp-notify-product-variant]').value;
                var content = '<div style="margin:30px auto;width:650px;border:10px solid #f7f7f7"><div style="border:1px solid #dedede">\
                        <h2 style="margin: 0; padding:20px 20px 20px;background:#f7f7f7;color:#555;font-size:2em;text-align:center;">'+ notifySubjectMail + '</h2>';
                content += '<table style="margin:0px 0 0;padding:30px 30px 30px;line-height:1.7em">\
                                <tr><td style="padding: 5px 25px 5px 0;"><strong>Product Name: </strong> ' + productName + '</td></tr>\
                                <tr><td style="padding: 5px 25px 5px 0;"><strong>Product URL: </strong> ' + productUrl + '</td></tr>\
                                <tr><td style="padding: 5px 25px 5px 0;"><strong>Email Request: </strong> ' + notifyMail + '</td></tr>\
                                '+ ((productVariant != '') ? '<tr><td style="padding: 5px 25px 5px 0;"><strong>Product Variant: </strong>' + productVariant + '</td></tr>' : '') + '\
                            </table>';

                content += '<a href="' + notifySiteUrl + '" style="display:block;padding:30px 0;background:#484848;color:#fff;text-decoration:none;text-align:center;text-transform:uppercase">&nbsp;' + notifySite + '&nbsp;</a>';
                content += '</div></div>';
                Email.send({
                    SecureToken: notifyTokenMail,
                    To: notifyToMail,
                    From: notifyToMail,
                    Subject: notifySubjectMail,
                    Body: content,
                    Mess: 'mail sent successfully',
                    el: '.tp-notify-product',
                }).then(
                );
            })
        },
        click_close_message: function () {
            const message_success_outstock = document.querySelector('.js-close-message-outstock')
            message_success_outstock?.addEventListener('click', function () {
                this.parentElement.classList.remove('active-message');
                this.closest('body').classList.remove('overlay-body-outstock')
            })
        }
    }
})();

subscrible_outstock.init()
// select option
document.addEventListener('click', function (e) {
  if (e.target.classList.contains('select-option__btn')) {
    e.target.closest('.select-option').classList.add('active')
    e.target.classList.add('hidden')
    const content = e.target.parentNode.querySelector('.select-option__content')
    content.style.maxHeight = "max-content"
    const hoverImage = e.target.closest('.card__inner').querySelector('.hover-img')
    const productItemAction = e.target.closest('.card__inner').querySelector('.bottom')
    if (hoverImage) {
      hoverImage.style.opacity = 0
    }
    if (productItemAction) {
      productItemAction.classList.add('hidden')
    }
  }
  if (!e.target.classList.contains('select-option__btn') && !e.target.classList.contains('select-option__content') && !e.target.closest('.select-option__content')) {
    const selectOptionContent = document.querySelectorAll('.select-option__content')
    if (selectOptionContent.length > 0) {
      selectOptionContent.forEach(function (item) {
        item.style.maxHeight = null;
        item.parentNode.querySelector('.select-option__btn').classList.remove('hidden')
        item.closest('.select-option').classList.remove('active')
      })
    }
  }
})
let contentModal = document.querySelector('.tp-modal-quick-view')

window.addEventListener('click', function (e) {
  if (e.target.classList.contains('button-quick-view')) {
    contentModal.innerHTML = null
    e.target.querySelector('.quick-view-item').classList.add('hidden')
    e.target.querySelector('.loading-icon').classList.remove('hidden')
    e.target.setAttribute('disabled', '')
    let dataProductHandle = e.target.getAttribute('data-product-handle')
    const parser = new DOMParser()
    var productHandleTemplateUrl = '/products/' + dataProductHandle + '?view=card_quick_view';

    fetch(productHandleTemplateUrl)
      .then(response => response.text())
      .then(function (data) {

        e.target.closest('body').classList.add('quickview-overlay-body-quick-view')
        e.target.closest('body').querySelector('.tp-modal-quick-view').classList.add('is-open-tp-modal');

        e.target.querySelector('.quick-view-item').classList.remove('hidden')
        e.target.querySelector('.loading-icon').classList.add('hidden')
        e.target.removeAttribute('disabled')

        const docProduct = parser.parseFromString(data, "text/html");
        const cardWrapper = docProduct.querySelector('.tp-quick-view')
        contentModal.appendChild(cardWrapper)

        var productThumbqv = new Swiper(".productQuickView__thumb", {
          loop: false,
          spaceBetween: 10,
          slidesPerView: 5.5,
          freeMode: true,
          watchSlidesProgress: true,
        });

        var productbigImageqv = new Swiper(".productQuickView", {
          loop: false,
          spaceBetween: 10,
          navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
          },
          thumbs: {
            swiper: productThumbqv,
          },
        });

        if (!customElements.get('variant-radios-quick-view')) {
          customElements.define('variant-radios-quick-view',
            class VariantRadiosQuickView extends HTMLElement {
              constructor() {
                super();
                this.addEventListener('change', this.onVariantChange);
                this.fieldsets = Array.from(this.querySelectorAll('fieldset'))
                this.priceDOM = document.querySelector(`#price-${this.dataset.productId}`)
                this.currencyActive = window.Shopify.currency.active
                this.quickViewContent = this.closest(".tp-quick-view__right")
              }

              onVariantChange(e) {

                this.updateOptions(e)

                this.updateMasterId();
                this.activeIconVariant(e);
                this.renderProductInfo(e);

                if (!this.currentVariant) {
                  this.toggleAddButton(true, true);
                } else {
                  if (this.currentVariant.available) {
                    this.updateVariantInput();
                    this.toggleAddButton(false, true);
                  } else {
                    this.toggleAddButton(true, true);
                  }
                }
              }

              updateVariantInput() {
                const formAddCart = this.quickViewContent.querySelector(`#product_form_${this.dataset.productId}`)

                if (!formAddCart) return;

                const inputIncludeVariantId = formAddCart.querySelector("input[name='id']")
                if (!inputIncludeVariantId) return;

                inputIncludeVariantId.value = this.currentVariant.id
              }

              updateOptions(event) {

                let arrRadioCheckedValue = []

                if (!event.target.hasAttribute('checked')) {
                  let thisFieldset = event.target.closest('fieldset')
                  let checkedBefore = thisFieldset.querySelector('input[checked]')

                  checkedBefore && checkedBefore.removeAttribute('checked')
                  event.target.setAttribute("checked", true)
                }

                this.fieldsets.forEach(function (fieldset) {
                  fieldset.querySelectorAll('input').forEach(function (radio) {
                    if (radio.hasAttribute('checked')) {
                      arrRadioCheckedValue.push(radio.value)
                    }
                  })
                })
                this.options = arrRadioCheckedValue

              }

              updateMasterId() {
                this.currentVariant = this.getVariantData().find((variant) => {
                  return !variant.options.map((option, index) => {
                    return this.options[index] === option;
                  }).includes(false);
                })

              }

              renderProductInfo() {

                if (!this.currentVariant) return;
                // re render price
                const priceCurrentVariant = this.currentVariant.price
                const compareAtPriceCurrentVariant = this.currentVariant.compare_at_price

                this.renderPrice(priceCurrentVariant, compareAtPriceCurrentVariant)

                // render image
                if (this.currentVariant.featured_media) {
                  const dataMediaPositionSlideTwoWay = parseInt(this.currentVariant.featured_image.position)
                  var productThumbqv = new Swiper(".productQuickView__thumb", {
                    loop: false,
                    spaceBetween: 10,
                    slidesPerView: 5.5,
                    freeMode: true,
                    watchSlidesProgress: true,
                  });

                  var productbigImageqv = new Swiper(".productQuickView", {
                    loop: false,
                    spaceBetween: 10,
                    navigation: {
                      nextEl: ".swiper-button-next",
                      prevEl: ".swiper-button-prev",
                    },
                    thumbs: {
                      swiper: productThumbqv,
                    },
                  });

                  productThumbqv.slideTo((dataMediaPositionSlideTwoWay - 1), 0)
                  productbigImageqv.slideTo((dataMediaPositionSlideTwoWay - 1), 0)
                }
              }

              activeIconVariant(e) {
                const target = e.target

                // Reset active icon variant
                const listVariant = target.closest('fieldset')
                if (listVariant) {
                  listVariant.querySelector('.active') && listVariant.querySelector('.active').classList.remove('active')
                  listVariant.querySelector(`label[for='${target.id}']`) && listVariant.querySelector(`label[for='${target.id}']`).classList.add('active')
                }
              }

              renderPrice(price, compareAtPrice = null) {
                if (!price) return;
                if (this.priceDOM.length === 0) return;
                let selfClass = this
                // this.priceDOM.forEach(function (priceDOM) {
                const priceSale = this.priceDOM.querySelector('.price__sale')
                const priceRegular = this.priceDOM.querySelector(".price__regular")
                if (compareAtPrice != null) {
                  // This sale
                  priceSale.style.display = 'block'
                  priceRegular.style.display = 'none'

                  this.priceDOM.classList.contains('price--no-compare') && this.priceDOM.classList.remove('price--no-compare')
                  this.priceDOM.classList.add('price--on-sale')

                  const priceItemSale = priceSale.querySelector('.price-item--sale')
                  const priceCompareAtPrice = priceSale.querySelector(".price-item--regular")
                  if (priceItemSale) {
                    priceItemSale.textContent = selfClass.formatCurrency(price)
                  }

                  if (priceCompareAtPrice) {
                    priceCompareAtPrice.textContent = selfClass.formatCurrency(compareAtPrice)
                  }
                } else {
                  // This regular
                  priceSale.style.display = 'none'
                  priceRegular.style.display = 'block'

                  priceSale.style.display = 'none'
                  priceRegular.style.display = 'block'
                  const priceCompareAtPrice = priceRegular.querySelector(".price-item--regular")
                  priceCompareAtPrice.textContent = selfClass.formatCurrency(price)
                  this.priceDOM.classList.contains('price--on-sale') && this.priceDOM.classList.remove('price--on-sale')
                  this.priceDOM.classList.add('price--no-compare')
                }
                // })
              }

              formatCurrency(price) {
                price = price.toString()
                let firstPrice = price.substr(0, price.length - 2);
                let stringResult = new Intl.NumberFormat().format(parseInt(firstPrice))
                stringResult = stringResult.replace('.', ',')
                return window.currencyStrings.symbol + stringResult
              }

              toggleAddButton(disable, modifyClass) {
                const quickBuyButton = document.querySelector(`.quick-add__submit-${this.dataset.productId}`)
                const quickBuyButtonTextAdd = quickBuyButton.querySelector('.add-to-cart-text')
                const quickBuyButtonTextSold = quickBuyButton.querySelector('.sold-out-message')
                if (!quickBuyButton) return;

                if (disable) {
                  quickBuyButton.setAttribute('disabled', 'disabled');
                  quickBuyButtonTextAdd.classList.add('hidden')
                  quickBuyButtonTextSold.classList.remove('hidden')
                } else {
                  quickBuyButton.removeAttribute('disabled');
                  quickBuyButtonTextAdd.classList.remove('hidden')
                  quickBuyButtonTextSold.classList.add('hidden')
                }
                if (!modifyClass) return;
              }

              getVariantData() {
                this.variantData = this.variantData || JSON.parse(this.querySelector('[type="application/json"]').textContent);
                return this.variantData;
              }
            }
          )
        }

      });
  }

  if (e.target.classList.contains('close-tp-modal')) {

    e.target.closest('body').classList.remove('quickview-overlay-body-quick-view')
    if (e.target.closest('.tp-modal-quick-view')) {
      e.target.closest('.tp-modal-quick-view').classList.remove('is-open-tp-modal')
    }

  }

  if (e.target.classList.contains("quickview-overlay-body-quick-view")) {
    e.target.classList.remove('quickview-overlay-body-quick-view')
    contentModal.classList.remove('is-open-tp-modal')
    if (e.target.querySelector(".tp-modal-quick-view")) {
      if (e.target.querySelector('.tp-modal-quick-view').classList.contains('is-open-tp-modal')) {
        if (e.target.querySelector('.tp-modal-quick-view')){
            e.target.querySelector('.tp-modal-quick-view').classList.remove('is-open-tp-modal')
        }
      }
    }
  }
})

class QuantityInputStorepify extends HTMLElement {
  constructor() {
    super();
    this.input = this.querySelector('input');
    this.changeEvent = new Event('change', {
      bubbles: true
    })

    this.querySelectorAll('button').forEach(
      (button) => button.addEventListener('click', this.onButtonClick.bind(this))
    );

    this.input.addEventListener('change', this.onButtonClick.bind(this));

    this.tpQuickView = this.closest('.tp-quick-view')
    this.formAddToCartQV = this.tpQuickView.querySelector(`#product_form_${this.getAttribute("data-product-id")}`)
  }

  onButtonClick(event) {
    event.preventDefault();
    if (event.target.name === 'minus') {
      this.input.stepDown()
    }
    if (event.target.name === 'plus') {
      this.input.stepUp()
    }
    // event.target.name === 'minus' ? this.input.stepDown() : this.input.stepUp();
    // event.target.name === 'plus' ? this.input.stepUp() : this.input.stepDown();
    let quantity = this.input.value
    const quantityInput = this.formAddToCartQV.querySelector('input[name="quantity"]')
    quantityInput.value = quantity
  }

}

customElements.define('quantity-input-storepify', QuantityInputStorepify);
var recentlyProductFunction = function () {
  const dataProductLocalStorage = JSON.parse(localStorage.getItem("recently_product"))

  const sectionRecentlyProduct = document.querySelector('.section-recently-product')
  const facetsRecentlyProduct = document.querySelector('.facets-recently-product')
  const productHandleInPage = document.querySelector("#product_handle")
  const parser = new DOMParser()
  const recentlyProductMain = document.getElementById('recently-product__main')

  if (localStorage.getItem("recently_product") !== '' && localStorage.getItem("recently_product") !== null) {
    // hidden title no data single product
    if (facetsRecentlyProduct && dataProductLocalStorage.length > 0) {
      facetsRecentlyProduct.classList.remove('hidden')
    }
    // hidden title no data detail product
    if (sectionRecentlyProduct && dataProductLocalStorage.length > 1) {
      sectionRecentlyProduct.classList.remove('hidden')
    }
  }

  if (dataProductLocalStorage && recentlyProductMain) {

    const countProductLocalStorage = dataProductLocalStorage.length
    const recentlyProducDetail = document.querySelector('.recently-product-detail')
    const dataProductToShow = recentlyProducDetail && recentlyProducDetail.getAttribute('data-product-to-show')

    dataProductLocalStorage.forEach((itemProduct, index) => {

      var handle = Object.values(itemProduct)
      var productHandleTemplateUrl = '/products/' + handle + '?view=card';

      if (productHandleInPage) {
        // Product detail
        if (handle != productHandleInPage.value && dataProductToShow == '4') {
          if (index != 1) {
            fetctProductWithHandle(productHandleTemplateUrl)
          }
        } else if (handle != productHandleInPage.value && dataProductToShow == '5') {
          fetctProductWithHandle(productHandleTemplateUrl)
        }

      } else {
        // Product Listing
        if (countProductLocalStorage > 3) {
          if (index < 0 || index > 2) {
            fetctProductWithHandle(productHandleTemplateUrl)
          }
        } else {
          fetctProductWithHandle(productHandleTemplateUrl)
        }
      }
    });
  }
}
recentlyProductFunction();

function fetctProductWithHandle(productHandleTemplateUrl) {
  const recentlyProductMain = document.getElementById('recently-product__main')
  const parser = new DOMParser();
  fetch(productHandleTemplateUrl)
    .then(response => response.text())
    .then(function (data) {
      const docProduct = parser.parseFromString(data, "text/html");
      const cardWrapper = docProduct.querySelector('.card-wrapper')
      const gridItem = document.createElement('div')
      gridItem.setAttribute('class', 'grid__item')
      recentlyProductMain.appendChild(gridItem)
      if (gridItem.getAttribute('class') === 'grid__item') {
        gridItem.appendChild(cardWrapper)
      }

      if (window.innerWidth <= 768) {
        const wpItemMain = document.querySelector('.product-rize-mobile');
        if (wpItemMain) {
          wpItemMain.classList.add('swiper');
          let swiperWrapper = wpItemMain.firstElementChild;
          swiperWrapper.classList.add('swiper-wrapper');
          const swiperaItem = wpItemMain.querySelectorAll('.grid__item');
          swiperaItem.forEach(function (itemSlide) {
            itemSlide.classList.add('swiper-slide')
          })
          var mobileSliderRecenlty = new Swiper(wpItemMain, {
            slidesPerView: 1.6,
            spaceBetween: 20,
            loop: false,
            breakpoints: {
              600: {
                slidesPerView: 2.5,
              },
            },
          });
        }
      }

    });
}





function initReview() {
  const tp_review = document.querySelector('.tp-review__main')
    if(!tp_review) return
  const data_type = tp_review.getAttribute('data-type')
  if(data_type === 'layout_1'){
    var review = new Swiper(".tp-review__main-layout_1", {
      slidesPerView: 1.5,
      spaceBetween: 15,
      loop: true,
      navigation: {
        nextEl: ".nav-review-next",
        prevEl: ".nav-review-prev"
      },
      breakpoints: {
        500: {
          slidesPerView: 2,
        },
        767: {
          slidesPerView: 3,
        },
        992: {
          slidesPerView: 3.5,
          spaceBetween: 20,
        },
        1024: {
          slidesPerView: 4,
        },
      }
    });
  }else{
    var swiper = new Swiper(".tp-review__main-layout_2", {
      loop: true,
      effect: "coverflow",
      slidesPerView: 2,
      coverflowEffect: {
        rotate: 45,
        stretch: 0,
        depth: 500,
        modifier: 1,
        slideShadows: true,
      },
      navigation: {
        nextEl: ".nav-review-next",
        prevEl: ".nav-review-prev"
      },
      breakpoints: {
        767: {
          slidesPerView: 3,
          coverflowEffect: {
            rotate: 30,
            depth: 300,
          },
        }
      }
    });
  
  }
 
}

initReview()
document.addEventListener('shopify:section:load', initReview);
document.addEventListener('shopify:section:unload', initReview);

if(document.querySelector('.bottom-navbar')){
    var lastScrollTop = 0;
    const scrollevent = document.querySelector('.bottom-navbar');
    document.addEventListener('scroll', (e) => {
        lastKnownScrollPosition = window.scrollY;
        var st = window.scrollY || document.documentElement.scrollTop; // Credits: "https://github.com/qeremy/so/blob/master/so.dom.js#L426"
        if (st > lastScrollTop) {
            // downscroll code
            if(!scrollevent.classList.contains('active') && window.innerWidth <= 767){
                scrollevent.classList.add('active');
                scrollevent.closest("html").classList.add("has-navbar");
            }
        } else {
            // upscroll code
            if(scrollevent.classList.contains('active') && window.innerWidth <= 767){
                scrollevent.classList.remove('active');
                scrollevent.closest("html").classList.remove("has-navbar");
            }
        }
        lastScrollTop = st <= 0 ? 0 : st; // For Mobile or negative scrolling

    });
}

//-----select option global-----//

const btnSelects = document.querySelectorAll('.tp-select__btn')

//event click on select
btnSelects.forEach(function (itemSelect) {

    itemSelect.addEventListener('click', function (e) {
        changeStatusSvg(this)
        showOrhiddenOption(e.target)
    })

    const mainOptions = itemSelect.closest('.tp-select').querySelectorAll('.tp-option__item');
    //assign value  option in value select when click in option
    if (mainOptions.length > 0) {
        mainOptions.forEach(function (item) {
            item.addEventListener('click', function (e) {
                let valueOption = this.innerText;
                let valueSelect = e.target.closest('.tp-select').querySelector('span');
                valueSelect.innerText = valueOption;
                changeStatusSvg(itemSelect)
                showOrhiddenOption(itemSelect)
            })
        })
    }
})

// close select option

window.addEventListener('click', function (e) {
    if (!e.target.classList.contains('tp-option') && !e.target.classList.contains('text-field') && !e.target.classList.contains('icon-select')) {
        let mainOptionClose = document.querySelectorAll('.tp-option');
        if (mainOptionClose.length > 0) {
            mainOptionClose.forEach(function (itemClose) {
                if (itemClose.style.maxHeight) {
                    itemClose.style.maxHeight = null;
                }
            })
        }
    }
})



//function change status svg
function changeStatusSvg(item) {
    if (item.querySelector('svg').classList.contains('rotate-svg')) {
        item.querySelector('svg').classList.remove('rotate-svg')
    } else {
        item.querySelector('svg').classList.add('rotate-svg')
    }
}
// function show or hiiden option
function showOrhiddenOption(event) {
    let mainOption = event.closest('.tp-select').querySelector('.tp-option');
    if (mainOption.style.maxHeight) {
        mainOption.style.maxHeight = null;
    } else {
        mainOption.style.maxHeight = mainOption.scrollHeight + "px";
    }
}
function slide() {
  const slideMains = document.querySelectorAll(".js-slide-main");
  if (slideMains.length > 0) {
    slideMains.forEach(function(slideMain){
    const loopSlide = JSON.parse(slideMain.getAttribute("data-loop")),
          autoSlide = JSON.parse(slideMain.getAttribute("data-autoplay")),
          sectionId = slideMain.getAttribute("data-section-id");

    const onSliderChange = (classes) => {
      var titles = slideMain.querySelectorAll(classes);

      titles.forEach(function (title) {
        var animatedType = title.getAttribute('data-animated-type');
        title.classList.remove('animated', animatedType);
      });
      setTimeout(function () {
        var activeTitle = document.querySelector('.swiper-slide-active ' + classes);
        if (activeTitle) {
          var activeAnimatedType = activeTitle.getAttribute('data-animated-type');
          activeTitle.classList.add('animated', activeAnimatedType);
        }
      }, 50);
    }

    var slideStorepify = new Swiper(slideMain, {
      slidesPerView: 1,
      loop: loopSlide,
      autoplay: autoSlide,
      effect: 'fade',
      slideShadows: true,
      navigation: {
        nextEl: ".slide-button-next",
        prevEl: ".slide-button-prev",
      },

      pagination: {
        clickable: true,
        el: `.tp-swiper-pagination-${sectionId}`,
        renderBullet: function (index, className) {
          return `<span class="loading-spinner ${className}"><svg class="loading-spinner__circle-svg" viewBox="25 25 50 50"><circle class="loading-spinner__circle-stroke" cx="50" cy="50" r="20" fill="none" stroke-width="2" stroke-miterlimit="10"/></svg></span>`;
        },
      },

      on: {
        slideChange: function () {
          onSliderChange('.tp-content__subtitle');
          onSliderChange('.tp-content__title');
          onSliderChange('.tp-content__description');
          onSliderChange('.tp-slide__box');
        },
      },

    });
    if (document.querySelector('.tp-content__title')) {
      if (document.querySelector('.swiper-slide-next .tp-content__title')) {
        var nextTitle = document.querySelector('.swiper-slide-next .tp-content__title').innerText;
        // console.log(nextTitle)
      }

      if (document.querySelector('.swiper-slide-prev .tp-content__title')) {
        var prevTitle = document.querySelector('.swiper-slide-prev .tp-content__title').innerText;
        // console.log(prevTitle);
      }

    }

    if (nextTitle && document.querySelector('.title_slide_next')) {
      document.querySelector('.title_slide_next').innerText = nextTitle
    }
    if (prevTitle && document.querySelector('.title_slide_prev')) {
      document.querySelector('.title_slide_prev').innerText = prevTitle
    }

    slideStorepify.on('slideChangeTransitionEnd', function () {

      if (nextTitle && document.querySelector('.title_slide_next')) {
        document.querySelector('.title_slide_next').innerText = nextTitle
      }
      if (prevTitle && document.querySelector('.title_slide_prev')) {
        document.querySelector('.title_slide_prev').innerText = prevTitle
      }
    });
    })
  }


}
slide();
document.addEventListener("shopify:section:load", slide);
document.addEventListener("shopify:section:unload", slide);
const mainVideo = document.querySelector('.tp-video')
if (mainVideo) {
  const videoCustom = document.querySelector('.video-custom')
  const tpModal = videoCustom.querySelector('.tp-modal')
  const tpVideoModal = videoCustom.querySelector('.tp-modal-video-popup')

  if(tpVideoModal){
    const videoPopup = tpVideoModal.querySelector('video')
    document.addEventListener('click', function (e) {
      if (e.target.classList.contains('video-custom__btn')) {
        const body = e.target.closest('body')
        body.classList.add('overlay-body-video-popup')
        tpModal.classList.add('is-open-tp-modal')
      }
      if (e.target.classList.contains('tp-modal__close') || !e.target.closest('.tp-modal') && !e.target.closest('.video-custom__btn')) {
        const body = e.target.closest('body')
        body.classList.remove('overlay-body-video-popup')
        tpModal && tpModal.classList.remove('is-open-tp-modal')
        if (videoPopup) {
          videoPopup.pause();
        }
      }
    })
  }
}
