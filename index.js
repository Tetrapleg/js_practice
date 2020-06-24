'use strict';

//Left aside
let start = document.getElementById('start'),
      btnCancel = document.getElementById('cancel'),
      btnPlus = document.getElementsByTagName('button'),
      btnIncomePlus = btnPlus[0],
      btnExpensesPlus = btnPlus[1],
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
  check: function () {
    if (salaryAmount.value !== '') {
      start.removeAttribute('disabled');
    }
  },
  start: function() {
    if (!isNumber(salaryAmount.value) || salaryAmount.value === '') {
      start.setAttribute('disabled', 'true');
      return;
    }
    let allInput = document.querySelectorAll('.data input[type = text]');
    allInput.forEach(function (item) {
      item.setAttribute('disabled', 'disabled');
    });
    btnExpensesPlus.setAttribute('disabled', 'true');
    btnIncomePlus.setAttribute('disabled', 'true');
    start.style.display = 'none';
    btnCancel.style.display = 'block';
   
    this.budget = +salaryAmount.value;

    this.getExpenses();
    this.getIncome();
    this.getExpensesMonth();
    this.getAddExpenses();
    this.getAddIncome();
    this.getBudget();
    this.getInfoDeposit();
    this.getStatusIncome();
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
    periodSelect.addEventListener('change', function() {
      incomePeriodValue.value = appData.calcPeriod();
    });
  },

  addExpensesBlock: function() {
    let cloneExpensesItem = expensesItems[0].cloneNode(true);
    expensesItems[0].parentNode.insertBefore(cloneExpensesItem, btnExpensesPlus);
    expensesItems = document.querySelectorAll('.expenses-items');

    if (expensesItems.length === 3){
      btnExpensesPlus.style.display = 'none';
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

  addIncomeBlock: function() {
    let cloneIncomeItem = incomeItems[0].cloneNode(true);
    incomeItems[0].parentNode.insertBefore(cloneIncomeItem, btnIncomePlus);
    incomeItems = document.querySelectorAll('.income-items');

    if (incomeItems.length === 3){
      btnIncomePlus.style.display = 'none';
    }
  },
  
  getIncome: function(){
    incomeItems.forEach(function(item){
      let itemIncome = item.querySelector('.income-title').value;
      let cashIncome = item.querySelector('.income-amount').value;
      if (itemIncome !== '' && cashIncome !== ''){
        appData.income[itemIncome] = cashIncome;
      }
    });
    for (let key in this.income) {
      this.incomeMonth += +appData.income[key];
    }
  },

  getAddExpenses: function() {
    let addExpens = additionalExpensesItem.value.split(',');
    addExpens.forEach(function(item){
      item = item.trim();
      if (item !== ''){
        item = item.charAt(0).toUpperCase() + item.substring(1).toLowerCase();
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

  //Функция возвращает сумму всех обязательных расходов за месяц
  getExpensesMonth: function () {
    for (let key in this.expenses) {
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
    if (this.budgetDay >= 1200) {
      return ('У вас высокий уровень дохода');
    } else if (this.budgetDay >= 600) {
      return ('У вас средний уровень дохода');
    } else if (this.budgetDay < 600, appData.budgetDay >= 0) {
      return ('К сожалению у вас уровень дохода ниже среднего');
    } else if (this.budgetDay < 0) {
      return ('Что-то пошло не так');
    }
  },

  getInfoDeposit: function () {
    if (this.deposit) {
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

  reset: function () {
    
    let inputTextData = document.querySelectorAll('.data input[type = text]'),
        resultInputAll = document.querySelectorAll('.result input[type = text]');

    inputTextData.forEach(function (elem) {
      elem.value = '';
      elem.removeAttribute('disabled');
      periodSelect.value = '0';
      periodAmount.innerHTML = periodSelect.value;
    });
    resultInputAll.forEach(function (elem) {
      elem.value = '';
    });

    for (let i = 1; i < incomeItems.length; i++) {
      incomeItems[i].parentNode.removeChild(incomeItems[i]);
      btnIncomePlus.style.display = 'block';
    }

    this.budget = 0,  
    this.budgetDay = 0,
    this.budgetMonth = 0,
    this.income = {},
    this.incomeMonth = 0,
    this.addIncome = [],
    this.expenses = {},
    this.addExpenses = [],
    this.expensesMonth = 0,
    this.deposit = false,
    this.percentDeposit = 0,
    this.moneyDeposit = 0;

    btnCancel.style.display = 'none';
    start.style.display = 'block';
    btnExpensesPlus.removeAttribute('disabled');
    btnIncomePlus.removeAttribute('disabled');
    depositCheck.checked = false;
    
  },
};

start.addEventListener('click', appData.start.bind(appData));
btnIncomePlus.addEventListener('click', appData.addIncomeBlock);
btnExpensesPlus.addEventListener('click', appData.addExpensesBlock);
btnCancel.addEventListener('click', appData.reset.bind(appData));
salaryAmount.addEventListener('keyup', appData.check);

periodSelect.addEventListener('input', function () {
  periodAmount.innerHTML = periodSelect.value;
});

