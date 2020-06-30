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

 countTimer('21 july 2020');

 //Menu
const toggleMenu = () =>{

  const btnMenu = document.querySelector('.menu'),
        menu = document.querySelector('menu'),
        closeBtn = document.querySelector('.close-btn'),
        menuItems = menu.querySelectorAll('ul>li');

  const handlerMenu = () => {
    menu.classList.toggle('active-menu');
  };
  btnMenu.addEventListener('click', handlerMenu);
  closeBtn.addEventListener('click', handlerMenu);

  menuItems.forEach((elem) => elem.addEventListener('click', handlerMenu));

};

toggleMenu();

//Popup
const togglePopup = () => {
  const popup = document.querySelector('.popup'),
        popupBtn = document.querySelectorAll('.popup-btn'),
        popupClose = document.querySelector('.popup-close'),
        popupContent = document.querySelector('.popup-content');
    
  let requesInterval,
      count = 280;
          
  popupContent.style.transform = `translateX(-280%)`;
  
  const popupOnAnimate = function(){

    count -= 10;
    if(count >= 0 ){
    requesInterval = requestAnimationFrame(popupOnAnimate);
    popupContent.style.transform = `translateX(-${count}%)`;
    }else{
      cancelAnimationFrame(requesInterval);
    }
  };

  const popupOffAnimate = function(){

    count += 10;
    if(count <= 280){
      requesInterval = requestAnimationFrame(popupOffAnimate);
      popupContent.style.transform = `translateX(-${count}%)`;
    }else{
      cancelAnimationFrame(requesInterval);
      popup.style.display = 'none';
    }
  };
    
  popupBtn.forEach((elem) => {
    elem.addEventListener('click', () => {
      if(document.documentElement.scrollWidth > 768){
        popup.style.display = 'block';
        requestAnimationFrame(popupOnAnimate);
      }else{
        popupContent.style.transform = `translateX(0)`;
        popup.style.display = 'block';
      }
    });
  });

  popupClose.addEventListener('click', () => {
    if(document.documentElement.scrollWidth > 768){
      requestAnimationFrame(popupOffAnimate);
    }else{
      popup.style.display = 'none';
    }
  });
};

togglePopup();

});
