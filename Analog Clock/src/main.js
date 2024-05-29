const sec=document.querySelector(".s");
const min=document.querySelector(".m");
const hour=document.querySelector(".h");
const notification=document.getElementById("notification");




setInterval(()=>{
 
let time=new Date();
let currentSec=time.getSeconds();
let currentMin=time.getMinutes();
let currentHourc=time.getHours();

sec.style.transform=`rotate(${clock(60, currentSec )}deg)`;
min.style.transform=`rotate(${clock(60, currentMin )}deg)`;
hour.style.transform=`rotate(${clock(12, currentHourc )}deg)`;


},1000);



function clock(time, current){
    return (360*current)/time;
} 

