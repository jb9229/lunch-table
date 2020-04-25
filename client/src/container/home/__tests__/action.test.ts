import { Employee } from "../types";
import { addEmployee } from "../action";

test('addEmploy Action', () =>
{
  const employeeList: Array<Employee> = [];

  const newEmployee = new Employee('jinbeom');
  const newEmployeeList = addEmployee(newEmployee, employeeList);

  expect(newEmployeeList.length).toEqual(1);


  // Check Duplicate
  const dupEmployee = new Employee('jinbeom');
  const dupEmployeeList = addEmployee(dupEmployee, newEmployeeList);

  expect(dupEmployeeList.length).toEqual(1);
});

test('deleteEmploy Action', () =>
{
  const employeeList: Array<Employee> = [];

  const newEmployee = new Employee('jinbeom');
  const newEmployeeList = addEmployee(newEmployee, employeeList);

  expect(newEmployeeList.length).toEqual(1);


  // Check Duplicate
  const dupEmployee = new Employee('jinbeom');
  const dupEmployeeList = addEmployee(dupEmployee, newEmployeeList);

  expect(dupEmployeeList.length).toEqual(1);
});
