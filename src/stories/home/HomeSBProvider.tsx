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
  // Define Action List
  const states = {
    employeeList,
  };
  const actions = {
    addEmployee: (name: string): void => {
      const addEmployee = new Employee(name);
      setEmployeeList(employeeList.concat(addEmployee));
    },
    deleteEmployee: (deleteName: string): void => {
      setEmployeeList(employeeList.filter((employ) => deleteName !== employ.name));
    },
  };

  return (
    <Provider value={{ ...states, ...actions }}>{props.children}</Provider>
  );
};

export default HomeSBProvider;
