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

export default slider;