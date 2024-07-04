import { SourceCodeModel } from './source-code.model';

export interface ComponentExample {
  anchor: string;
  title: string;
  description?: string;
  component?: SourceCodeModel;
  html?: SourceCodeModel;
  style?: string;
  css?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  outlet?: any; // ToDo: Component<T>
}
