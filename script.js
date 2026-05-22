/* EMAIL JS */

emailjs.init("GfVsTCpK0y85WfqZS");

/* GET VISITORS */

let visitors =
JSON.parse(localStorage.getItem("visitors"))
|| [];

/* GET URL PARAMS */

const params =
new URLSearchParams(window.location.search);

const status =
params.get("status");

const id =
params.get("id");

/* UPDATE STATUS */

if(status && id){

visitors.forEach(function(visitor){

if(visitor.id == id){

visitor.status = status;

}

});

/* SAVE UPDATED DATA */

localStorage.setItem(
"visitors",
JSON.stringify(visitors)
);

/* POPUP */

alert(
"Visitor " + status + " Successfully"
);

}

/* DISPLAY TABLE */

window.onload = function(){

displayVisitors();

updateBell();

};

/* FORM */

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

updateBell();

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

/* REFRESH DATA */

visitors =
JSON.parse(localStorage.getItem("visitors"))
|| [];

/* EMPTY */

if(visitors.length === 0){

table.innerHTML = `

<tr>

<td colspan="5"
class="text-center text-danger">

No Visitors Found

</td>

</tr>

`;

return;

}

/* LOOP */

visitors.forEach(function(visitor){

table.innerHTML += `

<tr>

<td>${visitor.id}</td>

<td>${visitor.name}</td>

<td>${visitor.email}</td>

<td>${visitor.purpose}</td>

<td>${visitor.status}</td>

</tr>

`;

});

}

/* BELL */

function updateBell(){

let bell =
document.getElementById("bellCount");

if(bell){

bell.innerText =
visitors.length;

}

}

/* EMAIL */

function sendEmail(visitor){

let params = {

name: visitor.name,

email: visitor.email,

purpose: visitor.purpose,

accept_url:
"https://visitorpass-gamma.vercel.app/?status=Accepted&id=" + visitor.id,

reject_url:
"https://visitorpass-gamma.vercel.app/?status=Rejected&id=" + visitor.id

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

alert("Mail Failed");

});

}