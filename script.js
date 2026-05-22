/* =========================
   EMAIL JS
========================= */

emailjs.init("GfVsTCpK0y85WfqZS");

/* =========================
   VISITORS STORAGE
========================= */

let visitors =
JSON.parse(localStorage.getItem("visitors"))
|| [];

/* =========================
   URL PARAMS
========================= */

const params =
new URLSearchParams(window.location.search);

const status =
params.get("status");

const id =
params.get("id");

/* =========================
   UPDATE STATUS
========================= */

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

/* POPUP */

alert(
"Visitor " + status + " Successfully"
);

}

/* =========================
   PAGE LOAD
========================= */

window.onload = function(){

displayVisitors();

updateBell();

};

/* =========================
   CAMERA ELEMENTS
========================= */

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

/* IMAGE */

let capturedImage = "";

let stream = null;

/* =========================
   OPEN CAMERA
========================= */

if(openCameraBtn){

openCameraBtn.addEventListener("click", async function(){

try{

/* CHECK SUPPORT */

if(!navigator.mediaDevices ||

!navigator.mediaDevices.getUserMedia){

alert(
"Camera Not Supported"
);

return;

}

/* CAMERA */

stream =
await navigator.mediaDevices.getUserMedia({

video:true,
audio:false

});

/* SHOW CAMERA */

video.style.display =
"block";

captureBtn.style.display =
"block";

/* STREAM */

video.srcObject =
stream;

/* PLAY */

await video.play();

}
catch(error){

console.log(error);

alert(
"Please Allow Camera Permission"
);

}

});

}

/* =========================
   TAKE PHOTO
========================= */

if(captureBtn){

captureBtn.addEventListener("click", function(){

if(!stream){

alert(
"Open Camera First"
);

return;

}

/* SIZE */

canvas.width =
video.videoWidth;

canvas.height =
video.videoHeight;

/* CONTEXT */

const context =
canvas.getContext("2d");

/* DRAW */

context.drawImage(

video,
0,
0,
canvas.width,
canvas.height

);

/* IMAGE */

capturedImage =
canvas.toDataURL(
"image/jpeg",
0.3
);

/* PREVIEW */

preview.src =
capturedImage;

preview.style.display =
"block";

/* STOP CAMERA */

stream.getTracks().forEach(function(track){

track.stop();

});

/* RESET CAMERA */

video.srcObject = null;

video.style.display =
"none";

captureBtn.style.display =
"none";

stream = null;

});

}

/* =========================
   FORM SUBMIT
========================= */

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

/* CHECK PHOTO */

if(!capturedImage){

alert(
"Please Take Photo"
);

return;

}

/* OBJECT */

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

sound.currentTime = 0;

sound.play()

.then(function(){

console.log(
"Sound Played"
);

})

.catch(function(error){

console.log(
"Sound Error:",
error
);

});

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

displayVisitors();

updateBell();

});

}

/* =========================
   DISPLAY VISITORS
========================= */

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

<td colspan="7"
class="text-center text-danger fw-bold">

No Visitors Found

</td>

</tr>

`;

return;

}

/* LOOP */

visitors.forEach(function(visitor){

let statusColor = "";

if(visitor.status === "Accepted"){

statusColor = "success";

}

else if(visitor.status === "Rejected"){

statusColor = "danger";

}

else{

statusColor = "warning";

}

table.innerHTML += `

<tr class="align-middle">

<td>${visitor.id}</td>

<td>

<img
src="${visitor.photo}"
width="70"
height="70"
style="
border-radius:50%;
object-fit:cover;
border:3px solid #0d6efd;">

</td>

<td class="fw-bold">

${visitor.name}

</td>

<td>

${visitor.email}

</td>

<td>

${visitor.purpose}

</td>

<td>

<span class="badge bg-${statusColor} p-2">

${visitor.status}

</span>

</td>

<td>

<button
class="btn btn-danger btn-sm"
onclick="deleteVisitor(${visitor.id})">

🗑 Delete

</button>

</td>

</tr>

`;

});

}

/* =========================
   DELETE VISITOR
========================= */

function deleteVisitor(id){

let confirmDelete =
confirm(
"Delete this visitor?"
);

if(confirmDelete){

visitors =
visitors.filter(function(visitor){

return visitor.id !== id;

});

/* SAVE */

localStorage.setItem(

"visitors",

JSON.stringify(visitors)

);

/* REFRESH */

displayVisitors();

updateBell();

}

}

/* =========================
   BELL COUNT
========================= */

function updateBell(){

let bell =
document.getElementById("bellCount");

if(bell){

bell.innerText =
visitors.length;

}

}

/* =========================
   SEND EMAIL
========================= */

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