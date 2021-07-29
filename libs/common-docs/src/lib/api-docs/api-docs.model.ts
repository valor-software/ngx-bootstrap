/**
 * @author ng-team
 * @copyright ng-bootstrap
 */
export interface ClassDesc {
  fileName: string;
  className: string;
  description: string;
  properties: PropertyDesc[];
  methods: MethodDesc[];
}

export interface DirectiveDesc extends ClassDesc {
  selector: string;
  exportAs?: string;
  inputs: InputDesc[];
  outputs: OutputDesc[];
}

export interface PropertyDesc {
  name: string;
  type: string;
  description: string;
  defaultValue?: string;
}

export interface MethodDesc {
  name: string;
  description: string;
  args: ArgumentDesc[];
  returnType: string;
}

export interface ArgumentDesc {
  name: string;
  type: string;
}

export type InputDesc = PropertyDesc;

export type OutputDesc = PropertyDesc;

/**
 * :D
 */
export class NgApiDoc {
  [key: string]: any;
}

export function signature(method: MethodDesc): string {
  const args = method.args
    .map((arg: ArgumentDesc) => `${arg.name}: ${arg.type}`)
    .join(', ');
  return `${method.name}(${args})`;
}
