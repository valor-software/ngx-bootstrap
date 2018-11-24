/*tslint:disable:no-invalid-this */
/* tslint:disable-next-line: no-any */
export function OnChange(defaultValue?: any): any {
  const sufix = 'Change';

  /* tslint:disable-next-line: no-any */
  return function OnChangeHandler(target: any, propertyKey: string): void {
    const _key = ` __${propertyKey}Value`;
    Object.defineProperty(target, propertyKey, {
      /* tslint:disable-next-line: no-any */
      get(): any {
        return this[_key];
      },
      /* tslint:disable-next-line: no-any */
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
/* tslint:enable */
