import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { AppModule } from './app.module';

describe('App: Ng2Bootstrap', () => {
  let fixture: ComponentFixture<AppComponent>;
  /* tslint:disable-next-line: no-any */
  let context: any;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppModule]
    });

    fixture = TestBed.createComponent(AppComponent);
    context = fixture.componentInstance;
  });

  it('should create the app', (() => {
      expect(context).toBeTruthy();
    })
  );
});
