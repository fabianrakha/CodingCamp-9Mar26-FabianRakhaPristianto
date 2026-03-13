// TIME & GREETING

function updateTime(){

let now = new Date();

let time = now.toLocaleTimeString();
let date = now.toLocaleDateString("id-ID", {
weekday: "long",
year: "numeric",
month: "long",
day: "numeric"
});

document.getElementById("time").textContent = time;
document.getElementById("date").textContent = date;

let hour = now.getHours();
let greeting = "";

if(hour < 11){
greeting = "Selamat Pagi";
}else if(hour < 15){
greeting = "Selamat Siang";
}else if(hour < 18){
greeting = "Selamat Sore";
}else{
greeting = "Selamat Malam";
}

document.getElementById("greeting").textContent = greeting;

}

setInterval(updateTime,1000);
updateTime();


// TIMER

let timeLeft = 1500; // 30 menit
let timer = null;

function updateTimer(){
let minutes = Math.floor(timeLeft / 60);
let seconds = timeLeft % 60;

document.getElementById("timer").textContent =
minutes + ":" + (seconds<10?"0":"") + seconds;
}

function startTimer(){
// mencegah timer berjalan lebih dari satu
// jika timer sudah berjalan jangan buat baru
if(timer !== null) return;
console.log("timer dimulai");

timer = setInterval(function(){

if(timeLeft>0){
timeLeft--;
updateTimer();
}else{
clearInterval(timer);
timer = null;
}

},1000);

}

function stopTimer(){
clearInterval(timer);
timer = null;
}

function resetTimer(){
clearInterval(timer);
timer = null;
timeLeft = 1500;
updateTimer();
}

updateTimer();


// TODO LIST

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function renderTasks(){

let list = document.getElementById("taskList");
list.innerHTML="";

tasks.forEach((task,index)=>{

let li = document.createElement("li");

li.innerHTML = `
<input type="checkbox" ${task.done?"checked":""} onchange="toggleTask(${index})">
${task.text}
<button onclick="deleteTask(${index})">Delete</button>
`;

list.appendChild(li);

});

localStorage.setItem("tasks",JSON.stringify(tasks));

}

function addTask(){

let input = document.getElementById("taskInput");

tasks.push({
text:input.value,
done:false
});

input.value="";
renderTasks();

}

function toggleTask(index){

tasks[index].done = !tasks[index].done;
renderTasks();

}

function deleteTask(index){

tasks.splice(index,1);
renderTasks();

}

renderTasks();


// QUICK LINKS

let links = JSON.parse(localStorage.getItem("links")) || [];

function renderLinks(){

let container = document.getElementById("links");
container.innerHTML="";

links.forEach((link,index)=>{

let a = document.createElement("a");

a.href = link.url;
a.textContent = link.name;
a.target="_blank";

let div = document.createElement("div");

let deleteBtn = document.createElement("button");
deleteBtn.textContent = "Hapus";

deleteBtn.onclick = function(){
links.splice(index,1);
renderLinks();
};

div.appendChild(a);
div.appendChild(deleteBtn);

container.appendChild(div);

});

localStorage.setItem("links",JSON.stringify(links));

}

function addLink(){

let name = document.getElementById("linkName").value;
let url = document.getElementById("linkURL").value;

links.push({
name:name,
url:url
});

renderLinks();

}

renderLinks();