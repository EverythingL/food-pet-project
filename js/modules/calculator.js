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

export default calculator;