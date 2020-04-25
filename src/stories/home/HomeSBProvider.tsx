import * as React from 'react';

import { addEmployee, deleteEmployee } from '../../container/home/action';

import { Employee } from '../../container/home/types';
import { Provider } from '../../context/HomeDetailContext';

// Set State

interface Props {
  children?: React.ReactElement;
}

const HomeSBProvider = (props: Props): React.ReactElement => {
  const [employeeList, setEmployeeList] = React.useState([new Employee('jinbeom'),
    new Employee('jinhye'), new Employee('inhye')]);
  const [newEmployee, setNewEmployee] = React.useState<Employee>(new Employee(''));
  // Define Action List
  const states = {
    newEmployee,
    employeeList,
  };
  const actions = {
    addEmployee: (e: React.MouseEvent): void =>
    {
      e.preventDefault();

      const newEmployeeList = addEmployee(newEmployee, employeeList);

      setEmployeeList([...newEmployeeList]);
    },
    deleteEmployee: (e: React.MouseEvent, deleteName: string): void =>
    {
      e.preventDefault();

      const newEmployeeList = deleteEmployee(deleteName, employeeList);

      setEmployeeList([...newEmployeeList]);
    },
  };

  return (
    <Provider value={{ ...states, ...actions }}>{props.children}</Provider>
  );
};

export default HomeSBProvider;
