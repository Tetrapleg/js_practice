'use strict';

//Left aside
let start = document.getElementById('start'),
      btnCancel = document.getElementById('cancel'),
      btnPlus = document.getElementsByTagName('button'),
      incomePlus = btnPlus[0],
      expensesPlus = btnPlus[1],
      depositCheck = document.querySelector('#deposit-check'),
      additionalIncomeItem = document.querySelectorAll('.additional_income-item'),
      salaryAmount = document.querySelector('.salary-amount'),
      incomeTitle = document.querySelector('input.income-title'),
      expensesTitle = document.querySelector('input.expenses-title'),
      expensesItems = document.querySelectorAll('.expenses-items'),
      targetAmount = document.querySelector('.target-amount'),
      periodSelect = document.querySelector('.period-select'),
      periodAmount = document.querySelector('.period-amount'),
      additionalExpensesItem = document.querySelector('.additional_expenses-item'),
      incomeItems = document.querySelectorAll('.income-items');

//Right aside
let resultTotal = document.querySelectorAll('.result-total'),
      budgetMonthValue = resultTotal[0],
      budgetDayValue = resultTotal[1],
      expensesMonthValue = resultTotal[2],
      additionalIncomeValue = resultTotal[3],
      additionalExpensesValue = resultTotal[4],
      incomePeriodValue = resultTotal[5],
      targetMonthValue = resultTotal[6];

//Code

let isNumber = function(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
};



let appData = {
  budget: 0,  
  budgetDay: 0,
  budgetMonth: 0,
  income: {},
  incomeMonth: 0,
  addIncome: [],
  expenses: {},
  addExpenses: [],
  expensesMonth: 0,
  percentDeposit: 0,
  moneyDeposit: 0,
  deposit: false,
  start: function() {

    this.budget = +salaryAmount.value;
// console.log(this);
    this.getExpenses();
    this.getIncome();
    this.getExpensesMonth();
    this.getAddExpenses();
    this.getAddIncome();
    this.getBudget();

    this.showResult();

  },

  showResult: function() {
    budgetMonthValue.value = this.budgetMonth;
    budgetDayValue.value = Math.floor(this.budgetDay);
    expensesMonthValue.value = this.expensesMonth;
    additionalExpensesValue.value = this.addExpenses.join(', ');
    additionalIncomeValue.value = this.addIncome.join(', ');
    targetMonthValue.value = Math.ceil(this.getTargetMonth());
    incomePeriodValue.value = this.calcPeriod();
    
  },

  addExpensesBlock: function() {
    let cloneExpensesItem = expensesItems[0].cloneNode(true);
    expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesPlus);
    expensesItems = document.querySelectorAll('.expenses-items');

    if (expensesItems.length === 3){
      expensesPlus.style.display = 'none';
    }
  },

  addIncomeBlock: function() {
    let cloneIncomeItem = incomeItems[0].cloneNode(true);
    incomeItems[0].parentNode.insertBefore(cloneIncomeItem, incomePlus);
    incomeItems = document.querySelectorAll('.income-items');

    if (incomeItems.length === 3){
      incomePlus.style.display = 'none';
    }
  },
  
  getExpenses: function (){
    expensesItems.forEach(function(item){
      let itemExpenses = item.querySelector('.expenses-title').value;
      let cashExpenses = item.querySelector('.expenses-amount').value;
      if(itemExpenses !== '' && cashExpenses !== ''){
        appData.expenses[itemExpenses] = cashExpenses;
      }
    });
  },

  getIncome: function(){
    incomeItems.forEach(function(item){
      let itemIncome = item.querySelector('.income-title').value;
      let cashIncome = item.querySelector('.income-amount').value;
      if (itemIncome !== '' && cashIncome !== ''){
        appData.income[itemIncome] = cashIncome;
      }
    });

    for (let key in appData.income) {
      this.incomeMonth += +appData.income[key];
    }
  },

  getAddExpenses: function() {
    let addExpenses = additionalExpensesItem.value.split(',');
    addExpenses.forEach(function(item){
      item = item.trim();
      if (item !== ''){
        appData.addExpenses.push(item);
      }
    });
  },

  getAddIncome: function(){
    additionalIncomeItem.forEach(function(item){
      let itemValue = item.value.trim();
      if (itemValue !== '') {
        appData.addIncome.push(itemValue);
      }
    });
  },

  //Функция запрета нажатия кнопки
  stopClick: function(event) {
    if (!isNumber(event.target.value)) {
      start.removeEventListener('click', hardBindStart);
    } else {
      start.addEventListener('click', hardBindStart);
      start.addEventListener('click', appData.chengeAtCancel);
    }
    salaryAmount.addEventListener('change', appData.stopClick);
  },

  //Функция изменения отображения периода
  changePeriod: function(event) {
    let changeNumberPeriod = event.target.value;
    periodAmount.innerHTML = changeNumberPeriod;
    return appData.showResult();
  },

  //Функция возвращает сумму всех обязательных расходов за месяц
  getExpensesMonth: function () {
    for (let key in appData.expenses) {
      this.expensesMonth += +this.expenses[key];
    }
  },
  //Функция возвращает Накопления за месяц (Доходы минус расходы)
  getBudget: function () {
    this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth;
    this.budgetDay = Math.floor(this.budgetMonth / 30);
  },
  //Функция подсчитывает, за какой период будет достигнута цель накопить
  getTargetMonth: function () {
    return targetAmount.value / this.budgetMonth;
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
  calcPeriod: function () {
    return this.budgetMonth * periodSelect.value;
  },
  chengeAtCancel: function () {debugger
    let input = document.querySelectorAll('input');
    for (let i = 0; i < input.length; i++) {
      input[i].disabled = true;
    }
    start.style.display = 'none';
    btnCancel.style.display = 'block';
    btnCancel.addEventListener('click', function(){
      for (let i = 0; i < input.length; i++) {
        input[i].removeAttribute('disabled');
        if (input[i] !== periodSelect) {
          input[i].value = '';
        } else {
          input[i].value = 1;
        }
      }
      start.style.display = 'block';
      btnCancel.style.display = 'none';
      return;
      // location.reload(); вот так будет неправильно?
    });
  
  }
};
  //Функция привязки

function startBind () {
  this.start();
}
function hardBindStart () {
  startBind.call(appData);
}

incomePlus.addEventListener('click', appData.addIncomeBlock);
expensesPlus.addEventListener('click', appData.addExpensesBlock);
periodSelect.addEventListener('input', appData.changePeriod);
salaryAmount.addEventListener('change', appData.stopClick);


  



// console.log('Расходы за месяц: ' + appData.expensesMonth);

//Если getTargetMonth возвращает нам отрицательное значение!!!!!!!!!!!!!!!!!!!!
// if (appData.getTargetMonth() > 0) {
//   console.log('Цель накопить будет достигнута за ' + Math.ceil(appData.getTargetMonth()) + ' месяцев');
// } else{
//   console.log('Цель накопить не будет достигнута!');
// }

// console.log(appData.getStatusIncome());

// console.log();

// for (let key in appData){
//   console.log('Наша программа включает в себя данные: ' + key + ' - ' + appData[key]);
// }

// console.log(appData.addExpenses.join(', '));
// appData.getInfoDeposit();
// console.log(appData.percentDeposit, appData.moneyDeposit, appData.calcSaveMoney());