import { Employee } from '../container/home/types';
import { RestaurantCondition } from '../container/home/HomeProvider';
import createCtx from './CreateCtx';

interface Context {
  newEmployee: Employee;
  employeeList: Array<Employee> | undefined;
  arrangedEmployeeList: Array<Array<Employee>> | undefined;
  restaurantCondition: RestaurantCondition;
  addEmployee: (e: React.MouseEvent) => void;
  deleteEmployee: (e: React.MouseEvent<HTMLDivElement>, name: string) => void;
  arrangeEmployee: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const [useCtx, Provider] = createCtx<Context>();

export { useCtx as useHoemDetilContext, Provider };
