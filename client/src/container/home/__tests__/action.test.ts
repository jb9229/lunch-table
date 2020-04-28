import { addEmployee, arrangeAtLastTable, arrangeAtTable, arrangeEmploy } from "../action";

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


test('arrangeAtLastTable Action', () =>
{
  const arrangedEmployeeList = [2, 1, 5];
  const totalEmployeeCnt = 10;
  const lastEmployCnt = arrangeAtLastTable(arrangedEmployeeList, totalEmployeeCnt);

  console.log('>>> lastEmployCnt: ', lastEmployCnt)
  expect(lastEmployCnt).toEqual(2);
});

test('arrangeAtLastTable Action', () =>
{
  const employeeList = [new Employee('jinbeom'), new Employee('jinhye'), new Employee('inhye'), new Employee('jinchang'), new Employee('moonyoung'), new Employee('okja'), new Employee('jeongwon')];
  const arragedCntList = [2, 4, 1];
  const arrangeEmployList = arrangeEmploy(employeeList, arragedCntList);

  console.log('>>> arrangeEmployList: ', arrangeEmployList)
  expect(arrangeEmployList[1].length).toEqual(4);
});