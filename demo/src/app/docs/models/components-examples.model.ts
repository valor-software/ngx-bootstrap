export interface ComponentExample {
  anchor: string;
  title: string;
  demoName?: string;
  description?: string;
  component?: string;
  html?: string;
  css?: string;
  outlet?: any; // ToDo: Component<T>
}
