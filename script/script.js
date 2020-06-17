'use strict';

const books = document.querySelectorAll('.books'),
      book = document.querySelectorAll('.book'),
      body = document.querySelector('body'),
      titleBook3 = book[4].querySelector('a'),
      chapterBook2 = book[0].querySelectorAll('li'),
      chapterBook5 = book[5].querySelectorAll('li'),
      chapterBook6 = book[2].querySelectorAll('li'),
      newChapterBook6 = document.createElement('li');

//Восстановить порядок книг.
books[0].prepend(book[1]);
books[0].append(book[2]);
book[0].after(book[4]);

//Заменить картинку заднего фона
body.style.backgroundImage = 'url(image/you-dont-know-js.jpg)';

//Исправить заголовок в книге 3
titleBook3.innerHTML = 'Книга 3. this и Прототипы Объектов';

//Восстановить порядок глав во второй и пятой книге 
chapterBook2[3].after(chapterBook2[6]);
chapterBook2[6].after(chapterBook2[8]);
chapterBook2[9].after(chapterBook2[2]);

chapterBook5[1].after(chapterBook5[9]);
chapterBook5[7].after(chapterBook5[5]);

//в шестой книге добавить главу “Глава 8
newChapterBook6.textContent = 'Глава 8: За пределами ES6';
chapterBook6[8].after(newChapterBook6);




