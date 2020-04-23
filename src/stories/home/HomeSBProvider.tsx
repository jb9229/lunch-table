import * as React from 'react';

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
    addEmployee: (e: React.MouseEvent): void => {
      e.preventDefault();
      if (!newEmployee.name) {return}
      setEmployeeList(employeeList.concat({ ...newEmployee }));
    },
    deleteEmployee: (e: React.MouseEvent, deleteName: string): void => {
      setEmployeeList(employeeList.filter((employ) => deleteName !== employ.name));
    },
  };

  return (
    <Provider value={{ ...states, ...actions }}>{props.children}</Provider>
  );
};

export default HomeSBProvider;
