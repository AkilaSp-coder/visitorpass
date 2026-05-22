emailjs.init("GfVsTCpK0y85WfqZS");

let visitors =
JSON.parse(localStorage.getItem("visitors"))
|| [];

displayVisitors();

document.getElementById("visitorForm")
.addEventListener("submit", function(event){

event.preventDefault();

let name =
document.getElementById("name").value;

let email =
document.getElementById("email").value;

let purpose =
document.getElementById("purpose").value;

let visitor = {
id: Date.now(),
name: name,
email: email,
purpose: purpose
};

visitors.push(visitor);

localStorage.setItem(
"visitors",
JSON.stringify(visitors)
);

displayVisitors();

sendEmail(visitor);

document.getElementById("visitorForm")
.reset();

});

function displayVisitors(){

let table =
document.getElementById("visitorTable");

table.innerHTML = "";

visitors.forEach(function(visitor){

table.innerHTML += `

<tr>

<td>${visitor.id}</td>

<td>${visitor.name}</td>

<td>${visitor.email}</td>

<td>${visitor.purpose}</td>

</tr>

`;

});

}

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

alert("Mail Sent Successfully!");

})
.catch(function(error){

alert("Mail Failed!");

console.log(error);

});

}