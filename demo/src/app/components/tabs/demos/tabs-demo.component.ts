import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'tabs-demo',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './tabs-demo.component.html'
})
export class TabsDemoComponent {
  public tabs:any[] = [
    {title: 'Dynamic Title 1', content: 'Dynamic content 1'},
    {title: 'Dynamic Title 2', content: 'Dynamic content 2', disabled: true},
    {title: 'Dynamic Title 3', content: 'Dynamic content 3', removable: true},
    {title: 'Dynamic Title 4', content: 'Dynamic content 4', customClass: 'customClass'}
  ];

  public alertMe():void {
    setTimeout(function ():void {
      alert('You\'ve selected the alert tab!');
    });
  };

  public setActiveTab(index:number):void {
    this.tabs[index].active = true;
  };

  public removeTabHandler(/*tab:any*/):void {
    console.log('Remove Tab handler');
  };
}
