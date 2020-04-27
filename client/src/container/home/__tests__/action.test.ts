import { addEmployee, arrangeAtTable } from "../action";

import { Employee } from "../types";

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

test('arrangeAtTable Action', () =>
{
  const maxArrangeCnt = 8;
  const minArrageCnt = 2;
  const randomValue = arrangeAtTable(maxArrangeCnt, minArrageCnt);

  console.log('>>> randomValue: ', randomValue)
  expect(randomValue).toBeGreaterThanOrEqual(minArrageCnt);
  expect(randomValue).toBeLessThanOrEqual(maxArrangeCnt);

});