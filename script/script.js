


'use strict';

let isNumber = function(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
};

let money,
    start = function() {
      do {
        money = prompt('Ваш месячный доход?', 50000);
      }
      while(!isNumber(money));
    };

start();

let appData = {
  budget: money,  
  budgetDay: 0,
  budgetMonth: 0,
  income: {},
  addIncome: [],
  expenses: {},
  addExpenses: [],
  expensesMonth: 0,
  percentDeposit: 0,
  moneyDeposit: 0,
  deposit: false,
  mission: 50000,
  period: 3,
  asking: function(){

          if (confirm('Есть ли у Вас дополнительный источник заработка?')) {

            let itemIncome = prompt('Какой у Вас дополнительный заработок?', 'Таксую');
              while (!isNaN(itemIncome) || itemIncome === '' || itemIncome === null) {
                itemIncome = prompt('Введите корректные данные, например: "Таксую"');
              }

            let cashIncome = prompt('Сколько в месяц Вы на этом зарабатываете?', 10000);
              while(!isNumber(cashIncome)) {
                cashIncome = prompt('Во сколько это обойдется? (введите число)');
              } 
            appData.income[itemIncome] = cashIncome;
          }

          let addExpenses = prompt('Перечислите возможные расходы через запятую');
          if (addExpenses === '' || isNumber(addExpenses)) {
            while (addExpenses === '' || isNumber(addExpenses)) {
              addExpenses = prompt('Введите возможные расходы (если число, введите прописью), или нажмите "Отмена"');
            }
          } else if (addExpenses !== null) {
            appData.addExpenses = addExpenses.toLowerCase().split(',');
          }

          //Пересоздаём массив с заглавными буквами
          appData.addExpenses.forEach(function (item, i) {

            item = item.trim();
            item = item[0].toUpperCase() + item.slice(1);
            appData.addExpenses[i] = item;
          });
      
          appData.deposit = confirm('Есть ли у Вас депозит в банке?');
          for (let i = 0; i < 4; i++) {

            let itemExpenses = prompt('Введите обязательную статью расходов?', 
            "Садик Государственный");
            while (!isNaN(itemExpenses) || itemExpenses === '' || itemExpenses === null) {
              itemExpenses = prompt('Введите корректные днные, например: "Садик Государственный"');
            }

            let cashExpenses = prompt('Во сколько это обойдется?');
            while(!isNumber(cashExpenses)) {
                cashExpenses = prompt('Во сколько это обойдется?');
            } 
            appData.expenses[itemExpenses] = cashExpenses;
          }
          console.log(appData.expenses);
  },
  //Функция возвращает сумму всех обязательных расходов за месяц
  getExpensesMonth: function () {
    for (let key in appData.expenses) {
      appData.expensesMonth += +appData.expenses[key];
    }
  },
  //Функция возвращает Накопления за месяц (Доходы минус расходы)
  getBudget: function () {
    appData.budgetMonth = appData.budget - appData.expensesMonth;
    appData.budgetDay = Math.floor(appData.budgetMonth / 30);
  },
  //Функция подсчитывает, за какой период будет достигнута цель накопить
  getTargetMonth: function () {
    return appData.mission / appData.budgetMonth;
  },
  getStatusIncome: function () {
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
  getInfoDeposit: function () {
    if (appData.deposit) {

      appData.percentDeposit = prompt('Какой годовой процент?', '10');
        while(!isNumber(appData.percentDeposit)) {
          appData.percentDeposit = prompt('Какой годовой процент? (введите число)');
        } 
      appData.moneyDeposit = prompt('Какая сумма заложена?', 10000);
        while(!isNumber(appData.percentDeposit)) {
          appData.percentDeposit = prompt('Какая сумма заложена? (введите число)');
        } 
    }
  },
  calcSaveMoney: function () {
    return appData.budgetMonth * appData.period;
  }
};

appData.asking();
appData.getExpensesMonth();
appData.getBudget();

console.log('Расходы за месяц: ' + appData.expensesMonth);

//Если getTargetMonth возвращает нам отрицательное значение!!!!!!!!!!!!!!!!!!!!
if (appData.getTargetMonth() > 0) {
  console.log('Цель накопить будет достигнута за ' + Math.ceil(appData.getTargetMonth()) + ' месяцев');
} else{
  console.log('Цель накопить не будет достигнута!');
}

console.log(appData.getStatusIncome());

console.log();

for (let key in appData){
  console.log('Наша программа включает в себя данные: ' + key + ' - ' + appData[key]);
}

console.log(appData.addExpenses.join(', '));
appData.getInfoDeposit();
console.log(appData.percentDeposit, appData.moneyDeposit, appData.calcSaveMoney());