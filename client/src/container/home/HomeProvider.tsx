import * as React from 'react';

import { arrangeEmploy, arrangeEmployee } from './action';

import { Employee } from './types';
import { GET_EMPLOYEES } from '../../db/queries';
import { Provider } from '../../context/HomeDetailContext';
import { useQuery } from '@apollo/react-hooks';

// Set State

interface Props {
  children?: React.ReactElement;
}

const HomeProvider = (props: Props): React.ReactElement => {
  // State valiables
  const [newEmployee, setNewEmployee] = React.useState<Employee>(new Employee(''));
  const [arrangedEmployList, setArrangedEmployList] = React.useState<Array<Array<Employee>> | undefined>(undefined);
  
  // Server Datas
  const getEmployeesRes = useQuery(GET_EMPLOYEES, {
    onCompleted(data) {

    },
    onError(error) {
      alert(`error: ${error.message}`)
    }
  });

  // Define Action List
  const states = {
    newEmployee,
    employeeList: getEmployeesRes.loading ? undefined : getEmployeesRes.data?.employees || [],
    arrangedEmployList
  };
  const actions = {
    addEmployee: (e: React.MouseEvent): void =>
    {
      e.preventDefault();
    },
    deleteEmployee: (e: React.MouseEvent<HTMLDivElement>, deleteName: string): void =>
    {
      e.preventDefault();
    },
    arrangeEmployee: (e: React.MouseEvent<HTMLDivElement>, tableCnt: number, minArrageCnt: number): void =>
    {
      e.preventDefault();
      // validateArrange();  // employ > 1, table > 2, min > 1, employ > table
      const arragedCntList = arrangeEmployee(states.employeeList, tableCnt, minArrageCnt);

      setArrangedEmployList(arrangeEmploy(states.employeeList, arragedCntList))
    },
  };

  return (
    <Provider value={{ ...states, ...actions }}>{props.children}</Provider>
  );
};

export default HomeProvider;
