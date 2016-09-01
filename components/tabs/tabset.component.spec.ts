import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabsModule } from './tabs.module';

const html = `
  <tabset [justified]="isJustified"
          [vertical]="isVertical">
    <tab heading="tab0">tab0 content</tab>
    <tab *ngFor="let tab of tabs"
         [disabled]="tab.disabled"
         [active]="tab.active"
         [removable]="tab.removable"
         (select)="_select($event)"
         (deselect)="_deselect($event)"
         (removed)="_removed($event)"
         [heading]="tab.title">{{ tab.content }}</tab>
  </tabset>
`;

function getTabTitles(nativeEl:HTMLElement):NodeListOf<Element> {
  return nativeEl.querySelectorAll('.nav-link');
}

function getTabContent(nativeEl:HTMLElement):NodeListOf<Element> {
  return nativeEl.querySelectorAll('.tab-content .tab-pane');
}

function expectActiveTabs(nativeEl:HTMLElement, active:boolean[]):void {
  const tabTitles = getTabTitles(nativeEl);
  const tabContent = getTabContent(nativeEl);

  expect(tabTitles.length).toBe(active.length);
  expect(tabContent.length).toBe(active.length);

  for (let i = 0; i < active.length; i++) {
    if (active[i]) {
      expect(tabTitles[i].classList).toContain('active');
      expect(tabContent[i].classList).toContain('active');
    } else {
      expect(tabTitles[i].classList).not.toContain('active');
      expect(tabContent[i].classList).not.toContain('active');
    }
  }
}

describe('Component: Tabs', () => {
  let fixture:ComponentFixture<any>;
  let context:any;
  let element:any;

  // beforeEach(async(inject([TestComponentBuilder], (tcb: TestComponentBuilder) => {
  //   return tcb
  //     .overrideTemplate(TestTabsetComponent, html)
  //     .createAsync(TestTabsetComponent)
  //     .then((f: ComponentFixture<any>) => {
  //       fixture = f;
  //       context = fixture.componentInstance;
  //       spyOn(context, '_select');
  //       spyOn(context, '_deselect');
  //       spyOn(context, '_removed');
  //       element = fixture.nativeElement;
  //       fixture.detectChanges();
  //     });
  // })));

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestTabsetComponent],
      imports: [TabsModule]
    });
    TestBed.overrideComponent(TestTabsetComponent, {set: {template: html}});
    fixture = TestBed.createComponent(TestTabsetComponent);
    context = fixture.componentInstance;
    spyOn(context, '_select');
    spyOn(context, '_deselect');
    spyOn(context, '_removed');
    element = fixture.nativeElement;
    fixture.detectChanges();
  });

  it('should select first tab as active by default', () => {
    expectActiveTabs(element, [true, false, false, false]);
  });

  it('should set tab header', () => {
    const str:string = 'test title';
    context.tabs[1].title = str;
    fixture.detectChanges();
    const tabTitles = getTabTitles(element);
    expect((tabTitles[2] as HTMLAnchorElement).getElementsByTagName('span')[0].textContent).toBe(str);
  });

  it('should mark the requested tab as active', () => {
    context.tabs[0].active = true;
    fixture.detectChanges();
    expectActiveTabs(element, [false, true, false, false]);
  });

  it('should ignore click on disabled tab', () => {
    const tabTitles = getTabTitles(element);
    (tabTitles[2] as HTMLAnchorElement).click();
    fixture.detectChanges();
    expectActiveTabs(element, [true, false, false, false]);
  });

  it('should appear additional button if removable is true', () => {
    const tabTitles = getTabTitles(element);
    expect((tabTitles[3] as HTMLAnchorElement).querySelectorAll('span span.glyphicon-remove-circle').length).toEqual(1);
  });

  it('should remove tab on click on remove icon', () => {
    const tabTitlesBefore = getTabTitles(element);
    expect(tabTitlesBefore.length).toEqual(4);
    const el = (tabTitlesBefore[3] as HTMLAnchorElement).querySelectorAll('span span.glyphicon-remove-circle')[0];
    (el as HTMLSpanElement).click();

    fixture.detectChanges();
    const tabTitlesAfter = getTabTitles(element);
    expect(tabTitlesAfter.length).toEqual(3);
  });

  it('should set tab as active on click and disable another active', () => {
    const tabTitles = getTabTitles(element);

    (tabTitles[1] as HTMLAnchorElement).click();
    fixture.detectChanges();
    expectActiveTabs(element, [false, true, false, false]);

    (tabTitles[0] as HTMLAnchorElement).click();
    fixture.detectChanges();
    expectActiveTabs(element, [true, false, false, false]);
  });

  it('should have only one active tab if several marked as active', () => {
    context.tabs[0].active = true;
    context.tabs[1].active = true;
    fixture.detectChanges();
    expectActiveTabs(element, [false, true, false, false]);
  });

  it('should add class nav-stacked for vertical mode', () => {
    expect(element.querySelectorAll('ul.nav')[0].classList).not.toContain('nav-stacked');
    context.isVertical = true;
    fixture.detectChanges();
    expect(element.querySelectorAll('ul.nav')[0].classList).toContain('nav-stacked');
  });

  it('should add class nav-justified for justified', () => {
    expect(element.querySelector('ul.nav').classList).not.toContain('nav-justified');
    context.isJustified = true;
    fixture.detectChanges();
    expect(element.querySelector('ul.nav').classList).toContain('nav-justified');
  });

  it('should emit select/deselect', () => {
    const tabTitles = getTabTitles(element);
    (tabTitles[1] as HTMLAnchorElement).click();
    fixture.detectChanges();

    expect(context._deselect).toHaveBeenCalled();
    expect(context._select).toHaveBeenCalledWith(jasmine.objectContaining({
      heading: 'tab1'
    }));
  });

  it('should emit remove on remove tab', () => {
    const tabTitles = getTabTitles(element);
    const el = (tabTitles[3] as HTMLAnchorElement).querySelectorAll('span span.glyphicon-remove-circle')[0];
    (el as HTMLSpanElement).click();
    fixture.detectChanges();

    expect(context._removed).toHaveBeenCalledWith(jasmine.objectContaining({
      heading: 'tab3'
    }));
  });
});

@Component({
  selector: 'tabs-test',
  template: ''
})

class TestTabsetComponent {
  public isVertical:Boolean = false;
  public isJustified:Boolean = false;
  public tabs:Array<any> = [
    {title: 'tab1', content: 'tab1 content'},
    {title: 'tab2', content: 'tab2 content', disabled: true},
    {title: 'tab3', content: 'tab3 content', removable: true}
  ];

  public _select(e:TabsModule):TabsModule {
    return e;
  }

  public _deselect(e:TabsModule):TabsModule {
    return e;
  }

  public _removed(e:TabsModule):TabsModule {
    return e;
  }
}
