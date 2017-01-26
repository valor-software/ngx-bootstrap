import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'bs-datepicker',
  exportAs: 'bs-datepicker',
  template:`
<div class="bs-datepicker-multiple">
  <div class="left">
    <bs-date-picker-view bsRole="left"></bs-date-picker-view>
    <!--<bs-date-picker-view bsRole="right"></bs-date-picker-view>-->
  </div>
  <div class="right">
    <bs-custom-range-picker></bs-custom-range-picker>
  </div>
  <!--<div class="bs-datepicker-btns">-->
    <!--<button class="label-success colored"><span>Apply</span></button>-->
    <!--<button><span>Cancel</span></button>-->
  <!--</div>-->
</div>
`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BsDatePickerComponent {
}
