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

const AppData = function () {

  this.budget = 0;  
  this.budgetDay = 0;
  this.budgetMonth = 0;
  this.income = {};
  this.incomeMonth = 0;
  this.addIncome = [];
  this.expenses = {};
  this.addExpenses = [];
  this.expensesMonth = 0;
  this.percentDeposit = 0;
  this.moneyDeposit = 0;
  this.deposit = false;

};

AppData.prototype.start = function() {

  this.budget = +salaryAmount.value;
  this.getExpenses();
  this.getIncome();
  this.getExpensesMonth();
  this.getAddExpenses();
  this.getAddIncome();
  this.getBudget();

  this.showResult();

},

AppData.prototype.showResult = function() {
  budgetMonthValue.value = this.budgetMonth;
  budgetDayValue.value = Math.floor(this.budgetDay);
  expensesMonthValue.value = this.expensesMonth;
  additionalExpensesValue.value = this.addExpenses.join(', ');
  additionalIncomeValue.value = this.addIncome.join(', ');
  targetMonthValue.value = Math.ceil(this.getTargetMonth());
  incomePeriodValue.value = this.calcPeriod();
  
},

AppData.prototype.addExpensesBlock = function() {
  let cloneExpensesItem = expensesItems[0].cloneNode(true);
  expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesPlus);
  expensesItems = document.querySelectorAll('.expenses-items');

  if (expensesItems.length === 3){
    expensesPlus.style.display = 'none';
  }
},

AppData.prototype.addIncomeBlock = function() {
  let cloneIncomeItem = incomeItems[0].cloneNode(true);
  incomeItems[0].parentNode.insertBefore(cloneIncomeItem, incomePlus);
  incomeItems = document.querySelectorAll('.income-items');

  if (incomeItems.length === 3){
    incomePlus.style.display = 'none';
  }
};

AppData.prototype.getExpenses = function (){
  const _this = this;
  expensesItems.forEach(function(item){
    let itemExpenses = item.querySelector('.expenses-title').value;
    let cashExpenses = item.querySelector('.expenses-amount').value;
    if(itemExpenses !== '' && cashExpenses !== ''){
      _this.expenses[itemExpenses] = cashExpenses;
    }
  });
};

AppData.prototype.getIncome = function(){
  const _this = this;
  incomeItems.forEach(function(item){
    let itemIncome = item.querySelector('.income-title').value;
    let cashIncome = item.querySelector('.income-amount').value;
    if (itemIncome !== '' && cashIncome !== ''){
      _this.income[itemIncome] = cashIncome;
    }
  });

  for (let key in this.income) {
    this.incomeMonth += +this.income[key];
  }
};

AppData.prototype.getAddExpenses = function() {
  const _this = this;
  let addExpenses = additionalExpensesItem.value.split(',');
  addExpenses.forEach(function(item){
    item = item.trim();
    if (item !== ''){
      _this.addExpenses.push(item);
    }
  });
};

AppData.prototype.getAddIncome = function(){
  const _this = this;
  additionalIncomeItem.forEach(function(item){
    let itemValue = item.value.trim();
    if (itemValue !== '') {
      _this.addIncome.push(itemValue);
    }
  });
};

//Функция запрета нажатия кнопки
AppData.prototype.stopClick = function(event) {
  if (!isNumber(event.target.value)) {
    start.removeEventListener('click', hardBindStart);
  } else {
    start.addEventListener('click', hardBindStart);
    start.addEventListener('click', censelBind);
  }
};

//Функция изменения отображения периода
AppData.prototype.changePeriod = function(event) {
  let changeNumberPeriod = event.target.value;
  periodAmount.innerHTML = changeNumberPeriod;
};

//Функция возвращает сумму всех обязательных расходов за месяц
AppData.prototype.getExpensesMonth = function () {
  const _this = this;
  for (let key in this.expenses) {
    _this.expensesMonth += +this.expenses[key];
  }
};
//Функция возвращает Накопления за месяц (Доходы минус расходы)
AppData.prototype.getBudget = function () {
  this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth;
  this.budgetDay = Math.floor(this.budgetMonth / 30);
};
//Функция подсчитывает, за какой период будет достигнута цель накопить
AppData.prototype.getTargetMonth = function () {
  return targetAmount.value / this.budgetMonth;
};
AppData.prototype.getStatusIncome = function () {
  if (this.budgetDay >= 1200) {
    return ('У вас высокий уровень дохода');
  } else if (this.budgetDay >= 600) {
    return ('У вас средний уровень дохода');
  } else if (this.budgetDay < 600, this.budgetDay >= 0) {
    return ('К сожалению у вас уровень дохода ниже среднего');
  } else if (this.budgetDay < 0) {
    return ('Что-то пошло не так');
  }
};
AppData.prototype.getInfoDeposit = function () {
  const _this = this;
  if (this.deposit) {

    _this.percentDeposit = prompt('Какой годовой процент?', '10');
      while(!isNumber(_this.percentDeposit)) {
        _this.percentDeposit = prompt('Какой годовой процент? (введите число)');
      } 
    _this.moneyDeposit = prompt('Какая сумма заложена?', 10000);
      while(!isNumber(_this.percentDeposit)) {
        _this.percentDeposit = prompt('Какая сумма заложена? (введите число)');
      } 
  }
};
AppData.prototype.calcPeriod = function () {
  return this.budgetMonth * periodSelect.value;
};
AppData.prototype.chengeAtCancel = function () {
  let input = document.querySelectorAll('input');
  for (let i = 0; i < input.length; i++) {
    if (input[i] !== periodSelect) {
      input[i].disabled = true;
    }
  }
  start.style.display = 'none';
  btnCancel.style.display = 'block';
  btnCancel.addEventListener('click', function(){
    for (let i = 0; i < input.length; i++) {
      input[i].removeAttribute('disabled');
      if (input[i] !== periodSelect) {
        input[i].value = '';
      }
    }
    start.style.display = 'block';
    btnCancel.style.display = 'none';
    return;
  });
};
AppData.prototype.eventListener = function () {

  const _this = this;
  incomePlus.addEventListener('click', _this.addIncomeBlock);
  expensesPlus.addEventListener('click', _this.addExpensesBlock);
  periodSelect.addEventListener('input', _this.changePeriod);
  salaryAmount.addEventListener('change', _this.stopClick);
};

const appData = new AppData();

console.log(appData);
appData.eventListener();

function censelBind () {
  appData.chengeAtCancel.call(appData);
}
function hardBindStart () {
  appData.start.call(appData);
}


