

'use strict';

let isNumber = function(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
};

let money,
    income = 'фриланс',
    addExpenses = prompt('Перечислите возможные расходы через запятую'),
    deposit = confirm('Есть ли у Вас депозит в банке?'),
    mission = 5000,
    period = 8;

// let start = function() {
//   money = prompt('Ваш месячный доход?');

//   while(!isNumber(money)) {
//     money = prompt('Ваш месячный доход?');
//   }
// };

// start();

do {
  money = prompt('Ваш месячный доход?');
}
while(!isNumber(money));// Заменяем фунцию start циклом do-while

let showTypeOf = function(item) {
  console.log(typeof(item));
};

showTypeOf(money);
showTypeOf(income);
showTypeOf(deposit);

let expenses = [];

console.log(addExpenses.toLowerCase().split(', '));

let budgetDay = money / 30;

let expenses1, expenses2;

//Функция возвращает сумму всех обязательных расходов за месяц
let getExpensesMonth = function(){
  let sum = 0;
  let control;
  let arr = [];

  for (let i = 0; i < 4; i++) {

    expenses[i] = prompt('Введите обязательную статью расходов?');

    //Добавляем проверку, что введённые данные являются числом!!!!!!!!!
    control = prompt('Во сколько это обойдется?');
    while(!isNumber(control)) {
        control = prompt('Во сколько это обойдется?');
    }

//Проверка на нули в начале строки
    for (let i = 0; i < control.length; i++) {
      if (control - control.slice(1) != '0') {
        control = control;
        break;
      } else {
        control = control.slice(1);
      }
    }
    arr[i] = control;
    
      
    sum += +control;

    
  }
  console.log(arr);
  console.log(expenses);
  return sum;
};

let expensesAmount = getExpensesMonth();

console.log('Расходы за месяц: ' + expensesAmount);

//Функция возвращает Накопления за месяц (Доходы минус расходы)

let getAccumulatedMonth = function(){
  return money - expensesAmount;
};

let accumulatedMonth = getAccumulatedMonth();
console.log('Накопления за месяц ' + accumulatedMonth);

//Функция подсчитывает, за какой период будет достигнута цель накопить

const getTargetMonth = function(a, b){
  return Math.ceil(a / b);
};

period = getTargetMonth(mission, accumulatedMonth);

//Если getTargetMonth возвращает нам отрицательное значение!!!!!!!!!!!!!!!!!!!!
if (period <= 0) {
  console.log('Цель накопить не будет достигнута!');
} else{
  console.log('Цель накопить будет достигнута за ' + period + ' месяцев');
}



budgetDay = accumulatedMonth / 30;
console.log('Бюджет на день ' + Math.floor(budgetDay));


let getStatusIncome = function(){
    if (budgetDay >= 1200) {
      return ('У вас высокий уровень дохода');
    } else if (budgetDay >= 600) {
      return ('У вас средний уровень дохода');
    } else if (budgetDay < 600, budgetDay >= 0) {
      return ('К сожалению у вас уровень дохода ниже среднего');
    } else if (budgetDay < 0) {
      return ('Что-то пошло не так');
    }
};

console.log(getStatusIncome());
