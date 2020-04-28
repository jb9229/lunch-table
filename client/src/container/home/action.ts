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

/**
 * 점심시간에 직원들을 식당 자리에 배치
 *
 * @param employeeList 출근 직원 리스트
 * @returns 각각 테이블에 배치할 인원 수 배열
 */
export const arrangeEmployee = (employeeList: Array<Employee>, tableCount: number, minArrageCnt: number): Array<number> => {
  const totalEmployeeCnt = employeeList.length;
  const arrangedEmployeeList: Array<number> = employeeList.map((employee, index, list) =>
  {
    if (index === list.length - 1)
    {
      return arrangeAtLastTable(arrangedEmployeeList, totalEmployeeCnt);
    } else
    {
      if (index === 0)
      {
        return arrangeAtTable(list.length - tableCount, minArrageCnt);
      } else
      {
        const sumArrangeCnt = arrangedEmployeeList.reduce((acc, ele) => acc + ele);

        return arrangeAtTable(list.length - (sumArrangeCnt + tableCount), minArrageCnt);
      }
    }
  });

  return arrangedEmployeeList;
}

/**
 * 마지막 테이블 직원 수(아직 배치받지 못한 직원을 배치한다)
 *
 * @param arrangedEmployeeList 현재 직원이 배치된 테이블 리스트
 * @param totalEmployeeCnt 총 직원수
 * @returns 마지막 테이블 직원수
 */
export const arrangeAtLastTable = (arrangedEmployeeList: Array<number>, totalEmployeeCnt: number) => {
  const arrangedEmployeeCnt = arrangedEmployeeList.reduce((accum, eCnt) => accum + eCnt);
  return totalEmployeeCnt - arrangedEmployeeCnt;
}

/**
 * 최대/최소 범위내에서 테이블의 난수 자릿수
 *
 * @param {number} maxArrangeCnt 테이블에 최대 앉을 수 있는 자리
 * @param {number} minArrageCnt 테이블에 최소 않아야 하는 자리
 */
export const arrangeAtTable = (maxArrangeCnt: number, minArrageCnt: number) => {
  const randomValue = Math.floor(Math.random()*(maxArrangeCnt - minArrageCnt + 1)) + minArrageCnt;
  return randomValue;
}

/**
 * 
 * @param employeeList 직원 리스트
 * @param arragedCntList 직원배치 카운트 리스트
 * @returns 직원이 배치된 리스트
 */
export const arrangeEmploy = (employeeList: Array<Employee>, arragedCntList: Array<number>): Array<Array<Employee>> => {
  let currSliceIndex = 0;
  return arragedCntList.map((eCnt) =>
  {
    const list = employeeList.slice(currSliceIndex, currSliceIndex + eCnt);
    currSliceIndex += eCnt;

    return list;
  })
}
