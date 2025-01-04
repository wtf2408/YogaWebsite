const dayHeader = document.getElementById('day__header');
const teacherHeader = document.getElementById('teacher__header');
const daysBody = document.getElementsByClassName('day__body');
const teachersBody = document.getElementsByClassName('teacher__body');


const mediaQuery = window.matchMedia("(max-width: 768px)");
const lessonsCount = {
    'ПН': 2,
    'ВТ': 2,
    'СР': 2,
    'ЧТ': 2,
    'ПТ': 1,
    'СБ': 1,
}
function handleMediaQueryChange(event) {
    if (event.matches) {
        console.log("Ширина экрана меньше или равна 768px");
        dayHeader.style.display = "none"
        teacherHeader.style.display = "none"
        for (let i = 0; i < daysBody.length; i++) {
            daysBody[i].setAttribute('rowspan', '1');
            daysBody[i].setAttribute('colspan', '2');
        }
        for (let j = 0; j < teachersBody.length; j++) {
            teachersBody[j].style.display = "none";
        }
    }
    else {
        console.log("Ширина экрана больше 768px");
        dayHeader.style.display = "table-cell"
        teacherHeader.style.display = "table-cell"

        for (let i = 0; i < daysBody.length; i++) {
            daysBody[i].setAttribute('rowspan', `${lessonsCount[daysBody[i].innerText]+1}`);
            daysBody[i].setAttribute('colspan', '1');
        }
        for (let j = 0; j < teachersBody.length; j++) {
            teachersBody[j].style.display = "table-cell";
        }
    }
}

// Инициализация
handleMediaQueryChange(mediaQuery);

// Добавление слушателя событий для отслеживания изменений ширины
mediaQuery.addEventListener("change", handleMediaQueryChange);


