import { TemplateRef, ViewContainerRef } from '@angular/core';

export class BsComponentRef<T> {
  templateRef: TemplateRef<T>;
  viewContainer: ViewContainerRef;
}
