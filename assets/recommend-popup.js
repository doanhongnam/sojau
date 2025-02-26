/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/new-build/js/recommend-popup.js":
/*!*********************************************!*\
  !*** ./src/new-build/js/recommend-popup.js ***!
  \*********************************************/
/***/ (() => {

// Products Recommended Popup
if (localStorage.getItem("recommend_limit") === null) {
  localStorage.setItem("recommend_limit", "0");
}
function recommen_popup() {
  if (!document.querySelector('.recommen-popup')) {
    return;
  }
  var time_start = document.querySelector('.recommen-popup').getAttribute('data-start');
  setTimeout(function () {
    document.querySelector('.recommen-pr').classList.add('active');
    document.querySelector('.recommen-pr__wrap').classList.add('active');
    var recommendLimit = localStorage.getItem("recommend_limit");
    localStorage.setItem("recommend_limit", "".concat(++recommendLimit));
  }, time_start);
  var recommenPrClose = document.querySelector(".recommen-pr__close");
  var recommenWrap = document.querySelector(".recommen-pr__wrap");
  var recommenPr = document.querySelector(".recommen-pr");
  if (recommenPrClose) {
    recommenPrClose.addEventListener("click", function (e) {
      recommenPrClose.closest(".recommen-pr__wrap");
      recommenWrap.classList.remove("active");
      recommenPr.classList.remove("active");
    });
  }
}
var recommen_Pr = document.querySelector(".recommen-pr");
var data_no_show = document.querySelector('.recommen-popup').getAttribute('data-no-show');
if (recommen_Pr && data_no_show === "true") {
  recommen_Pr.addEventListener('click', function () {
    recommen_Pr.classList.remove('active');
    if (localStorage.getItem('recommen-pr') !== 'hiddenRecomen') {
      localStorage.setItem('recommen-pr', 'hiddenRecomen');
    }
  });
}

// remove storage value
if (data_no_show === "false") {
  localStorage.removeItem('recommen-pr');
}
if (localStorage.getItem('recommen-pr') !== 'hiddenRecomen') {
  var data_limit = document.querySelector('.recommen-popup').getAttribute('data-limit');
  // remove "recommend_limit" storerage
  if (localStorage.getItem("recommend_limit") <= data_limit || data_limit === 0) {
    recommen_popup();
  }
}

/***/ }),

/***/ "./src/sass/password.scss":
/*!********************************!*\
  !*** ./src/sass/password.scss ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/new-build/scss/bought-together.scss":
/*!*************************************************!*\
  !*** ./src/new-build/scss/bought-together.scss ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./assets/main.min.css":
/*!*****************************!*\
  !*** ./assets/main.min.css ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./assets/main.css":
/*!*************************!*\
  !*** ./assets/main.css ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./assets/tailwind.css":
/*!*****************************!*\
  !*** ./assets/tailwind.css ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/chunk loaded */
/******/ 	(() => {
/******/ 		var deferred = [];
/******/ 		__webpack_require__.O = (result, chunkIds, fn, priority) => {
/******/ 			if(chunkIds) {
/******/ 				priority = priority || 0;
/******/ 				for(var i = deferred.length; i > 0 && deferred[i - 1][2] > priority; i--) deferred[i] = deferred[i - 1];
/******/ 				deferred[i] = [chunkIds, fn, priority];
/******/ 				return;
/******/ 			}
/******/ 			var notFulfilled = Infinity;
/******/ 			for (var i = 0; i < deferred.length; i++) {
/******/ 				var [chunkIds, fn, priority] = deferred[i];
/******/ 				var fulfilled = true;
/******/ 				for (var j = 0; j < chunkIds.length; j++) {
/******/ 					if ((priority & 1 === 0 || notFulfilled >= priority) && Object.keys(__webpack_require__.O).every((key) => (__webpack_require__.O[key](chunkIds[j])))) {
/******/ 						chunkIds.splice(j--, 1);
/******/ 					} else {
/******/ 						fulfilled = false;
/******/ 						if(priority < notFulfilled) notFulfilled = priority;
/******/ 					}
/******/ 				}
/******/ 				if(fulfilled) {
/******/ 					deferred.splice(i--, 1)
/******/ 					var r = fn();
/******/ 					if (r !== undefined) result = r;
/******/ 				}
/******/ 			}
/******/ 			return result;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"/assets/recommend-popup": 0,
/******/ 			"assets/tailwind.rtl": 0,
/******/ 			"assets/main.rtl": 0,
/******/ 			"assets/main.rtl.min": 0,
/******/ 			"assets/bought-together": 0,
/******/ 			"assets/password": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		__webpack_require__.O.j = (chunkId) => (installedChunks[chunkId] === 0);
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = (parentChunkLoadingFunction, data) => {
/******/ 			var [chunkIds, moreModules, runtime] = data;
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			if(chunkIds.some((id) => (installedChunks[id] !== 0))) {
/******/ 				for(moduleId in moreModules) {
/******/ 					if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 						__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 					}
/******/ 				}
/******/ 				if(runtime) var result = runtime(__webpack_require__);
/******/ 			}
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
/******/ 				}
/******/ 				installedChunks[chunkId] = 0;
/******/ 			}
/******/ 			return __webpack_require__.O(result);
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = self["webpackChunk"] = self["webpackChunk"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module depends on other loaded chunks and execution need to be delayed
/******/ 	__webpack_require__.O(undefined, ["assets/tailwind.rtl","assets/main.rtl","assets/main.rtl.min","assets/bought-together","assets/password"], () => (__webpack_require__("./src/new-build/js/recommend-popup.js")))
/******/ 	__webpack_require__.O(undefined, ["assets/tailwind.rtl","assets/main.rtl","assets/main.rtl.min","assets/bought-together","assets/password"], () => (__webpack_require__("./src/sass/password.scss")))
/******/ 	__webpack_require__.O(undefined, ["assets/tailwind.rtl","assets/main.rtl","assets/main.rtl.min","assets/bought-together","assets/password"], () => (__webpack_require__("./src/new-build/scss/bought-together.scss")))
/******/ 	__webpack_require__.O(undefined, ["assets/tailwind.rtl","assets/main.rtl","assets/main.rtl.min","assets/bought-together","assets/password"], () => (__webpack_require__("./assets/main.min.css")))
/******/ 	__webpack_require__.O(undefined, ["assets/tailwind.rtl","assets/main.rtl","assets/main.rtl.min","assets/bought-together","assets/password"], () => (__webpack_require__("./assets/main.css")))
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["assets/tailwind.rtl","assets/main.rtl","assets/main.rtl.min","assets/bought-together","assets/password"], () => (__webpack_require__("./assets/tailwind.css")))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;