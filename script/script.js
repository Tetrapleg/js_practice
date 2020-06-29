window.addEventListener('DOMContentLoaded', function(){
  'use strict';

 //Timer
 function countTimer(deadline){
    let timeHours = document.getElementById('timer-hours'),
        timeMinutes = document.getElementById('timer-minutes'),
        timeSeconds = document.getElementById('timer-seconds');

  function getTimeRemining(){
    let dateStop = new Date(deadline).getTime(),
        dateNow = new Date().getTime(),
        timeRemaining = (dateStop - dateNow) / 1000,
        seconds = Math.floor(timeRemaining % 60),
        minutes = Math.floor((timeRemaining / 60) % 60),
        hours = Math.floor((timeRemaining / 60) / 60);
        return {timeRemaining, hours, minutes, seconds};
  }

  let idInterval;

  function updateClock(){
    let timer = getTimeRemining();

    function setNull(data){
      if (data < 10) {
        return `0${data}`;
      } else {
        return data;
      }
    }

    timeHours.textContent = setNull(timer.hours);
    timeMinutes.textContent = setNull(timer.minutes);
    timeSeconds.textContent = setNull(timer.seconds);

    if(timer.timeRemaining > 0){
    return;
    } else {
      clearInterval(idInterval);
      timeHours.textContent = timeMinutes.textContent = timeSeconds.textContent = '00';
    }
  }

   idInterval = setInterval(updateClock, 1000);

 } 

 countTimer('01 july 2020');

});
