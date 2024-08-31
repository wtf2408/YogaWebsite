const burger = document.querySelector(".header_burger");
const menu = document.querySelector(".header_menu");
const signUpButtons = document.querySelectorAll(".sign-up_btn");
const modal = document.querySelector(".modal");
const form = document.querySelector('form');


form.addEventListener('submit', async function (event)
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
                form.reset()
            } catch (error) {
                console.error('JSON PARSING ERROR:', error);
            }

            
        } else {
            console.error('error accessing the server!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!:', error);
        }
    } catch (error) {
        console.error('error when receiving answer!!!!!!!!!!!!!!!!!!!!!!!!!!');
    }
    modal.classList.remove('open');
});



modal.addEventListener('click', (event) => {
    if (event._isClickWithInModal) return;
    modal.classList.remove('open');
    
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


