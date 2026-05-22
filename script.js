/* EMAIL JS */

emailjs.init("GfVsTCpK0y85WfqZS");

/* GET MESSAGE FROM URL */

const params =
new URLSearchParams(window.location.search);

const message =
params.get("message");

/* SHOW POPUP */

if(message){

alert(
"Visitor " + message + " Successfully"
);

}

/* FORM */

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

/* OBJECT */

let visitor = {

name: name,

email: email,

purpose: purpose

};

/* SEND EMAIL */

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

alert("Mail Failed");

});

}