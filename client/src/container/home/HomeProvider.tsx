import * as React from 'react';

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
  
  // Server Datas
  const getEmployeesRes = useQuery(GET_EMPLOYEES, {
    onCompleted(data) {

    },
    onError(error) {

    }
  });

  // Define Action List
  const states = {
    newEmployee,
    employeeList: getEmployeesRes.loading ? undefined : getEmployeesRes.data?.employees || []
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
  };

  return (
    <Provider value={{ ...states, ...actions }}>{props.children}</Provider>
  );
};

export default HomeProvider;
