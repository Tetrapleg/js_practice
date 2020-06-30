window.addEventListener('DOMContentLoaded', function(){
  'use strict';

  const h2 = document.createElement('h2');
  document.querySelector('body').append(h2);

  function getHiUser(){
    const weekArr = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'],
          day = weekArr[new Date().getDay()],
          hours = new Date().getHours(),
          newYear = new Date('31 december 2020').getTime(),
          dateNow = new Date().getTime(),
          timeNow = new Date().toLocaleTimeString('en'),
          timeRemining = Math.floor((newYear - dateNow) / 1000 / 3600 /24);

    function chengeHiString(){
      if (hours <= 6) {
        return 'Доброй ночи';
      } else if (hours > 6 && hours <= 12) {
        return 'Доброе утро';
      } else if (hours > 12 && hours <=18) {
        return ('Добрый день');
      } else if (hours > 18 && hours < 24) {
        return ('Добрый вечер');
      }
    }

    function chengeDayToNewYear(){
      if (timeRemining > 10 && timeRemining < 15) {
        return 'дней';
      } else if (timeRemining % 10 === 1) {
        return 'день';
      } else if (timeRemining % 10 > 1 && timeRemining % 10 < 5) {
        return 'дня';
      } else {
        return 'дней';
      }
    }

    function enterStrings(){
      h2.innerHTML = `${chengeHiString()}</br>
      Сегодня: ${day}</br>
      Текущее время: ${timeNow}</br>
      До нового года осталось ${timeRemining} ${chengeDayToNewYear()}`;
    }

    enterStrings();

  }

  setInterval(getHiUser, 1000);

});