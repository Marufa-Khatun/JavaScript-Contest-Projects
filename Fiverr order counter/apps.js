const fiverr_order=document.getElementById("fiverr_order");
const counter=document.querySelector(".counter");


fiverr_order.addEventListener('submit', function(e){
    e.preventDefault();

    let date=this.querySelector('input[type="date"]').value;
    let time=this.querySelector('input[type="time"]').value;

    

   

  setInterval(()=>{

    let start_time= new Date();
    let end_time=new Date(date + ' ' + time);

    let time_diff=Math.floor(Math.abs(end_time.getTime()-start_time.getTime()));


    let totalSec=Math.floor(time_diff/1000);
    let totalMin=Math.floor(totalSec/60);
    let totalHour=Math.floor(totalMin/60);
    let totalDay=Math.floor(totalHour/24);

  


    let hour = totalHour - (totalDay * 24);
    let min = totalMin - (totalDay * 24 * 60)-(hour*60);
    let sec = totalSec - (totalDay * 24 * 60 * 60)-(hour * 60 * 60)-(min * 60 );

    counter.innerHTML=`${totalDay > 9 ? totalDay: '0' + totalDay} : ${hour > 9 ? hour: '0' + hour} : ${min > 9 ? min: '0' + min} : ${sec > 9 ? sec: '0' + sec}`;

  },1000);
});