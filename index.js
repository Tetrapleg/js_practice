'use strict';

const calculate = document.getElementById('start');
console.log(calculate);

const btnIncome = document.getElementsByTagName('button')[0];
console.log(btnIncome);

const btnExpenses = document.getElementsByTagName('button')[1];
console.log(btnExpenses);

const depositCheck = document.querySelector('#deposit-check');
console.log(depositCheck);

const additionalIncomeItem = document.querySelectorAll('.additional_income-item');
console.log(additionalIncomeItem);

const resultTotal = document.querySelectorAll('.result-total');

const budgetMonthValue = resultTotal[0];
console.log(budgetMonthValue);

const budgetDayValue = resultTotal[1];
console.log(budgetDayValue);

const expensesMonthValue = resultTotal[2];
console.log(expensesMonthValue);

const additionalIncomeValue = resultTotal[3];
console.log(additionalIncomeValue);

const additionalExpensesValue = resultTotal[4];
console.log(additionalExpensesValue);

const incomePeriodValue = resultTotal[5];
console.log(incomePeriodValue);

const targetMonthValue = resultTotal[6];
console.log(targetMonthValue);

const salaryAmount = document.querySelector('.salary-amount');
console.log(salaryAmount);

const incomeTitle = document.querySelector('input.income-title');
console.log(incomeTitle);

const incomeAmount = document.querySelector('.income-amount');
console.log(incomeAmount);

const expensesTitle = document.querySelector('input.expenses-title');
console.log(expensesTitle);

const expensesAmount = document.querySelector('.expenses-amount');
console.log(expensesAmount);

const additionalExpensesItem = document.querySelector('.additional_expenses-item');
console.log(additionalExpensesItem);

const targetAmount = document.querySelector('.target-amount');
console.log(targetAmount);

const periodSelect = document.querySelector('.period-select');
console.log(periodSelect);