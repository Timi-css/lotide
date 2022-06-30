class Employee {
  constructor(name, title, salary) {
    this.name = name;
    this.title = title;
    this.salary = salary;
    this.boss = null;
    this.subordionates = [];
  }

  addSubordiante(subordionate) {
    this.subordionates.push(subordionate);
    subordionate.boss = this;
  }

  get numberOfSubordiantes() {
    return this.subordionates.length;
  }

  get numberOfPeopleCEO() {
    let numberOfPeople = 0;
    let currentEmployee = this;

    while (currentEmployee.boss) {
      currentEmployee = currentEmployee.boss;
      numberOfPeople++;
    }

    return numberOfPeople;
  }

  hasSameBoss(employee) {
    return this.boss === employee.boss;
  }

  employeesThatMakeOver(amount) {
    let employees = [];

    if (this.salary > amount) {
      employees.push(this);
    }

    for (const surbodinate of this.subordionates) {
      const subordinatesThatMakeOver =
        surbodinate.employeesThatMakeOver(amount);
      employees = employees.concat(subordinatesThatMakeOver);
    }
    return employees;
  }

  totalEmployees(employee) {
    let totalEmployees = 0;

    for (const subordinate of this.subordionates) {
      const totalSubordinates = subordinate.totalEmployees(employee);
      employee = employee.concat(totalEmployees);
    }
  }
}

const ada = new Employee("Ada", "CEO", 3000000);
const craig = new Employee("Carig", "VP Software", 1000000);
const arvinder = new Employee("Arvinder", "Chief Design Officer", 1000000);
const angela = new Employee("Angela", "VP Retail", 1000000);
const phil = new Employee("Phil", "VP Marketing", 1000000);
const Simone = new Employee("Simone", "Software Engineer", 300000);
const Ali = new Employee("Ali", "Software Engineer", 300000);
const Florida = new Employee("Florida", "Marketing Manager", 15000);
const David = new Employee("David", "Sales", 200000);
const Brian = new Employee("Brian", "Sales", 300000);
const Karla = new Employee("Karla", "Retail Manager", 100000);

// Ada's subordinates
ada.addSubordiante(craig);
ada.addSubordiante(arvinder);
ada.addSubordiante(angela);
ada.addSubordiante(phil);

// Craig's subordinates
craig.addSubordiante(Simone);
craig.addSubordiante(Ali);

// Phil's subordinates
phil.addSubordiante(Florida);
phil.addSubordiante(David);
phil.addSubordiante(Brian);

// Angela's subordinates

// console.log(craig);

// let wealthyEmployees = ada.employeesThatMakeOver(400000);
// console.log(wealthyEmployees);

console.log(ada.totalEmployees());
