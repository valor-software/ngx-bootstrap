export class TypeaheadOptions {
  public placement:string;
  public animation:boolean;

  constructor(options:TypeaheadOptions) {
    Object.assign(this, options);
  }
}
