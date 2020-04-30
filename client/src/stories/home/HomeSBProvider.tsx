import * as React from 'react';

import { addEmployee, arrangeEmploy, arrangeEmployee, deleteEmployee, validateArrange } from '../../container/home/action';

import { Employee } from '../../container/home/types';
import { Provider } from '../../context/HomeDetailContext';
import { RestaurantCondition } from '../../container/home/HomeProvider';

// Set State

interface Props {
  children?: React.ReactElement;
}

const HomeSBProvider = (props: Props): React.ReactElement => {
  const [employeeList, setEmployeeList] = React.useState([new Employee('jinbeom'),
    new Employee('jinhye'), new Employee('inhye')]);
  const [newEmployee, setNewEmployee] = React.useState<Employee>(new Employee(''));
  const [restaurantCondition] = React.useState(new RestaurantCondition())
  const [arrangedEmployeeList, setArrangedEmployeeList] = React.useState<Array<Array<Employee>> | undefined>(undefined);

  // Define Action List
  const states = {
    newEmployee,
    restaurantCondition,
    employeeList,
    arrangedEmployeeList
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
    arrangeEmployee: (e: React.MouseEvent<HTMLButtonElement>): void =>
    {
      e.preventDefault();
      if (!validateArrange(restaurantCondition, employeeList)) { return }

      const arragedCntList = arrangeEmployee(states.employeeList, restaurantCondition.tableCnt, restaurantCondition.minArrangeCntAtTable);
      console.log('>>> arragedCntList:', arragedCntList)
      setArrangedEmployeeList(arrangeEmploy(states.employeeList, arragedCntList))
    },
  };

  return (
    <Provider value={{ ...states, ...actions }}>{props.children}</Provider>
  );
};

export default HomeSBProvider;
