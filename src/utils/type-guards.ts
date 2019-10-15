export function isObject(candidate: any): candidate is object {
  return typeof candidate === 'object';
}

export function isBoolean(candidate: any): candidate is boolean {
  return typeof candidate === 'boolean';
}

export function isString(candidate: any): candidate is string {
  return typeof candidate === 'string';
}

export function isNumber(candidate: any): candidate is number {
  return typeof candidate === 'number';
}

export function isFunction(candidate: any): candidate is Function {
  return typeof candidate === 'function';
}

export function isUndefined(candidate: any): candidate is undefined {
  return candidate === undefined;
}

export function isNull(candidate: any): candidate is null {
  return candidate === null;
}
