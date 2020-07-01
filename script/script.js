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

  menu.addEventListener('click', (event) => {
 
    let target = event.target;
        target = target.closest('.active-menu');
    if(target){

      if(event.target === closeBtn){
        handlerMenu();
      }

      menuItems.forEach((item) => {
        if(item === event.target.closest('li')){
        handlerMenu();
        }
      });
    }
  });

};

toggleMenu();

//Popup
const togglePopup = () => {
  const popup = document.querySelector('.popup'),
        popupBtn = document.querySelectorAll('.popup-btn'),
        popupContent = document.querySelector('.popup-content');
    
  let requesInterval,
      count = 280;
          
  popupContent.style.transform = `translateX(-280%)`;
  
  const popupOnAnimate = () => {

    count -= 10;
    if(count >= 0 ){
    requesInterval = requestAnimationFrame(popupOnAnimate);
    popupContent.style.transform = `translateX(-${count}%)`;
    }else{
      cancelAnimationFrame(requesInterval);
    }
  };

  const popupOffAnimate = () => {

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

  popup.addEventListener('click', (event) =>{
    let target = event.target;

    if(target.classList.contains('popup-close')){
      if(document.documentElement.scrollWidth > 768){
          requestAnimationFrame(popupOffAnimate);
        }else{
          popup.style.display = 'none';
        }
      } else {
          target = target.closest('.popup-content');
          if(!target){
            if(document.documentElement.scrollWidth > 768){
              requestAnimationFrame(popupOffAnimate);
            }else{
              popup.style.display = 'none';
            }
          }
      }


  });
};

togglePopup();

//slowScroll
const slowScroll = () => {

  const menu = document.querySelector('menu'),
        menuItems = menu.querySelectorAll('ul>li'),
        serviceBlockBtn = document.querySelectorAll('main>a');

  let requestInterval,
      y,
      count = 0;

  const scrollToId = () => {
    
    count = document.documentElement.scrollTop;
    requestInterval = requestAnimationFrame(scrollToId);
    
    if(y > count + 30){
      count += 30;
      document.documentElement.scrollTop = count;
    } else if(y < count - 30){
      count -= 30;
      document.documentElement.scrollTop = count;
    } else {
      cancelAnimationFrame(requestInterval);
    }
    
  };

  menuItems.forEach((elem) => elem.addEventListener('click', function(event){

    event.preventDefault();

    const idToScroll = document.getElementById(`${((event.target.href).split('#')[1])}`);
    y = Math.ceil((idToScroll.getBoundingClientRect()).y) + document.documentElement.scrollTop;

    requestAnimationFrame(scrollToId);
  }));

  serviceBlockBtn[0].addEventListener('click', function(event){

    event.preventDefault();

    y = Math.ceil((document.getElementById('service-block').getBoundingClientRect()).y);
    y += document.documentElement.scrollTop;

    requestAnimationFrame(scrollToId);
  });
};

slowScroll();

//Tabs
const tabs = () => {
  const tabHeader = document.querySelector('.service-header'),
        tab = document.querySelectorAll('.service-header-tab'),
        tabContent = document.querySelectorAll('.service-tab');

  const toggleTabContent = (index) => {
    for(let i = 0; i < tabContent.length; i++){
      if(index === i){
        tab[i].classList.add('active');
        tabContent[i].classList.remove('d-none');
      } else {
        tab[i].classList.remove('active');
        tabContent[i].classList.add('d-none');
      }
    }
  };
        
  tabHeader.addEventListener('click', (event) => {
    let target = event.target;
        target = target.closest('.service-header-tab');

    if(target){
      tab.forEach((item, i) => {

          if(item === target){
          toggleTabContent(i);
        }
      });
    }
  });
};

tabs();

});
