import "./styles.css";
import defaultNav from "./hbs/Nav.hbs";
import homeTemplate from "./hbs/Home.hbs";
import LayoutTemplate from "./hbs/Layout.hbs";
import hairTemplate from "./hbs/hairstyles.hbs";
import productTemplate from "./hbs/products.hbs";
import appointmentTemplate from "./hbs/Appointment.hbs";

let bookArr = [];


try {
    const saveToLocalStorage = JSON.parse(localStorage.getItem('savedAppointments'));
    if (saveToLocalStorage) {
        bookArr = saveToLocalStorage;

    }
} catch (e) {
    //do nothing
}


console.log(bookArr);




let jsonDataHair;
fetch("../src/api/Hairstyles.json").then(function(resp) {
    return resp.json();
}).then(function(data) {
    jsonDataHair = data;
})
let jsonDataProducts;
fetch("../src/api/Products.json").then(function(resp) {
    return resp.json();
}).then(function(data) {
    jsonDataProducts = data;
})
let page = document.getElementById("app");


let state = "Home";
page.innerHTML = LayoutTemplate();
let menuEl = document.getElementById("menu");
let contentEl = document.getElementById("content");

menuEl.innerHTML = defaultNav();



let go = function(state) {
    console.log(state);
    if (state === "Home") {
        contentEl.innerHTML = homeTemplate();
    } else if (state === "Hairstyle") {
        contentEl.innerHTML = hairTemplate(jsonDataHair);
    } else if (state === "Book") {
        contentEl.innerHTML = appointmentTemplate();
        let bookButton = document.getElementById("claimButton");
        bookButton.addEventListener("click", () => {
            let wantedAppointment = document.getElementById("calendarPick").value;

            let dateDay = new Date(wantedAppointment).getDay();
            let dateMonth = new Date(wantedAppointment).getMonth();
            let dateYear = new Date(wantedAppointment).getFullYear();
            let dateTime = new Date(wantedAppointment).getTime();
            if (bookArr.includes({ dateYear, dateMonth, dateDay })) {
                window.alert("This appointment is taken");
            } else {
                bookArr.push({ dateYear, dateMonth, dateDay });
                console.log(bookArr);
                localStorage.setItem('savedAppointments', JSON.stringify(bookArr));
            }
        })
    } else if (state === "Boutique") {
        contentEl.innerHTML = productTemplate(jsonDataProducts);
    }

}
let navLinks = document.querySelectorAll(".navLink");
navLinks.forEach(element => {
    element.addEventListener("click", () => {
        go(element.dataset.link);
    })
});