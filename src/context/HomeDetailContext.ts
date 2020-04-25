import { Employee } from '../container/home/types';
import createCtx from '../context/CreateCtx';

interface Context {
  newEmployee: Employee;
  employeeList: Array<Employee>;
  addEmployee: (e: React.MouseEvent) => void;
  deleteEmployee: (e: React.MouseEvent, name: string) => void;
}

const [useCtx, Provider] = createCtx<Context>();

export { useCtx as useHoemDetilContext, Provider };
