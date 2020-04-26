import { Employee } from '../container/home/types';
import createCtx from './CreateCtx';

interface Context {
  newEmployee: Employee;
  employeeList: Array<Employee> | undefined;
  addEmployee: (e: React.MouseEvent) => void;
  deleteEmployee: (e: React.MouseEvent<HTMLDivElement>, name: string) => void;
}

const [useCtx, Provider] = createCtx<Context>();

export { useCtx as useHoemDetilContext, Provider };
