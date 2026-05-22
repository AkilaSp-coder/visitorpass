/* EMAIL JS */

emailjs.init("GfVsTCpK0y85WfqZS");

/* GET DATA */

let visitors =
JSON.parse(localStorage.getItem("visitors")) || [];

/* GET STATUS FROM URL */

const params =
new URLSearchParams(window.location.search);

const status =
params.get("status");

/* UPDATE STATUS */

if(status){

if(visitors.length > 0){

visitors[visitors.length - 1].status = status;

localStorage.setItem(
"visitors",
JSON.stringify(visitors)
);

}

/* POPUP */

alert(
"Visitor " + status + " Successfully"
);

/* REDIRECT */

window.location.href =
"visitors.html";

}

/* PAGE LOAD */

window.onload = function(){

displayVisitors();

};

/* FORM SUBMIT */

let form =
document.getElementById("visitorForm");

if(form){

form.addEventListener("submit", function(event){

event.preventDefault();

/* GET VALUES */

let name =
document.getElementById("name").value;

let email =
document.getElementById("email").value;

let purpose =
document.getElementById("purpose").value;

/* CREATE OBJECT */

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

/* SEND EMAIL */

sendEmail(visitor);

/* SOUND */

let sound =
document.getElementById("notifySound");

if(sound){

sound.play();

}

/* SUCCESS */

alert(
"Visitor Request Submitted Successfully"
);

/* RESET */

form.reset();

/* REFRESH TABLE */

displayVisitors();

});

}

/* DISPLAY TABLE */

function displayVisitors(){

let table =
document.getElementById("visitorTable");

if(!table){

return;

}

/* CLEAR TABLE */

table.innerHTML = "";

/* GET UPDATED DATA */

visitors =
JSON.parse(localStorage.getItem("visitors")) || [];

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