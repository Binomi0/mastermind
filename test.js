class Employee {
  constructor(ename) {
    this.ename = ename;
  }
}

class EmployeeRenderer {
  constructor(employees) {
    this.employees = employees;
  }
  renderWithArrowFunc() {
    this.employees.forEach((emp) => {
      console.log(emp.ename); // Will print Alex, Bob, Smith
    });
  }
}

var employees = [
  new Employee('Alex'),
  new Employee('Bob'),
  new Employee('Smith'),
];

var employeeRenderer = new EmployeeRenderer(employees);
employeeRenderer.renderWithArrowFunc();
