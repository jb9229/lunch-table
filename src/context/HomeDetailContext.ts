import { Employee } from '../container/home/types';
import createCtx from '../context/CreateCtx';

interface Context {
  employeeList: Array<Employee>;
  addEmployee: (name: string) => void;
  deleteEmployee: (name: string) => void;
}

const [useCtx, Provider] = createCtx<Context>();

export { useCtx as useHoemDetilContext, Provider };
