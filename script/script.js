

'use strict';

let isNumber = function(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
};

let money,
    start = function() {
      do {
        money = prompt('Ваш месячный доход?');
      }
      while(!isNumber(money));
    };

start();

let appData = {
  income: {},
  addIncome: [],
  expenses: {},
  addExpenses: [],
  deposit: false,
  mission: 50000,
  period: 3,
  budget: money,
  budgetDay: 0,
  budgetMonth: 0,
  expensesMonth: 0,
  asking: function(){
    appData.addExpenses = prompt('Перечислите возможные расходы через запятую');
          appData.addExpenses = appData.addExpenses.toLowerCase().split(', ');
          appData.deposit = confirm('Есть ли у Вас депозит в банке?');
          for (let i = 0; i < 4; i++) {
            let question = '"' + prompt('Введите обязательную статью расходов?') + '"',
                control = prompt('Во сколько это обойдется?');
            while(!isNumber(control)) {
                control = prompt('Во сколько это обойдется?');
            } 
            appData.expenses[question] = +control;
          }
          console.log(appData.expenses);
  },
  //Функция возвращает сумму всех обязательных расходов за месяц
  getExpensesMonth: function(){
    
    let sum = 0;

    for (let key in appData.expenses) {
      sum += appData.expenses[key];
    }
    
    return sum;
  },
  //Функция возвращает Накопления за месяц (Доходы минус расходы)
  getBudget: function(){

    appData.budgetMonth = money - appData.expensesMonth;
    appData.budgetDay = appData.budgetMonth / 30;
    return; 
  },
  //Функция подсчитывает, за какой период будет достигнута цель накопить
  getTargetMonth: function(a, b){
    return Math.ceil(a / b);
  },
  getStatusIncome: function(){
    if (appData.budgetDay >= 1200) {
      return ('У вас высокий уровень дохода');
    } else if (appData.budgetDay >= 600) {
      return ('У вас средний уровень дохода');
    } else if (appData.budgetDay < 600, appData.budgetDay >= 0) {
      return ('К сожалению у вас уровень дохода ниже среднего');
    } else if (appData.budgetDay < 0) {
      return ('Что-то пошло не так');
    }
  },
};

appData.asking();

appData.expensesMonth = appData.getExpensesMonth();
console.log('Расходы за месяц: ' + appData.expensesMonth);

appData.getBudget();
console.log('Накопления за месяц ' + appData.budgetMonth);

appData.period = appData.getTargetMonth(appData.mission, appData.budgetMonth);

//Если getTargetMonth возвращает нам отрицательное значение!!!!!!!!!!!!!!!!!!!!
if (appData.period <= 0) {
  console.log('Цель накопить не будет достигнута!');
} else{
  console.log('Цель накопить будет достигнута за ' + appData.period + ' месяцев');
}

console.log(appData.getStatusIncome());

console.log('Наша программа включает в себя данные:');

for (let key in appData){
  console.log(key + ': ' + appData[key]);
}
