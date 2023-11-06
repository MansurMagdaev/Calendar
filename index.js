const body = document.querySelector('body');
const dayWeek = document.querySelector('.day_week');
const days = document.querySelector('.days');
const month = document.querySelector('.month_sp');
const prevMonth = document.querySelector('.prev_btn');
const nextMonth = document.querySelector('.next_btn');
const year = document.querySelector('.choose_year');
const years = document.querySelector('.years');
const prevYear = document.querySelector('.prev_years');
const nextYear = document.querySelector('.next_years');
const selectedYear = document.querySelector('.selected_year');
const modal = document.querySelector('.modal_years');
const modalReminder = document.querySelector('.modal-reminder');
const closeModal = document.querySelector('.close_modal');
const confirmModal = document.querySelector('.confirm_modal');


const arrMonth = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];
const arrDayWeek = ['Пнд', 'Втр', 'Срд', 'Чтв', 'Птн', 'Сбт', 'Вск'];

let data = new Date();
let numMonth = data.getMonth();
let dataYear = data.getFullYear();
selectedYear.textContent = dataYear;


selectedYear.addEventListener('click', function() {
    modal.classList.toggle('active_modal');
})


;(function() {

    let numYear = 2020;
    years.textContent = `${numYear}-${numYear + 10}`;

    prevYear.addEventListener('click', () => {
        years.textContent = `${numYear - 10}-${numYear}`;
        numYear = numYear - 10;
        renderListYears();
    })

    nextYear.addEventListener('click', () => {
        numYear = numYear + 10;
        years.textContent = `${numYear}-${numYear + 10}`;
        renderListYears();
    })


    function renderListYears() {
        year.textContent = '';
        let counter = numYear;

        for (let i = 0; i <= 10; i++) {
            let span = document.createElement('span');
            span.textContent = counter++;

            span.addEventListener('click', function() {

                dataYear = this.textContent;
                selectedYear.textContent = this.textContent;
                modal.classList.toggle('active_modal');
                renderMonth();
            });

            year.appendChild(span);
        }
    }

    renderListYears();    
})();


prevMonth.addEventListener('click', renderMonth);
nextMonth.addEventListener('click', renderMonth);


function renderMonth() {

    if (this.className == 'prev_btn' && numMonth >= 0) {
        numMonth = --numMonth;

        if (numMonth == -1) {

            numMonth = 11;
            selectedYear.textContent = --dataYear;
        }

    } else if (this.className == 'next_btn' && numMonth < 12) {

        numMonth = ++numMonth;

        if (numMonth == 12) {

            numMonth = 0;
            selectedYear.textContent = ++dataYear;
        }
    }

    month.textContent = arrMonth[numMonth];
    renderDays()
};

renderMonth();


;(function() {


    for (let i = 0; i < arrDayWeek.length; i++) {

        let day = document.createElement('span');

        day.textContent = arrDayWeek[i];
        dayWeek.appendChild(day);

    }
})()

function counterDays() {
    let dayData = new Date(dataYear, numMonth, 31);
    
    if (dayData.getDate() == 1) {
        return 30;
    } else if (dayData.getDate() == 2) {
        return 29;
    } else if (dayData.getDate() == 3) {
        return 28;
    } else {
        return 31;
    }
}

function renderDays() {

    let table = document.createElement('table');
    let dataWeek = new Date(dataYear, numMonth);
    let counter = 0;
    let dayNum = 1;


    for (let i = 0; i < 6; i++) {

        let tr = document.createElement('tr');

        for (let j = 0; j < 7; j++) {

            let td = document.createElement('td');
            counter++;

            if (counter >= dataWeek.getDay() && dayNum <= counterDays()) {

                if (numMonth >= data.getMonth() && dataYear >= data.getFullYear()) {
                    td.addEventListener('click', openModal);
                }


                if (dayNum == data.getDate() && data.getMonth() == numMonth && data.getFullYear() == dataYear) {
                    td.textContent = dayNum++;
                    td.classList.add('active');
                } else {
                    td.textContent = dayNum++;
                }
            }
            tr.appendChild(td);
        }

        table.appendChild(tr);
    }

    days.textContent = '';
    days.appendChild(table);
};
renderDays();


// -----------------Модальное окно напоминалки----------

closeModal.addEventListener('click', close);

confirmModal.addEventListener('click', function() {
    localStorage.setItem(modalReminder.getAttribute('name'), modalReminder.value);
    close();
})

function openModal() {
    let key = `${this.textContent}.${numMonth}.${dataYear}`;

    modalReminder.classList.remove('modal_reminder_deactive');
    closeModal.classList.remove('modal_reminder_deactive');
    confirmModal.classList.remove('modal_reminder_deactive');
    modalReminder.setAttribute('name', key);

    if (localStorage.getItem(key)) {

        modalReminder.value = localStorage.getItem(key);
    }
};

function close() {
    modalReminder.classList.add('modal_reminder_deactive');
    closeModal.classList.add('modal_reminder_deactive');
    confirmModal.classList.add('modal_reminder_deactive');
    modalReminder.value = '';
}

body.addEventListener('click', function() {
    if (!event.target.matches('td')
        && !event.target.matches('.modal-reminder')) {
        close()
    }
    if (!event.target.matches('.selected_year') 
        && !event.target.matches('.prev_years') 
        && !event.target.matches('.next_years')) {

        modal.classList.remove('active_modal');
    }

})


function firstNonRepeatingLetter(s) {
    // Add your code here
    let res = s.toUpperCase();
    
    for (let i = 0; i < res.length; i++) {
      let character = res[i];
      let str = res.split('').reduce((acc, elem) => {

        if (character == elem) {
            acc += elem;
        }
        return acc;
    }, '');

        if (str.length == 1) {
            return s[i];
        }
    }
    return 'None';
};


