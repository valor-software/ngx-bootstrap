export interface ComponentExample {
  anchor: string;
  title: string;
  description?: string;
  component?: string;
  html?: string;
  style?: string;
  css?: string;
  outlet?: any; // ToDo: Component<T>
}
