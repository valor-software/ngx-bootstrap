import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';

@Component({
  selector: 'sub-component',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './sub-component.html',
  styleUrls: ['./sub-component.css']
})
export class SubComponent implements OnInit, OnDestroy {
  @Input()
  name: string;

  @Output()
  onInit = new EventEmitter<void>();

  @Output()
  onDestroy = new EventEmitter<void>();

  ngOnInit() {
    Promise.resolve().then(() =>
      this.onInit.emit()
    );
  }

  ngOnDestroy() {
    this.onDestroy.emit();
  }
}
