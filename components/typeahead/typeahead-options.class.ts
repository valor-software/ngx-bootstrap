export class TypeaheadOptions {
  public placement:string;
  public animation:boolean;

  public constructor(options:TypeaheadOptions) {
    Object.assign(this, options);
  }
}
