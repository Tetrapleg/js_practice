

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