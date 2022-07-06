var input = document.querySelector('.input_text');
var main = document.querySelector('#name');
var temp = document.querySelector('.temp');
var desc = document.querySelector('.desc');
var clouds = document.querySelector('.clouds');
var button= document.querySelector('.submit');
 
 
button.addEventListener('click', function(name){
fetch('https://api.openweathermap.org/data/2.5/weather?q='+input.value+'&appid=50a7aa80fa492fa92e874d23ad061374&units=imperial')
.then(response => response.json())
.then(data => {
 var tempValue = data['main']['temp'];
 var nameValue = data['name'];
 var descValue = data['weather'][0]['description'];
 
 main.innerHTML = nameValue;
 desc.innerHTML = "Description - "+descValue;
 temp.innerHTML = "Temp - "+tempValue;
 input.value ="";
 
})
 
.catch(err => alert("Wrong City/State name!"));
})

//Navigation bar
const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".navbar-links");
 
hamburger.addEventListener("click", mobileMenu);
 
function mobileMenu() {
hamburger.classList.toggle("active");
navMenu.classList.toggle("active");
}
const navLink = document.querySelectorAll(".link");
 
navLink.forEach(n => n.addEventListener("click", closeMenu));
 
function closeMenu() {
hamburger.classList.remove("active");
navMenu.classList.remove("active");
}

