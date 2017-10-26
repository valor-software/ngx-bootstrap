import { Component, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TabsetConfig } from '../tabs/tabset.config';

import { TabsModule } from '../tabs/tabs.module';
import { TabsetComponent } from '../tabs/tabset.component';

@Component({
  selector: 'tabs-test',
  template: ''
})
class TestTabsetComponent {
  isVertical: Boolean = false;
  isJustified: Boolean = false;
  tabs: any[] = [
    { title: 'tab1', content: 'tab1 content', customClass: 'testCustomClass' },
    { title: 'tab2', content: 'tab2 content', disabled: true },
    { title: 'tab3', content: 'tab3 content', removable: true }
  ];
  @ViewChild('tabset') tabset: TabsetComponent;

  constructor(config: TabsetConfig) {
    Object.assign(this, config);
  }

  _select(e: TabsModule): TabsModule {
    return e;
  }

  _deselect(e: TabsModule): TabsModule {
    return e;
  }

  _removed(e: TabsModule): TabsModule {
    return e;
  }
}

const html = `
  <tabset #tabset [justified]="isJustified"
          [vertical]="isVertical">
    <tab heading="tab0" (deselect)="_deselect($event)">tab0 content</tab>
    <tab *ngFor="let tab of tabs"
         [disabled]="tab.disabled"
         [customClass]="tab.customClass"
         [active]="tab.active"
         [removable]="tab.removable"
         (select)="_select($event)"
         (deselect)="_deselect($event)"
         (removed)="_removed($event)"
         [heading]="tab.title">{{ tab.content }}</tab>
  </tabset>
`;

function getTabItems(nativeEl: HTMLElement): NodeListOf<Element> {
  return nativeEl.querySelectorAll('.nav-item');
}

function getTabTitles(nativeEl: HTMLElement): NodeListOf<Element> {
  return nativeEl.querySelectorAll('.nav-link');
}

function getTabContent(nativeEl: HTMLElement): NodeListOf<Element> {
  return nativeEl.querySelectorAll('.tab-content .tab-pane');
}

function expectActiveTabs(nativeEl: HTMLElement, active: boolean[]): void {
  const tabItems = getTabItems(nativeEl);
  const tabContent = getTabContent(nativeEl);
  expect(tabItems.length).toBe(active.length);
  expect(tabContent.length).toBe(active.length);

  for (let i = 0; i < active.length; i++) {
    if (active[i]) {
      expect(tabItems[i].classList).toContain('active');
      expect(tabContent[i].classList).toContain('active');
    } else {
      expect(tabItems[i].classList).not.toContain('active');
      expect(tabContent[i].classList).not.toContain('active');
    }
  }
}

describe('Component: Tabs', () => {
  let fixture: ComponentFixture<any>;
  let context: any;
  let element: any;

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
      imports: [TabsModule.forRoot()]
    });
    TestBed.overrideComponent(TestTabsetComponent, { set: { template: html } });
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
    const str = 'test title';
    context.tabs[1].title = str;
    fixture.detectChanges();
    const tabTitles = getTabTitles(element);
    expect(
      (tabTitles[2] as HTMLAnchorElement).getElementsByTagName('span')[0]
        .textContent
    ).toBe(str);
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
    expect(
      (tabTitles[3] as HTMLAnchorElement).querySelectorAll(
        'span.bs-remove-tab'
      ).length
    ).toEqual(1);
  });

  it('should remove tab on click on remove icon', () => {
    const tabTitlesBefore = getTabTitles(element);
    expect(tabTitlesBefore.length).toEqual(4);
    const el = (tabTitlesBefore[3] as HTMLAnchorElement).querySelectorAll(
      'span.bs-remove-tab'
    )[0];
    (el as HTMLSpanElement).click();

    fixture.detectChanges();
    const tabTitlesAfter = getTabTitles(element);
    expect(tabTitlesAfter.length).toEqual(3);
  });

  it('should select another tab if the active tab is removed', () => {
    context.tabset.tabs[0].active = true;
    context.tabset.removeTab(context.tabset.tabs[0]);
    fixture.detectChanges();
    expectActiveTabs(element, [true, false, false]);
  });

  it('should not select another tab if the active tab is removed and reselect is set to false', () => {
    context.tabset.tabs[0].active = true;
    context.tabset.removeTab(context.tabset.tabs[0], {
      reselect: false,
      emit: false
    });
    fixture.detectChanges();
    expectActiveTabs(element, [false, false, false]);
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
    expect(element.querySelectorAll('ul.nav')[0].classList).not.toContain(
      'nav-stacked'
    );
    context.isVertical = true;
    fixture.detectChanges();
    expect(element.querySelectorAll('ul.nav')[0].classList).toContain(
      'nav-stacked'
    );
  });

  it('should add class nav-justified for justified', () => {
    expect(element.querySelector('ul.nav').classList).not.toContain(
      'nav-justified'
    );
    context.isJustified = true;
    fixture.detectChanges();
    expect(element.querySelector('ul.nav').classList).toContain(
      'nav-justified'
    );
  });

  it('should emit select/deselect', () => {
    const tabTitles = getTabTitles(element);
    (tabTitles[1] as HTMLAnchorElement).click();
    fixture.detectChanges();

    expect(context._deselect).toHaveBeenCalled();
    expect(context._select).toHaveBeenCalledWith(
      jasmine.objectContaining({
        heading: 'tab1'
      })
    );
  });

  it('should emit remove on remove tab', () => {
    const tabTitles = getTabTitles(element);
    const el = (tabTitles[3] as HTMLAnchorElement).querySelectorAll(
      'span.bs-remove-tab'
    )[0];
    (el as HTMLSpanElement).click();
    fixture.detectChanges();

    expect(context._removed).toHaveBeenCalledWith(
      jasmine.objectContaining({
        heading: 'tab3'
      })
    );
  });

  it('should set class on a tab item through [customClass]', () => {
    const tabItems = getTabItems(element);

    expect(tabItems[1].classList).toContain('testCustomClass');
  });

  it('should prevent interference of [customClass] and state classes', () => {
    const tabItems = getTabItems(element);
    const tabTitles = getTabTitles(element);

    expect(tabItems[1].classList).toContain('testCustomClass');
    (tabTitles[1] as HTMLAnchorElement).click();
    fixture.detectChanges();
    expect(tabItems[1].classList).toContain('testCustomClass');
    expectActiveTabs(element, [false, true, false, false]);

    context.tabs[0].customClass = 'otherCustomClass';
    fixture.detectChanges();

    expect(tabItems[1].classList).not.toContain('testCustomClass');
    expect(tabItems[1].classList).toContain('otherCustomClass');
    expectActiveTabs(element, [false, true, false, false]);
  });
});
