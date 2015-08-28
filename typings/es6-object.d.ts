interface ObjectConstructor {
  /**
   * Copy the values of all of the enumerable own properties from one or more source objects to a
   * target object. Returns the target object.
   * @param target The target object to copy to.
   * @param sources One or more source objects to copy properties from.
   */
  assign(target: any, ...sources: any[]): any;

  /**
   * Returns true if the values are the same value, false otherwise.
   * @param value1 The first value.
   * @param value2 The second value.
   */
  is(value1: any, value2: any): boolean;

  /**
   * Sets the prototype of a specified object o to  object proto or null. Returns the object o.
   * @param o The object to change its prototype.
   * @param proto The value of the new prototype or null.
   * @remarks Requires `__proto__` support.
   */
  setPrototypeOf(o: any, proto: any): any;
}

declare function require(path:string): any;
