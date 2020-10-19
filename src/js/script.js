"use strict";

const progress = document.querySelector('.progress__line'),
    body = document.querySelector('body');

window.addEventListener('scroll', () => {
    let scrollID = (window.pageYOffset / (body.scrollHeight - window.innerHeight)) * 100;
    progress.style.width = scrollID + '%';
});


//steps

const stepsList = document.querySelector('.steps__wrapper'),
    stepsItem = stepsList.querySelectorAll('.steps__item');

const wrapFirst = stepsList.querySelectorAll('.item-wrapper'),
    wrapSec = stepsList.querySelectorAll('.item-wrapper_sec');

stepsItem.forEach((item, i) => {
    item.addEventListener('click', (e) => {
        wrapFirst[i].classList.toggle('show');
        wrapSec[i].classList.toggle('show');
    });

});


//qustions

const question = document.querySelectorAll('.questions__quest'),
    answer = document.querySelectorAll('.questions__ans'),
    x = document.querySelectorAll('.questions__x');

question.forEach((item, i) => {

    item.addEventListener('click', (e) => {
        gtag('event', 'click', {
            'event_category': 'question',
            'event_label': 'question ' + i
        });
        if (answer[i].classList.contains('question__ans_slide')) {
            answer[i].classList.remove('question__ans_slide');
            answer[i].style.height = 0;
            answer[i].style.borderTop = 'none';
            x[i].classList.remove('hide');

        } else {
            answer[i].style.height = answer[i].scrollHeight + 'px';
            answer[i].classList.add('question__ans_slide');
            answer[i].style.borderTop = 1 + 'px ' + 'solid ' + 'black';
            x[i].classList.add('hide');

        }
    });
});


//menu hamurger

const hamburger = document.querySelector('.hamburger'),
    hamburgerItem = hamburger.querySelectorAll('.hamburger__item'),
    menu = document.querySelector('.menu-mobile');
hamburger.addEventListener('click', (e) => {
    if (menu.classList.contains('menu-mobile_active')) {
        menu.classList.remove('menu-mobile_active');
        hamburgerItem[1].classList.remove('hide');
        hamburgerItem[0].classList.remove('hamburger__item_left');
        hamburgerItem[2].classList.remove('hamburger__item_right');
    } else {
        menu.classList.add('menu-mobile_active');
        hamburgerItem[1].classList.add('hide');
        hamburgerItem[0].classList.add('hamburger__item_left');
        hamburgerItem[2].classList.add('hamburger__item_right');
    }
});


//calcul credit

const calcRange = document.querySelectorAll('.calculator__range');

const offer = document.querySelectorAll('.offer'),
    calculatorArea = document.querySelectorAll('.calculator__area'),
    creditSum = document.querySelectorAll('.credit-sum'),
    creditPercent = document.querySelectorAll('.credit-percent'),
    loan = document.querySelectorAll('.loan');

const btnEdit = document.querySelectorAll('.btnEdit');


btnEdit.forEach((item, i) => {
    item.addEventListener('click', (e) => {

        let target = e.target;
        if (target.classList.contains('plus')) {
            if (i == 1) {
                btnChange(0, target, 15000, 'plus');
            } else {
                btnChange(1, target, 31, 'plus');
            }
        } else {
            if (i == 0) {
                btnChange(0, target, 500);
            } else {
                btnChange(1, target, 1);
            }
        }
    });
});

function btnChange(index, target, stop, arg = 0) {
    if (calculatorArea[index].value < stop) {
        if (arg == 'plus') {
            calculatorArea[index].value = Number(calculatorArea[index].value) + Number(target.value);
            calcRange[index].value = calculatorArea[index].value;
        }
    }
    if (calculatorArea[index].value > stop && calculatorArea[index].value > stop) {
        if (arg == 0) {
            calculatorArea[index].value = Number(calculatorArea[index].value) - Number(target.value);
            calcRange[index].value = calculatorArea[index].value;
        }
    }

    gtag('event', 'click', {
        'event_category': 'calc',
        'event_label': `btn line ${index} ${target.textContent} ${calculatorArea[index].value}`
    });

    calculator(0, 1);

}


calculatorArea.forEach((item, i) => {
    item.addEventListener('input', function(e) {

        calcRange[i].value = +this.value;
        calculator(0, 1);
    });
    item.addEventListener('change', (e) => {
        gtag('event', 'click', {
            'event_category': 'calc',
            'event_label': `area ${i} ${calculatorArea[i].value}`
        });
    });
});

calcRange.forEach((item, i) => {
    item.addEventListener('input', function(e) {
        calculatorArea[i].value = this.value;
        calculator(0, 1);
    });
    item.addEventListener('mouseup', (e) => {
        gtag('event', 'click', {
            'event_category': 'calc',
            'event_label': `range ${i} ${calculatorArea[i].value}`
        });
    });
});

function calculator(areaCredit, areaDay) {
    creditSum.forEach((item, i) => {
        if (+calculatorArea[areaCredit].value <= +offer[i].dataset.max) {
            offer[i].classList.remove('hide');
            item.textContent = calculatorArea[areaCredit].value;
            let a = Math.round((calculatorArea[areaCredit].value * offer[i].dataset.percent * calculatorArea[areaDay].value));
            creditPercent[i].textContent = a;
            loan[i].textContent = +calculatorArea[areaCredit].value + a;
            calcRange.value = calculatorArea.value;
        } else {
            offer[i].classList.add('hide');
        }
    });
}
calculator(0, 1);

// hide offers

const btnShowOffers = document.querySelector('.btn-wrapper'),
    hideWrapper = document.querySelector('.offer-wrapper_hide');

btnShowOffers.addEventListener('click', (e) => {
    gtag('event', 'click', {
        'event_category': 'show offer',
        'event_label': 'показать все'
    });
    btnShowOffers.style.height = 0;
    hideWrapper.style.height = hideWrapper.scrollHeight + 'px';
    setTimeout(() => {
        hideWrapper.classList.remove('offer-wrapper_hide');
        hideWrapper.style.height = 'auto';
    }, 1000);

});

//analitycs action

const offerBtn = document.querySelectorAll('.btn_offer-request');

offerBtn.forEach((index, i) => {
    index.addEventListener('click', (e) => {
        gtag('event', 'click', {
            'event_category': 'offer',
            'event_label': offer[i].dataset.name
        });
    });
});


//scroll

window.addEventListener('scroll', startScroll);

function startScroll() {
    gtag('event', 'page scroll', {
        'event_category': 'first scroll',
        'event_label': 'first scroll'
    });
    window.removeEventListener('scroll', startScroll);
}

let scrollCount = 0;

window.addEventListener('scroll', pageScroll);

function pageScroll() {
    let pageHeight = document.body.scrollHeight,
        a = Math.round(window.pageYOffset / pageHeight * 100);

    if (scrollCount < a) {
        scrollCount = a;
        scrollAmount(scrollCount);
    }
}

function scrollAmount(arg) {
    if (arg == 10) {
        gtag('event', 'page scroll', {
            'event_category': 'scroll',
            'event_label': arg + '%'
        });
        ++scrollCount;
    } else if (arg == 25) {
        gtag('event', 'page scroll', {
            'event_category': 'scroll',
            'event_label': arg + '%'
        });
        showAsideOffer();
        ++scrollCount;
    } else if (arg == 50) {
        gtag('event', 'page scroll', {
            'event_category': 'scroll',
            'event_label': arg + '%'
        });
        ++scrollCount;
    } else if (arg == 90) {
        gtag('event', 'page scroll', {
            'event_category': 'scroll',
            'event_label': 'end'
        });
        window.removeEventListener('scroll', pageScroll);
    }
}


//click steps__item

const steps = document.querySelectorAll('.steps__item');

steps.forEach((item, i) => {
    item.addEventListener('click', (e) => {
        gtag('event', 'click', {
            'event_category': 'steps',
            'event_label': 'step ' + i
        });
    });
});


//popUp

const asideOffer = document.querySelector('.aside-offer'),
    asideOfferClose = document.querySelector('.aside-offer__close'),
    asideLink = document.querySelector('.aside-offer__link');

const windowWith = window.innerWidth;

function showAsideOffer() {
    //scroll part

    if (windowWith < 770) {
        asideOffer.classList.add('aside-offer__wrapper_show');
        gtag('event', 'show', {
            'event_category': 'aside',
            'event_label': 'show aside'
        });
    }
}

function closeAsideOffer() {
    asideOffer.classList.remove('aside-offer__wrapper_show');
    gtag('event', 'hide', {
        'event_category': 'aside',
        'event_label': 'close aside'
    });
}

asideOfferClose.addEventListener('click', (e) => {
    closeAsideOffer();
});

asideLink.addEventListener('click', (e) => {
    gtag('event', 'click', {
        'event_category': 'offer',
        'event_label': 'aside offer'
    });
    asideOffer.classList.remove('aside-offer__wrapper_show');
});