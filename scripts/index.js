import Swiper from "../lib/swiper-bundle.esm.browser.min.js";

//simplebar
new SimpleBar(document.querySelector('.country__list'), {
    classNames: {
        scrollbar: 'country__scrollbar',
        track: 'country__track'
    }
})

new Swiper('.goods__block', {
    slidesPerView: 1,
    spaceBetween: 20,
    breakpoints: {
        320: {
            slidesPerView: 1,
        },
        768: {
            slidesPerView: 2,
        },
        1024: {
            slidesPerView: 2,
            spaceBetween: 24,
        },
        1440: {
            slidesPerView: 3,
            spaceBetween: 24,
        },

    },

    navigation: {
        prevEl: '.goods__arrow_prev',
        nextEl: '.goods__arrow_next'
    },
    loop:true,
    preventClicks: true,
    a11y: false,
});

//modal

const product__more = document.querySelectorAll('.product__more');
const modal = document.querySelector('.modal');

product__more.forEach((btn) => {
    btn.addEventListener('click', () => {
        modal.classList.add('modal_open')
    })
});

modal.addEventListener('click', (event) => {
    if (event.target === modal) {
        modal.classList.remove('modal_open')
    }
});

const formPlaceholder = document.querySelectorAll('.form__placeholder');
const formInput = document.querySelectorAll('.form__input');

formInput.forEach((input, i) => {
    input.addEventListener('focus', () => {
        formPlaceholder[i].classList.add('form__placeholder_active')
    })

    input.addEventListener('blur', () => {
        if (input.value === '') {
         formPlaceholder[i].classList.remove('form__placeholder_active')
        }
    })
});



//price

const dataCurrency = {};

const formatCurrency = (value, currency) => {
    return new Intl.NumberFormat('EU',  {
        style: 'currency',
        currency,
        maximumFractionDigits: 2,
    }).format(value)
}

const showPrice = (currency = 'USD') => {
    const priceElems = document.querySelectorAll('[data-price]');

    priceElems.forEach(elem => {
        elem.textContent = formatCurrency(elem.dataset.price * dataCurrency[currency], currency);
    })
}



const myHeaders = new Headers();
myHeaders.append("apikey", "EaLHv3yC7MKmfM98CcGKinFYDNHiNNbg");

const requestOptions = {
    method: 'GET',
    redirect: 'follow',
    headers: myHeaders
};

fetch("https://api.apilayer.com/fixer/latest?base=USD", requestOptions)
    .then(response => response.json())
    .then(result => {
        Object.assign(dataCurrency, result.rates)
        showPrice()
    })
    .catch(error => console.log('error', error));

//choices

const countryBtn = document.querySelector('.country__btn');
const countryWrapper = document.querySelector('.country__wrapper');

countryBtn.addEventListener('click', () => {
    countryWrapper.classList.toggle('country__wrapper_open')
});

countryWrapper.addEventListener('click', ({target}) => {
    if(target.classList.contains('country__choice')) {
        countryWrapper.classList.remove('country__wrapper_open');
        showPrice(target.dataset.currency);
    }
});

//timer

const timer = (deadline) => {
    const unitDay = document.querySelector('.timer__unit_day')
    const unitHour = document.querySelector('.timer__unit_hour')
    const unitMin = document.querySelector('.timer__unit_min')

    const getTimeRemaining = () => {
        const dateStop = new Date(deadline).getTime();
        const dateNow = Date.now();
        const timeRemaining = dateStop - dateNow;

        // const ms = timeRemaining;
        // const s = timeRemaining / 1000 %60;
        const min = Math.floor(timeRemaining / 1000 / 60 % 60);
        const hour = Math.floor(timeRemaining / 1000 / 60 / 60 % 24);
        const day = Math.floor(timeRemaining / 1000 / 60 / 60 / 24);

        return { timeRemaining, min, hour, day };
    };
    
    const start = () => {
        const timer = getTimeRemaining();
        console.log('timer: ', timer)

        unitDay.textContent = timer.day;
        unitHour.textContent = timer.hour;
        unitMin.textContent = timer.min;

        const timerID= setTimeout(start, 60000);
    }

    start();
};

timer('2023/09/07 20:00');