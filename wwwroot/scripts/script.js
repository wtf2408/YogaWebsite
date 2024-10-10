const burger = document.querySelector(".header_burger");
const menu = document.querySelector(".header_menu");
const signUpButtons = document.querySelectorAll(".sign-up_btn"); // все кнопки для регистрации
const modal = document.querySelector(".modal"); // модальное окно записи на занятие
const form = document.querySelector('form'); // форма записи на занятие

form.addEventListener('submit', async function (event) // переопределение логики отправки формы
{
    event.preventDefault(); 
    const formData = new FormData(form); 

    try {
        const response = await fetch('/signup', {
            method: 'POST',
            headers: { "Accept": "application/json"},
            body: formData
        });

        if (response.ok) {

            const text = await response.text(); 
            try {
                const data = JSON.parse(text); 
                console.log('PARSED JSON FORM SERVER:', data);
            } catch (error) {
                console.error('JSON PARSING ERROR:', error);
            }

            
        } else {
            console.error('error accessing the server!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!:', error);
        }
    
    } catch (error) {
        console.error('error when receiving answer!!!!!!!!!!!!!!!!!!!!!!!!!!');
    }
    form.reset()
    setTimeout(() => {
        modal.classList.remove('open');
    }, 200);
});



const btns_more = document.getElementsByClassName("direction_btn-more") // копки "посмотреть больше" для направлений
for (let index = 0; index < btns_more.length; index++) { 
    btns_more[index].addEventListener('click', () => { 
        descrViewMore(index) // передаем номер кнопки (номер направления)
    });
    
}

const btns_more_courses = document.getElementsByClassName("courses_btn-more") // копки "посмотреть больше" для направлений
for (let index = 0; index < btns_more_courses.length; index++) { 
    btns_more_courses[index].addEventListener('click', () => { 
        coursesViewMore(index) // передаем номер кнопки (номер направления)
    });
    
}
    

modal.addEventListener('click', (event) => {
    if (event._isClickWithInModal) return;
    modal.classList.remove('open');
    form.reset()
    
})

modal.querySelector('.modal_window').addEventListener('click', event => {
    event._isClickWithInModal = true;
})
signUpButtons.forEach((signUpButton) => {
    signUpButton.addEventListener("click", () => {
        modal.classList.add("open");
    })
})
burger.addEventListener("click", () => {
    burger.classList.toggle("active");
    menu.classList.toggle("active");
})
var moreIsHidden = true


function descrViewMore(number) // показ блока описания направления, почеменного как дополнительный 
{
    var description_addtional = document.getElementsByClassName("addtional_direction")[number]
    var btn_sender = document.getElementsByClassName("direction_btn-more")[number]
    if (moreIsHidden)
    {
        btn_sender.innerText = "скрыть"
        description_addtional.style.display = "block";
        if (screen.availWidth > 760) {
            description_addtional.parentElement.parentElement.style.height = "fit-content";
        }
        description_addtional.parentElement.parentElement.style.scale = "1.05";
        moreIsHidden = false
    }
    else {
        btn_sender.innerText = "подробнее о направлении"
        description_addtional.style.display = "none";
        description_addtional.parentElement.parentElement.style.scale = "1";
        if (screen.availWidth > 760) {
            description_addtional.parentElement.parentElement.style.height = null;
        }
        moreIsHidden = true
    }
}
function coursesViewMore(number) // показ блока курсов, почеменного как дополнительный 
{
    var courses_addtional = document.getElementsByClassName("addtional_courses")[number]
    var btn_sender = document.getElementsByClassName("courses_btn-more")[number]
    if (moreIsHidden)
    {
        btn_sender.innerText = "скрыть"
        courses_addtional.style.display = "block";
        moreIsHidden = false
    }
    else {
        btn_sender.innerText = "посмотреть все"
        courses_addtional.style.display = "none";
        moreIsHidden = true
    }
}