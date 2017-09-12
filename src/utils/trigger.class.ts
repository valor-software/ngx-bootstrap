/**
 * @copyright Valor Software
 * @copyright Angular ng-bootstrap team
 */

export class Trigger {
  open: string;
  close?: string;

  constructor(open: string, close?: string) {
    this.open = open;
    this.close = close || open;
  }

  isManual(): boolean {
    return this.open === 'manual' || this.close === 'manual';
  }
}
