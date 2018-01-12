// Pick the first defined of two or three arguments.
export function defaults<T>(a?: T, b?: T, c?: T): T {
  if (a != null) {
    return a;
  }
  if (b != null) {
    return b;
  }

  return c;
}
