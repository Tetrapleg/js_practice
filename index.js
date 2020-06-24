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

let isNumber = (n) => {
  return !isNaN(parseFloat(n)) && isFinite(n);
};

class AppData {
  constructor(){
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
  }

  check() {
    if (salaryAmount.value !== '') {
      start.removeAttribute('disabled');
    }
  }

  start() {
    if (!isNumber(salaryAmount.value) || salaryAmount.value === '') {
      start.setAttribute('disabled', 'true');
      return;
    }
    const allInput = document.querySelectorAll('.data input[type = text]');
    allInput.forEach((item) => {
      item.setAttribute('disabled', 'true');
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

  }

  showResult() {
    budgetMonthValue.value = this.budgetMonth;
    budgetDayValue.value = Math.floor(this.budgetDay);
    expensesMonthValue.value = this.expensesMonth;
    additionalExpensesValue.value = this.addExpenses.join(', ');
    additionalIncomeValue.value = this.addIncome.join(', ');
    targetMonthValue.value = Math.ceil(this.getTargetMonth());
    incomePeriodValue.value = this.calcPeriod();
    periodSelect.addEventListener('change', () => {
      incomePeriodValue.value = this.calcPeriod();
    });
  }

  addExpensesBlock() {
    const cloneExpensesItem = expensesItems[0].cloneNode(true);
    expensesItems[0].parentNode.insertBefore(cloneExpensesItem, btnExpensesPlus);
    expensesItems = document.querySelectorAll('.expenses-items');

    if (expensesItems.length === 3){
      btnExpensesPlus.style.display = 'none';
    }
  }

  addIncomeBlock() {
    const cloneIncomeItem = incomeItems[0].cloneNode(true);
    incomeItems[0].parentNode.insertBefore(cloneIncomeItem, btnIncomePlus);
    incomeItems = document.querySelectorAll('.income-items');

    if (incomeItems.length === 3){
      btnIncomePlus.style.display = 'none';
    }
  }

  getExpenses() {
    expensesItems.forEach((item) => {
      const itemExpenses = item.querySelector('.expenses-title').value;
      const cashExpenses = item.querySelector('.expenses-amount').value;
      if(itemExpenses !== '' && cashExpenses !== ''){
        this.expenses[itemExpenses] = cashExpenses;
      }
    });
  }

  getIncome() {
    incomeItems.forEach((item) => {
      const itemIncome = item.querySelector('.income-title').value;
      const cashIncome = item.querySelector('.income-amount').value;
      if (itemIncome !== '' && cashIncome !== ''){
        this.income[itemIncome] = cashIncome;
      }
    });

    for (let key in this.income) {
      this.incomeMonth += +this.income[key];
    }
  }

  getAddExpenses() {
    const addExpenses = additionalExpensesItem.value.split(',');
    addExpenses.forEach((item) => {
      item = item.trim();
      if (item !== ''){
        item = item.charAt(0).toUpperCase() + item.substring(1).toLowerCase();
        this.addExpenses.push(item);
      }
    });
  }

  getAddIncome() {
    additionalIncomeItem.forEach((item) => {
      const itemValue = item.value.trim();
      if (itemValue !== '') {
        this.addIncome.push(itemValue);
      }
    });
  }

  //Функция возвращает сумму всех обязательных расходов за месяц
  getExpensesMonth() {
    for (let key in this.expenses) {
      this.expensesMonth += +this.expenses[key];
    }
  }

  //Функция возвращает Накопления за месяц (Доходы минус расходы)
  getBudget() {
    this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth;
    this.budgetDay = Math.floor(this.budgetMonth / 30);
  }

  //Функция подсчитывает, за какой период будет достигнута цель накопить
  getTargetMonth() {
    return targetAmount.value / this.budgetMonth;
  }

  getStatusIncome() {
    if (this.budgetDay >= 1200) {
      return ('У вас высокий уровень дохода');
    } else if (this.budgetDay >= 600) {
      return ('У вас средний уровень дохода');
    } else if (this.budgetDay < 600, this.budgetDay >= 0) {
      return ('К сожалению у вас уровень дохода ниже среднего');
    } else if (this.budgetDay < 0) {
      return ('Что-то пошло не так');
    }
  }

  getInfoDeposit() {
    if (this.deposit) {

      this.percentDeposit = prompt('Какой годовой процент?', '10');
        while(!isNumber(this.percentDeposit)) {
          this.percentDeposit = prompt('Какой годовой процент? (введите число)');
        } 
      this.moneyDeposit = prompt('Какая сумма заложена?', 10000);
        while(!isNumber(this.percentDeposit)) {
          this.percentDeposit = prompt('Какая сумма заложена? (введите число)');
        } 
    }
  }

  calcPeriod() {
    return this.budgetMonth * periodSelect.value;
  }
  reset() {
      
    const inputTextData = document.querySelectorAll('.data input[type = text]'),
        resultInputAll = document.querySelectorAll('.result input[type = text]');

    inputTextData.forEach((elem) => {
      elem.value = '';
      elem.removeAttribute('disabled');
      periodSelect.value = '0';
      periodAmount.innerHTML = periodSelect.value;
    });
    resultInputAll.forEach((elem) => {
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
    this.moneyDeposit = 0,

    btnCancel.style.display = 'none',
    start.style.display = 'block',
    btnExpensesPlus.removeAttribute('disabled'),
    btnIncomePlus.removeAttribute('disabled'),
    depositCheck.checked = false;
    
  }

  eventListener() {

    const _this = this;
    start.addEventListener('click', _this.start.bind(_this));
    btnIncomePlus.addEventListener('click', _this.addIncomeBlock);
    btnExpensesPlus.addEventListener('click', _this.addExpensesBlock);
    btnCancel.addEventListener('click', _this.reset.bind(_this));
    salaryAmount.addEventListener('keyup', _this.check);

    periodSelect.addEventListener('input', function () {
      periodAmount.innerHTML = periodSelect.value;
    });
  }

}



const appData = new AppData();

console.log(appData);
appData.eventListener();

