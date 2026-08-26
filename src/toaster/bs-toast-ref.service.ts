import { signal } from '@angular/core';

export class BsToastRef<T extends object> {
  public toastId = signal<number>(0);
  /**
   * Reference to the component instance inside the toast.
   * Null if toast was created with plain text.
   */
  public contentComponent = signal<T | null>(null);

  /**
   * Programmatically hide (dismiss) this specific toast.
   */
  public dismiss: () => void;

  constructor() {
    this.dismiss = () => {};
  }
}
