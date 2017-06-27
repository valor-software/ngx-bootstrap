/**
 * @copyright Valor Software
 * @copyright Angular ng-bootstrap team
 */

export class Trigger {
  public open: string;
  public close?: string;

  public constructor(open: string, close?: string) {
    this.open = open;
    this.close = close || open;
  }

  public isManual(): boolean { return this.open === 'manual' || this.close === 'manual'; }
}
