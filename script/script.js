
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

console.log(addExpenses.split(', '));

let budgetDay = money / 30;

money = prompt('Ваш месячный доход?');

addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую', 'интернет, транспорт, коммуналка');

deposit = confirm('Есть ли у вас депозит в банке?');

let expenses1 = prompt('Введите обязательную статью расходов?');

let amount1 = prompt('Во сколько это обойдется?');

let expenses2 = prompt('Введите обязательную статью расходов?');

let amount2 = prompt('Во сколько это обойдется?');


//lesson04

//Функция возвращает сумму всех обязательных расходов за месяц
function getExpensesMonth(){
  console.log('Сумма обязательных расходов за месяц ', + +amount1 + +amount2);
}

getExpensesMonth();

//Функция возвращает Накопления за месяц (Доходы минус расходы)

function getAccumulatedMonth(a, b, c){
  return a - b - c;
}

let accumulatedMonth = getAccumulatedMonth(+money, +amount1, +amount2);
console.log('Накопления за месяц ' + accumulatedMonth);

//Функция подсчитывает, за какой период будет достигнута цель накопить

const getTargetMonth = function(a, b){
  return Math.ceil(a / b);
};

period = getTargetMonth(mission, accumulatedMonth);
console.log('Цель накопить будет достигнута за ' + period + 'месяцев');


budgetDay = accumulatedMonth / 30;
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