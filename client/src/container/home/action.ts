import { Employee } from "./types";

/**
 * 직원 출근 등록
 *
 * @param newEmployee 추가할 직원
 * @param employeeList 현재 출근직원 리스트
 * @returns 추가된 출근직원 리스트
 */
export const addEmployee = (newEmployee: Employee, employeeList: Array<Employee>): Array<Employee> =>
{
  // Validation
  if (!newEmployee.name) {return employeeList;}

  // Duplicate Validation
  const existEmployee = employeeList.some((employ) =>
  {
    if (employ.name === newEmployee.name) {return true;}
  });

  if (existEmployee) {return employeeList;}

  return employeeList.concat({ ...newEmployee });
};

/**
 * 직원 퇴근 등록
 *
 * @param deleteName 퇴근직원 네임
 * @param employeeList 현재 직원 리스트
 * @returns 퇴근된 직원 리스트
 */
export const deleteEmployee = (deleteName: string, employeeList: Array<Employee>): Array<Employee> =>
{
  return employeeList.filter((employ) => deleteName !== employ.name);
};
