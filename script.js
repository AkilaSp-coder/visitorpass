/* EMAIL JS */

emailjs.init("GfVsTCpK0y85WfqZS");

/* GET DATA */

let visitors =
JSON.parse(localStorage.getItem("visitors")) || [];

/* SHOW TABLE */

window.onload = function () {

displayVisitors();

};

/* FORM SUBMIT */

let form =
document.getElementById("visitorForm");

if(form){

form.addEventListener("submit", function(event){

event.preventDefault();

/* VALUES */

let name =
document.getElementById("name").value;

let email =
document.getElementById("email").value;

let purpose =
document.getElementById("purpose").value;

/* OBJECT */

let visitor = {

id: Date.now(),

name: name,

email: email,

purpose: purpose,

status: "Pending"

};

/* SAVE */

visitors.push(visitor);

localStorage.setItem(
"visitors",
JSON.stringify(visitors)
);

/* EMAIL */

sendEmail(visitor);

/* SOUND */

let sound =
document.getElementById("notifySound");

if(sound){

sound.play();

}

/* POPUP */

alert(
"Visitor Request Submitted Successfully"
);

/* RESET */

form.reset();

});

}

/* DISPLAY TABLE */

function displayVisitors(){

let table =
document.getElementById("visitorTable");

if(!table){

return;

}

table.innerHTML = "";

/* LOOP */

visitors.forEach(function(visitor){

let row = `

<tr>

<td>${visitor.id}</td>

<td>${visitor.name}</td>

<td>${visitor.email}</td>

<td>${visitor.purpose}</td>

<td>${visitor.status}</td>

</tr>

`;

table.innerHTML += row;

});

}

/* SEND EMAIL */

function sendEmail(visitor){

let params = {

name: visitor.name,

email: visitor.email,

purpose: visitor.purpose

};

emailjs.send(

"service_9wpgbu9",

"template_s3sx5q5",

params

)

.then(function(){

console.log("Mail Sent");

})

.catch(function(error){

console.log(error);

});

}