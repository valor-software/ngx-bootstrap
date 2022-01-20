// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function OnChange(): any {
  const sufix = 'Change';

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return function OnChangeHandler(target: any, propertyKey: string): void {
    const _key = ` __${propertyKey}Value`;
    Object.defineProperty(target, propertyKey, {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      get(): any {
        return this[_key];
      },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      set(value: any): void {
        const prevValue = this[_key];
        this[_key] = value;
        if (prevValue !== value && this[propertyKey + sufix]) {
          this[propertyKey + sufix].emit(value);
        }
      }
    });
  };
}
