/* EMAIL JS */

emailjs.init("GfVsTCpK0y85WfqZS");

/* VISITORS */

let visitors =
JSON.parse(localStorage.getItem("visitors"))
|| [];

/* URL PARAMS */

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

/* SAVE */

localStorage.setItem(
"visitors",
JSON.stringify(visitors)
);

/* ALERT */

alert(
"Visitor " + status + " Successfully"
);

}

/* PAGE LOAD */

window.onload = function(){

displayVisitors();

updateBell();

};

/* CAMERA ELEMENTS */

const video =
document.getElementById("camera");

const canvas =
document.getElementById("canvas");

const preview =
document.getElementById("preview");

const captureBtn =
document.getElementById("captureBtn");

const openCameraBtn =
document.getElementById("openCameraBtn");

/* IMAGE VARIABLE */

let capturedImage = "";

let stream;

/* OPEN CAMERA */

if(openCameraBtn){

openCameraBtn.addEventListener("click", async function(){

try{

stream =
await navigator.mediaDevices.getUserMedia({

video:true

});

/* SHOW CAMERA */

video.style.display =
"block";

captureBtn.style.display =
"block";

/* STREAM */

video.srcObject =
stream;

}
catch(error){

console.log(error);

alert(
"Camera Access Denied"
);

}

});

}

/* TAKE PHOTO */

if(captureBtn){

captureBtn.addEventListener("click", function(){

canvas.width =
video.videoWidth;

canvas.height =
video.videoHeight;

const context =
canvas.getContext("2d");

context.drawImage(

video,
0,
0,
canvas.width,
canvas.height

);

/* COMPRESSED IMAGE */

capturedImage =
canvas.toDataURL("image/jpeg",0.2);

/* PREVIEW */

preview.src =
capturedImage;

preview.style.display =
"block";

/* STOP CAMERA */

if(stream){

stream.getTracks().forEach(function(track){

track.stop();

});

video.srcObject = null;

video.style.display =
"none";

captureBtn.style.display =
"none";

}

});

}

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

/* PHOTO CHECK */

if(!capturedImage){

alert(
"Please Take Photo"
);

return;

}

/* VISITOR OBJECT */

let visitor = {

id: Date.now(),

name: name,

email: email,

purpose: purpose,

status: "Pending",

photo: capturedImage

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

preview.style.display =
"none";

capturedImage = "";

/* UPDATE */

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

/* REFRESH */

visitors =
JSON.parse(localStorage.getItem("visitors"))
|| [];

/* EMPTY */

if(visitors.length === 0){

table.innerHTML = `

<tr>

<td colspan="6"
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

<td>

<img
src="${visitor.photo}"
width="70"
height="70"
style="
border-radius:50%;
object-fit:cover;
border:2px solid #007bff;">

</td>

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

/* SEND EMAIL */

function sendEmail(visitor){

let params = {

name: visitor.name,

email: visitor.email,

purpose: visitor.purpose,

photo: visitor.photo,

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

console.log(
"Mail Sent Successfully"
);

})

.catch(function(error){

console.log(error);

alert(
"Mail Failed"
);

});

}