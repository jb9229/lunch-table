import { Employee } from "./types";
import { RestaurantCondition } from "./HomeProvider";

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
  const resultList = new Array<number>();
  new Array(tableCount).fill(0).forEach((_, index, list) =>
  {
    if (index === list.length - 1)  // 마지막 
    {
      resultList.push(arrangeAtLastTable(resultList, totalEmployeeCnt));
    } else
    {
        const sumArrangeCnt = resultList.length > 0 ? resultList.reduce((acc, ele) => acc + ele) : 0;
        const maxArrangableCnt = employeeList.length - (sumArrangeCnt + tableCount) + 1;

        if (maxArrangableCnt < 2) { resultList.push(1); return }
      
        resultList.push(arrangeAtTable(maxArrangableCnt, minArrageCnt));
    }
  });

  return resultList;
}

/**
 * 마지막 테이블 직원 수(아직 배치받지 못한 직원을 배치한다)
 *
 * @param arrangedEmployeeList 현재 직원이 배치된 테이블 리스트
 * @param totalEmployeeCnt 총 직원수
 * @returns 마지막 테이블 직원수
 */
export const arrangeAtLastTable = (arrangedEmployeeList: Array<number>, totalEmployeeCnt: number) => {
  const arrangedEmployeeCnt = arrangedEmployeeList ? arrangedEmployeeList.reduce((accum, eCnt) => accum + eCnt) : 0;
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

/**
 * 레스토랑 자리배치를 위한 조건값 유효성확인
 *
 * @param condition 레스토랑 자리배치 조건듣
 */
export const validateArrange = (condition: RestaurantCondition, employeeList: Array<Employee> | undefined) => {
  const employeeCnt = employeeList ? employeeList.length : 0;
  const tableCnt = condition?.tableCnt ? condition.tableCnt : 0;
  if (!condition || tableCnt < 2) { alert('테이블수가 유효하지 않습니다\n(2개이상)'); return false }
  if (condition.minArrangeCntAtTable < 1 || condition.minArrangeCntAtTable * tableCnt > employeeCnt) { alert('테이블당 최소인원이 유효하지 않습니다\n(1명이상)'); return false }
  if (!employeeList || employeeCnt < 2 || tableCnt > employeeCnt ) { alert('직원리스트가 유효하지 않습니다\n(2명이상, 테이블수보다 커야함)'); return false }
  return true;
}
