/*tslint:disable:no-invalid-this */
export function OnChange(defaultValue?:any):any {
  const sufix = 'Change';
  return function OnChangeHandler(target:any, propertyKey:string):void {
    let _key = ` __${propertyKey}Value`;
    Object.defineProperty(target, propertyKey, {
      get():any { return this[_key]; },
      set(value:any):void {
        this[_key] = value;
        this[propertyKey + sufix].emit(value);
      }
    });
  };
}
/* tslint:enable */
