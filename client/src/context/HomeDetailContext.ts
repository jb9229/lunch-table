import { Employee } from '../container/home/types';
import createCtx from './CreateCtx';

interface Context {
  newEmployee: Employee;
  employeeList: Array<Employee> | undefined;
  arrangedEmployList: Array<Array<Employee>> | undefined;
  addEmployee: (e: React.MouseEvent) => void;
  deleteEmployee: (e: React.MouseEvent<HTMLDivElement>, name: string) => void;
  arrangeEmployee: (e: React.MouseEvent<HTMLDivElement>, tableCnt: number, minArrageCnt: number) => void;
}

const [useCtx, Provider] = createCtx<Context>();

export { useCtx as useHoemDetilContext, Provider };
