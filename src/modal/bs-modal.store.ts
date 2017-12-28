import { Injectable } from '@angular/core';
import { ComponentLoader } from '../component-loader/component-loader.class';
import { ModalContainerComponent } from './modal-container.component';

@Injectable()
export class BsModalStore {
  modalsCount = 0;
  lastDismissReason = '';
  loaders: ComponentLoader<ModalContainerComponent>[] = [];
  getModalsCount(): number {
    return this.modalsCount;
  }

  setDismissReason(reason: any): void {
    this.lastDismissReason = reason;
  }
  removeLoaders(level: number): void {
    this.loaders.splice(level - 1, 1);
    this.loaders.forEach(
      (loader: ComponentLoader<ModalContainerComponent>, i: number) => {
        loader.instance.level = i + 1;
      }
    );
  }
}
