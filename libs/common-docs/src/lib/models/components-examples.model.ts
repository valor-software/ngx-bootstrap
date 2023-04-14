import { SourceCodeModel } from './source-code.model';

export interface ComponentExample {
  anchor: string;
  title: string;
  description?: string;
  component?: SourceCodeModel;
  html?: SourceCodeModel;
  style?: SourceCodeModel;
  css?: string;
  outlet?: any; // ToDo: Component<T>
}
