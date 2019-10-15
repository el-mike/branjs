export interface IConstructable<T = any> {
  new(...args: any[]): T;
  prototype?: T;
}
