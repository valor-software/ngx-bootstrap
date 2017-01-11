
export class TypeaheadMatch {
  public readonly value:string;
  public readonly item:any;
  protected header:boolean;

  public constructor(item:any, value:string = item, header:boolean = false) {
    this.item = item;
    this.value = value;
    this.header = header;
  }

  public isHeader():boolean {
    return this.header;
  }

  public toString():string {
    return this.value;
  }
}
