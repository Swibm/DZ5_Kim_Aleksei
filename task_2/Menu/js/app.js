// 1)сделать слайдер автоматическим и добавить анимации к картинкам 

const tabs = document.querySelectorAll(".tabheader__item")
const tabsParent = document.querySelector(".tabheader__items")
const tabsContent = document.querySelectorAll(".tabcontent")
let counter = 0

const autoSlider = () => {
    tabsContent.forEach((item) => {
        item.style.display = "none"
    })
    tabs.forEach((item) => {
        item.classList.remove("tabheader__item_active")
    })
    
    if(counter<=3) {
        tabsContent[counter].style.display = "block"
        tabs[counter].classList.add("tabheader__item_active")
        counter++
    }
    else {
        counter = 0
        tabsContent[counter].style.display = "block"
        tabs[counter].classList.add("tabheader__item_active")
        counter++
    }
    setTimeout(autoSlider, 3000)
}

autoSlider()

//Вызов модалки по нажатию

const modalTrigger = document.querySelector(".btn_white")

const modal = document.querySelector(".modal")

const modalCLoseBtn = document.querySelector(".modal__close")

const openModal = () => {
    modal.classList.add("show")
    modal.classList.remove("hide")
    document.body.style.overflow = "hidden"
}

const closeModal = () => {
    modal.classList.add("hide")
    modal.classList.remove("show")
    document.body.style.overflow =""
}

modalTrigger.addEventListener("click", openModal)
modalCLoseBtn.addEventListener("click", closeModal)

modal.addEventListener("click", (e) => {
    if(e.target.classList.contains("modal")) {
        closeModal()
    }
})

//dz2 открывать модальное окно как только пользователь будет доскроливать до конца сайта

const openModalEndOfSite = () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
        modal.classList.add("show");
        modal.classList.remove("hide");
        document.body.style.overflow = "hidden";
        window.scrollBy(0, -300);
    }
};

window.addEventListener("scroll", openModalEndOfSite)

const forms = document.querySelectorAll("form")

const postData = (form) => {
    form.addEventListener("submit", (e) => {
        e.preventDefault()

        const request = new XMLHttpRequest()
        request.open("POST", "server.php")
        request.setRequestHeader("Content-Type", "application/json")

        const formData = new FormData(form)
        console.log(formData)

        const obj = {}

        formData.forEach((item, name)=> {obj[name] = item})

        const json = JSON.stringify(obj)

        request.send(json)
        request.addEventListener("load", () => {
            if(request.status === 200){
                btnSubmit = document.querySelector(".btn_recall")
                btnSubmit.style.backgroundColor = "green"
                btnSubmit.innerHTML = "Успешно!"
            }
            else {
                btnSubmit = document.querySelector(".btn_recall")
                btnSubmit.style.backgroundColor = "red"
                btnSubmit.innerHTML = "Произошла ошибка"
            }
        })

    })
}

forms.forEach((item) => {
    postData(item)
})

//dz2 выводить сообщение на экран. Если статус 200, то выводить сообщение, что все ок после отправки объекта