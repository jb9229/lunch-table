import * as React from 'react';

import { ADD_EMPLOYEES, DELETE_EMPLOYEES } from '../../db/mutations';
import { arrangeEmploy, arrangeEmployee, validateArrange } from './action';
import { useMutation, useQuery } from '@apollo/react-hooks';

import { Employee } from './types';
import { GET_EMPLOYEES } from '../../db/queries';
import { Provider } from '../../context/HomeDetailContext';

export class RestaurantCondition {
  constructor () {
    this.tableCnt = 0;
    this.minArrangeCntAtTable = 0;
  }
  tableCnt: number;
  minArrangeCntAtTable: number;
}
interface Props {
  children?: React.ReactElement;
}

const HomeProvider = (props: Props): React.ReactElement => {
  // State valiables
  const [newEmployee, setNewEmployee] = React.useState<Employee>(new Employee(''));
  const [arrangedEmployeeList, setArrangedEmployeeList] = React.useState<Array<Array<Employee>> | undefined>(undefined);
  const [restaurantCondition] = React.useState(new RestaurantCondition())
  
  // Server Datas
  const getEmployeesRes = useQuery(GET_EMPLOYEES, {
    onError(error) {
      alert(`error: ${error.message}`)
    }
  });

  const [addEmployeeRequest] = useMutation(ADD_EMPLOYEES, {
    onCompleted(data) {
      getEmployeesRes.refetch();
    },
    onError(error) {
      alert(`error: ${error.message}`)
    }
  });

  const [deleteEmployeeRequest] = useMutation(DELETE_EMPLOYEES, {
    onCompleted(data) {
      getEmployeesRes.refetch();
    },
    onError(error) {
      alert(`error: ${error.message}`)
    }
  });

  // Define Action List
  const states = {
    newEmployee,
    restaurantCondition,
    employeeList: getEmployeesRes.loading ? undefined : getEmployeesRes.data?.employees || [],
    arrangedEmployeeList
  };
  const actions = {
    addEmployee: (e: React.MouseEvent): void =>
    {
      e.preventDefault();
      if (!newEmployee?.name) { alert('입력한 이름이 유효하지 않습니다!'); return}
      if (newEmployee?.name && states.employeeList && states.employeeList.some((ep: Employee) => ep.name === newEmployee.name.trim()))
      {
        alert('이름이 중복되었습니다!'); return
      }
      addEmployeeRequest({ variables: { eName: newEmployee.name } })
    },
    deleteEmployee: (e: React.MouseEvent<HTMLDivElement>, id: string): void =>
    {
      e.preventDefault();

      deleteEmployeeRequest({ variables: { id: id } })
    },
    arrangeEmployee: (e: React.MouseEvent<HTMLButtonElement>): void =>
    {
      e.preventDefault();
      if (!validateArrange(restaurantCondition, states.employeeList)) { return }

      const arragedCntList = arrangeEmployee(states.employeeList, restaurantCondition.tableCnt, restaurantCondition.minArrangeCntAtTable);

      setArrangedEmployeeList(arrangeEmploy(states.employeeList, arragedCntList))
    },
  };

  return (
    <Provider value={{ ...states, ...actions }}>{props.children}</Provider>
  );
};

export default HomeProvider;
