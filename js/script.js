// ===============================
// TIME & GREETING
// ===============================

function updateTime(){

let now = new Date();

let time = now.toLocaleTimeString();

let date = now.toLocaleDateString("id-ID",{
weekday:"long",
year:"numeric",
month:"long",
day:"numeric"
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

let savedName = localStorage.getItem("username");

if(savedName){
document.getElementById("greeting").textContent =
greeting + ", " + savedName + "!";
}else{
document.getElementById("greeting").textContent = greeting;
}

}

setInterval(updateTime,1000);
updateTime();

// ===============================
// SAVE NAME
// ===============================

function saveName(){

let name = document.getElementById("nameInput").value.trim();

if(name === ""){
alert("Nama tidak boleh kosong");
return;
}

localStorage.setItem("username",name);
updateTime();

}

// ===============================
// TIMER
// ===============================

let timeLeft = 1500; // 25 menit
let timer = null;

function updateTimer(){

let minutes = Math.floor(timeLeft/60);
let seconds = timeLeft % 60;

document.getElementById("timer").textContent =
minutes + ":" + (seconds<10?"0":"") + seconds;

}

function startTimer(){

if(timer !== null) return;

timer = setInterval(function(){

if(timeLeft > 0){
timeLeft--;
updateTimer();
}else{
clearInterval(timer);
timer = null;
alert("Waktu fokus selesai!");
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

// ===============================
// TODO LIST
// ===============================

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function renderTasks(){

let list = document.getElementById("taskList");
list.innerHTML = "";

tasks.forEach((task,index)=>{

let li = document.createElement("li");

li.innerHTML = `<input type="checkbox" ${task.done?"checked":""} onchange="toggleTask(${index})">
${task.text} <button onclick="deleteTask(${index})">Hapus</button>`;

list.appendChild(li);

});

localStorage.setItem("tasks",JSON.stringify(tasks));

}

function addTask(){

let input = document.getElementById("taskInput");
let taskText = input.value.trim();

if(taskText === ""){
alert("Tugas tidak boleh kosong!");
return;
}

let duplicate = tasks.some(task => task.text === taskText);

if(duplicate){
alert("Tugas sudah ada!");
return;
}

tasks.push({
text:taskText,
done:false
});

input.value = "";
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

// ===============================
// QUICK LINKS
// ===============================

let links = JSON.parse(localStorage.getItem("links")) || [];

function renderLinks(){

let container = document.getElementById("links");
container.innerHTML = "";

links.forEach((link,index)=>{

let div = document.createElement("div");

let a = document.createElement("a");
a.href = link.url;
a.textContent = link.name;
a.target = "_blank";

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

let name = document.getElementById("linkName").value.trim();
let url = document.getElementById("linkURL").value.trim();

if(name === "" || url === ""){
alert("Nama dan URL harus diisi!");
return;
}

links.push({
name:name,
url:url
});

document.getElementById("linkName").value="";
document.getElementById("linkURL").value="";

renderLinks();

}

renderLinks();

// ===============================
// DARK MODE
// ===============================

function toggleTheme(){

document.body.classList.toggle("dark");

if(document.body.classList.contains("dark")){
localStorage.setItem("theme","dark");
}else{
localStorage.setItem("theme","light");
}

}

function loadTheme(){

let theme = localStorage.getItem("theme");

if(theme === "dark"){
document.body.classList.add("dark");
}

}

loadTheme();
