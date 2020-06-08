
'use strict';

let money = 2000; //"Доход за месяц"

let income = 'фриланс 500'; //"Дополнительный доход"

let addExpenses = 'интернет 100, транспорт 300, коммуналка 1000'; //"Доп. расходы"

let deposit = false;

let mission = 5000; //"Цель накопить"

let period = 8; //"Срок, за который нужно накопить"

console.log(typeof money);

console.log(typeof income);

console.log(typeof deposit);

console.log(addExpenses.length);

console.log('Период равен ' + period + ' месяцев');

console.log('Цель заработать ' + mission + ' рублей');

console.log(addExpenses.toLocaleLowerCase());

console.log(addExpenses.split(', '));

let budgetDay = money / 30;

console.log(budgetDay);

money = prompt('Ваш месячный доход?');

addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую', 'интернет, транспорт, коммуналка');

deposit = confirm('Есть ли у вас депозит в банке?');

let expenses1 = prompt('Введите обязательную статью расходов?');

let amount1 = prompt('Во сколько это обойдется?');

let expenses2 = prompt('Введите обязательную статью расходов?');

let amount2 = prompt('Во сколько это обойдется?');

let budgetMonth = +money - amount1 - amount2; //Считаем бюджет на месяц с учётом обязательных расходов

console.log('Бюджет на месяц ' + budgetMonth);

period = Math.ceil(mission / budgetMonth);

console.log('Цель будет достигнута за ' + period + ' месяцев');

budgetDay = budgetMonth / 30;

console.log('Бюджет на день ' + Math.floor(budgetDay));

if (budgetDay >= 1200) {
  console.log('У вас высокий уровень дохода');
} else if (budgetDay >= 600) {
  console.log('У вас средний уровень дохода');
} else if (budgetDay < 600, budgetDay >= 0) {
  console.log('К сожалению у вас уровень дохода ниже среднего');
} else if (budgetDay < 0) {
  console.log('Что-то пошло не так');
}



