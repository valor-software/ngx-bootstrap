export function each(arr: any[], cb): void {
  arr.forEach(cb);
}

export function assertEq(a: any, b: any, msg?: string): void {
  expect(a).toEqual(b/*, msg*/);
}

export function assertDeepEq(a: any, b: any, msg?: string): void {
  expect(a).toEqual(b/*, msg*/);
}

export function assertOk(val: any, msg?: string): void {
  expect(val).toBeTruthy(/*msg*/);
}

export function assertNotEqual(val1: any, val2: any, msg?: any): void {
  expect(val1).not.toEqual(val2/*, msg*/);
}
