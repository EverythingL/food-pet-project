/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./js/modules/calculator.js":
/*!**********************************!*\
  !*** ./js/modules/calculator.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function calculator() {
    const calculatingGender = document.querySelector('#calculating-gender');
    const calculatingInput = document.querySelector('#calculating-input');
    const inputList = calculatingInput.querySelectorAll('input');
    const calculatingRatio = document.querySelector('#calculating-ratio');
    const calculatingResult = document.querySelector('.calculating__result span');

    let inputParamObj = {};
    let calculationParamObj = {
        'data-ratio': '1.375',
        'data-sex': '447.6',
        'sex': 'female'
    };

    Object.keys(calculationParamObj).forEach(key => {
        if (localStorage.getItem(key)) {
            calculationParamObj[key] = localStorage.getItem(key);
        } else {
            localStorage.setItem(key, calculationParamObj[key]);
        }
    });

    calculatingGender.querySelector(`[data-sex="${calculationParamObj['data-sex']}"]`)
        .classList.add('calculating__choose-item_active');
    calculatingRatio.querySelector(`[data-ratio="${calculationParamObj['data-ratio']}"]`)
        .classList.add('calculating__choose-item_active');

    // console.log(calculationParamObj);

    function formulaInit(weight, height, age) {
        let formula = +calculationParamObj['data-sex'] + (weight * +inputParamObj.weight) +
            (height * +inputParamObj.height) - (age * +inputParamObj.age);
        return formula;
    }

    function calcNormalQuantity(inputObject, calcObject) {
        if (Object.keys(inputObject).length == inputList.length && Object.keys(calcObject).length == 3) {
            let formulaRes;
            let count = 0;
            Object.values(inputObject).forEach(item => {
                item != null ? count++ : count--;
            });

            if (count == inputList.length) {
                calcObject.sex == 'male' ? formulaRes = formulaInit(13.4, 4.8, 5.7) :
                    formulaRes = formulaInit(9.2, 3.1, 4.3);
                let quantity = (+calcObject['data-ratio'] * + formulaRes).toFixed(0);
                !isNaN(quantity) ? calculatingResult.textContent = quantity : calculatingResult.textContent = 0;
            } else {
                calculatingResult.textContent = 0;
            }
        }
    }

    calculatingInput.addEventListener('click', (e) => {
        if (e.target.nodeName == 'INPUT') {
            e.target.addEventListener('input', function (event) {
                let reg = /\d/gm;
                let value;
                this.value.match(reg) ? value = this.value.match(reg).join('') : value = null;
                this.value = value;
                inputParamObj[this.getAttribute('id')] = value;
                calcNormalQuantity(inputParamObj, calculationParamObj);
                // console.log(inputParamObj);
            });
        }
        window.addEventListener('keydown', (e) => {
            if (e.code == "Tab" && e.path[0].nodeName === "INPUT" && e.path[1].classList.contains('calculating__choose_medium')) {
                e.preventDefault();
            }
        });
    });

    function calculatingFormListener(parent, target, trigerClass, data) {
        parent.addEventListener('click', (e) => {
            if (e.target.classList.contains(target)) {
                parent.querySelectorAll(`.${target}`).forEach(item => {
                    item.classList.remove(trigerClass);
                });

                e.target.classList.add(trigerClass);

                calculationParamObj[data] = e.target.getAttribute(data);

                localStorage.setItem(data, e.target.getAttribute(data));
                if (parent.getAttribute('id') == 'calculating-gender') {
                    localStorage.setItem('sex', e.target.getAttribute('id'));
                    calculationParamObj.sex = e.target.getAttribute('id');
                }
                calcNormalQuantity(inputParamObj, calculationParamObj);

                // console.log(calculationParamObj);
            }
        });
    }

    calculatingFormListener(calculatingGender, 'calculating__choose-item',
        'calculating__choose-item_active', 'data-sex');
    calculatingFormListener(calculatingRatio, 'calculating__choose-item',
        'calculating__choose-item_active', 'data-ratio');
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (calculator);

/***/ }),

/***/ "./js/modules/cards.js":
/*!*****************************!*\
  !*** ./js/modules/cards.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../services/services */ "./js/services/services.js");


function cards() {
    // menu-cards

    class MenuCard {
        constructor(image, alt, title, desription, price, parentSelector, ...classes) {
            this.image = image;
            this.alt = alt;
            this.title = title;
            this.desription = desription;
            this.price = price;
            this.classes = classes;
            this.parent = document.querySelector(parentSelector);
            this.transfer = 27;
            this.changeToUAH();
        }
        changeToUAH() {
            this.price = this.price * this.transfer;
        }
        renderCard() {
            const element = document.createElement('div');
            if (this.classes.length === 0) {
                this.element = 'menu__item';
                element.classList.add(this.element);
            } else {
                this.classes.forEach(className => element.classList.add(className));
            }
            element.innerHTML = `
                <img src="${this.image}" alt="${this.alt}">
                <h3 class="menu__item-subtitle">${this.title}"</h3>
                <div class="menu__item-descr">
                    ${this.desription}
                </div>
                <div class="menu__item-divider"></div>
                <div class="menu__item-price">
                    <div class="menu__item-cost">Цена:</div>
                    <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
                </div>`;
            this.parent.append(element);
        }
    }

    (0,_services_services__WEBPACK_IMPORTED_MODULE_0__.getResource)('http://localhost:3004/menu')
        .then(data =>
            data.forEach(({ img, altimg, title, descr, price }) => {
                new MenuCard(img, altimg, title, descr, price, '.menu .container',).renderCard();
            }));

    // axios.get('http://localhost:3004/menu')
    //     .then(data =>
    //         data.data.forEach(({ img, altimg, title, descr, price }) => {
    //             new MenuCard(img, altimg, title, descr, price, '.menu .container',).renderCard();
    //         }));
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (cards);

/***/ }),

/***/ "./js/modules/forms.js":
/*!*****************************!*\
  !*** ./js/modules/forms.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _modal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modal */ "./js/modules/modal.js");
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../services/services */ "./js/services/services.js");



function formData(formSelector, modalTimerId) {
    // form-data

    const forms = document.querySelectorAll(formSelector);

    const message = {
        loading: 'icons/spinner.svg',
        success: 'Data send successfull',
        failure: 'Something goes wrong',
    };

    forms.forEach(item => {
        bindPostData(item);
    });



    function bindPostData(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const statusMsg = document.createElement('img');
            statusMsg.src = message.loading;
            statusMsg.style.cssText = `
                    display: block;
                    margin: 0 auto;
                `;
            form.insertAdjacentElement('afterend', statusMsg);

            const formData = new FormData(form);
            const object = {};
            formData.forEach(function (value, key) {
                object[key] = value;
            });

            (0,_services_services__WEBPACK_IMPORTED_MODULE_1__.postData)('http://localhost:3004/requests', JSON.stringify(object))
                .then(data => {
                    console.log(data);
                    showThanksModal(message.success);
                    statusMsg.remove();
                })
                .catch(() => {
                    showThanksModal(message.failure);
                })
                .finally(() => {
                    form.reset();
                });
        });
    }

    function showThanksModal(message) {
        const prevModalDialog = document.querySelector('.modal__dialog');

        prevModalDialog.classList.add('hide');
        (0,_modal__WEBPACK_IMPORTED_MODULE_0__.openModal)('.modal', modalTimerId);

        const thanksModal = document.createElement('div');
        thanksModal.classList.add('modal__dialog');
        thanksModal.innerHTML = `
                <div class="modal__content"> 
                    <div data-close="" class="modal__close">×</div>
                    <div class="modal__title">${message}</div>
                </div>
            `;

        document.querySelector('.modal').append(thanksModal);

        setTimeout(() => {
            thanksModal.remove();
            prevModalDialog.classList.remove('hide');
            prevModalDialog.classList.add('show');
            (0,_modal__WEBPACK_IMPORTED_MODULE_0__.closeModal)('.modal');
        }, 4000);

    }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (formData);

/***/ }),

/***/ "./js/modules/modal.js":
/*!*****************************!*\
  !*** ./js/modules/modal.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "closeModal": () => (/* binding */ closeModal),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   "openModal": () => (/* binding */ openModal)
/* harmony export */ });
function closeModal(modalSelector) {
    const modal = document.querySelector(modalSelector);
    modal.classList.remove('show');
    modal.classList.add('hide');
    document.body.style.overflow = '';
}
function openModal(modalSelector, modalTimerId) {
    const modal = document.querySelector(modalSelector);
    modal.classList.add('show');
    modal.classList.remove('hide');
    document.body.style.overflow = 'hidden';

    console.log(modalTimerId);
    if (modalTimerId) {
        clearInterval(modalTimerId);
    }
}

function modal(triggerSelector, modalSelector, modalTimerId) {
    const modalTrigger = document.querySelectorAll(triggerSelector);
    const modal = document.querySelector(modalSelector);

    modalTrigger.forEach(btn => {
        btn.addEventListener('click', () => openModal(modalSelector, modalTimerId));
    });

    modal.addEventListener('click', (e) => {
        if (e.target === modal || e.target.getAttribute('data-close') == '') {
            closeModal(modalSelector);
        }
    });

    document.addEventListener('keyup', (e) => {
        if (modal.classList.contains('show') && e.code == "Escape") {
            closeModal(modalSelector);
        }
    });

    function showModalByScroll() {
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
            openModal(modalSelector, modalTimerId);
            window.removeEventListener('scroll', showModalByScroll);
        }
    }

    window.addEventListener('scroll', showModalByScroll);
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (modal);


/***/ }),

/***/ "./js/modules/slider.js":
/*!******************************!*\
  !*** ./js/modules/slider.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function slider({ container, slide, nextArrow, prevArrow, currentCounter, totalCounter, wrapper, inner }) {
    // slider

    const slideList = document.querySelectorAll(slide);
    const slider = document.querySelector(container);
    const arrowPrev = document.querySelector(prevArrow);
    const arrowNext = document.querySelector(nextArrow);
    const current = document.querySelector(currentCounter);
    const total = document.querySelector(totalCounter);
    const sliderWrapper = document.querySelector(wrapper);
    const sliderField = document.querySelector(inner);
    const width = window.getComputedStyle(sliderWrapper).width;

    let slideIndex = 1;
    let offset = 0;


    if (slideList.length < 10) {
        total.innerText = `0${slideList.length}`;
        current.innerText = `0${slideIndex}`;
    } else {
        total.innerText = slideList.length;
        if (slideIndex < 10) {
            current.innerText = `0${slideIndex}`;
        } else {
            current.innerText = slideIndex;
        }
    }

    sliderField.style.width = 100 * slideList.length + '%';


    slideList.forEach(item => {
        item.style.width = width;
    });


    // dots start

    let sliderDotsWrapper = document.createElement('div');
    sliderDotsWrapper.classList.add('offer__slider-dots-wrapper');

    slideList.forEach((item, num) => {
        sliderDotsWrapper.innerHTML += `                
                <div class="dot" data-slide="${num + 1}"></div>`;
    });


    function dotsActiveRemove() {
        dotList.forEach(item => {
            item.classList.remove('active');
        });
    }

    function getZeroSlideIndex() {
        if (slideIndex < 10) {
            current.innerText = `0${slideIndex}`;
        } else {
            current.innerText = slideIndex;
        }
    }

    function deleteNotDigits(str) {
        return +str.replace(/\D/g, '');
    }

    sliderWrapper.after(sliderDotsWrapper);
    const dotList = document.querySelectorAll('.dot');

    dotList[slideIndex - 1].classList.add('active');

    dotList.forEach(item => {
        item.addEventListener('click', () => {

            dotsActiveRemove();

            let slideNum = item.getAttribute('data-slide');

            offset = (slideNum - 1) * deleteNotDigits(width);
            item.classList.add('active');

            sliderField.style.transform = `translateX(-${offset}px)`;

            slideIndex = slideNum;

            getZeroSlideIndex();
        });
    });

    // dots end

    arrowNext.addEventListener('click', () => {
        if (offset == deleteNotDigits(width) * (slideList.length - 1)) {
            offset = 0;
        } else {
            offset += deleteNotDigits(width);
        }

        sliderField.style.transform = `translateX(-${offset}px)`;

        if (slideIndex > slideList.length - 1) {
            slideIndex = 1;
        } else {
            slideIndex++;
        }

        getZeroSlideIndex();

        dotsActiveRemove();
        dotList[slideIndex - 1].classList.add('active');
    });

    arrowPrev.addEventListener('click', () => {
        if (offset == 0) {
            offset = deleteNotDigits(width) * (slideList.length - 1);
        } else {
            offset -= deleteNotDigits(width);
        }

        sliderField.style.transform = `translateX(-${offset}px)`;

        if (slideIndex == 1) {
            slideIndex = slideList.length;
        } else {
            slideIndex--;
        }

        getZeroSlideIndex();
        dotsActiveRemove();
        dotList[slideIndex - 1].classList.add('active');
    });
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (slider);

/***/ }),

/***/ "./js/modules/tabs.js":
/*!****************************!*\
  !*** ./js/modules/tabs.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function tabs(tabsSelector, tabsContentSelector, tabsParentSelector, activeClass) {
    const tabs = document.querySelectorAll(tabsSelector);
    const tabsContent = document.querySelectorAll(tabsContentSelector);
    const tabsParent = document.querySelector(tabsParentSelector);

    function hideTabContent() {
        tabsContent.forEach(item => {
            item.classList.add('hide');
            item.classList.remove('show', 'fade');
        });

        tabs.forEach(item => {
            item.classList.remove(activeClass);
        });
    }

    function showTabContent(i = 0) {
        tabsContent[i].classList.add('show', 'fade');
        tabsContent[i].classList.remove('hide');
        tabs[i].classList.add(activeClass);
    }

    hideTabContent();
    showTabContent();

    tabsParent.addEventListener('click', (e) => {
        const target = e.target;
        if (target && target.classList.contains(tabsSelector.slice(1))) {
            tabs.forEach((item, i) => {
                if (target == item) {
                    hideTabContent();
                    showTabContent(i);
                }
            });
        }
    });
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (tabs);




/***/ }),

/***/ "./js/modules/timer.js":
/*!*****************************!*\
  !*** ./js/modules/timer.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function timer(id, deadline) {
    function getTimeRemaining(endtime) {
        const t = Date.parse(endtime) - Date.parse(new Date()),
            days = Math.floor((t / (1000 * 60 * 60 * 24))),
            seconds = Math.floor((t / 1000) % 60),
            minutes = Math.floor((t / 1000 / 60) % 60),
            hours = Math.floor((t / (1000 * 60 * 60) % 24));

        return {
            'total': t,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds,
        };
    }

    function getZero(num) {
        if (num >= 0 && num < 10) {
            return `0${num}`;
        } else {
            return num;
        }
    }

    function setClock(selector, endtime) {
        const timer = document.querySelector(selector);
        const days = timer.querySelector('#days');
        const hours = timer.querySelector('#hours');
        const minutes = timer.querySelector('#minutes');
        const seconds = timer.querySelector('#seconds');
        const timeInterval = setInterval(updateClock, 1000);

        updateClock();

        function updateClock() {
            const t = getTimeRemaining(endtime);
            days.innerHTML = getZero(t.days);
            hours.innerHTML = getZero(t.hours);
            minutes.innerHTML = getZero(t.minutes);
            seconds.innerHTML = getZero(t.seconds);

            if (t.total <= 0) {
                clearInterval(timeInterval);
            }
        }
    }

    setClock(id, deadline);
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (timer);

/***/ }),

/***/ "./js/services/services.js":
/*!*********************************!*\
  !*** ./js/services/services.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getResource": () => (/* binding */ getResource),
/* harmony export */   "postData": () => (/* binding */ postData)
/* harmony export */ });
const postData = async function (url, data) {
    const res = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: data,
    });

    return await res.json();
};

const getResource = async function (url) {
    const res = await fetch(url);
    if (!res.ok) {
        throw new Error(`Could not fetch ${url} on status ${res.status}`);
    }
    return await res.json();
};

 

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
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
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
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./js/script.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_tabs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/tabs */ "./js/modules/tabs.js");
/* harmony import */ var _modules_modal__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/modal */ "./js/modules/modal.js");
/* harmony import */ var _modules_timer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/timer */ "./js/modules/timer.js");
/* harmony import */ var _modules_cards__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/cards */ "./js/modules/cards.js");
/* harmony import */ var _modules_calculator__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/calculator */ "./js/modules/calculator.js");
/* harmony import */ var _modules_forms__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modules/forms */ "./js/modules/forms.js");
/* harmony import */ var _modules_slider__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./modules/slider */ "./js/modules/slider.js");











document.addEventListener('DOMContentLoaded', () => {
    const modalTimerId = setTimeout(() => (0,_modules_modal__WEBPACK_IMPORTED_MODULE_1__.openModal)('.modal', modalTimerId), 50000);

    (0,_modules_tabs__WEBPACK_IMPORTED_MODULE_0__["default"])('.tabheader__item', '.tabcontent', '.tabheader__items', 'tabheader__item_active');
    (0,_modules_modal__WEBPACK_IMPORTED_MODULE_1__["default"])('[data-modal]', '.modal', modalTimerId);
    (0,_modules_timer__WEBPACK_IMPORTED_MODULE_2__["default"])('.timer', '2022-09-13');
    (0,_modules_cards__WEBPACK_IMPORTED_MODULE_3__["default"])();
    (0,_modules_calculator__WEBPACK_IMPORTED_MODULE_4__["default"])();
    (0,_modules_forms__WEBPACK_IMPORTED_MODULE_5__["default"])('form', modalTimerId);
    (0,_modules_slider__WEBPACK_IMPORTED_MODULE_6__["default"])({
        container: '.offer__slider',
        nextArrow: '.offer__slider-next',
        prevArrow: '.offer__slider-prev',
        slide: '.offer__slide',
        currentCounter: '#current',
        totalCounter: '#total',
        wrapper: '.offer__slider-wrapper',
        inner: '.offer__slider-inner',
    });

    console.log('works 111');
});
})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map