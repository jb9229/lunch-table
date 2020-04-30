export class Employee {
  constructor(name: string, id?: string) {
    this.id = id;
    this.name = name;
  }

  id: string | undefined;
  name: string;
}
