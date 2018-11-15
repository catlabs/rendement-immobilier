import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VisitorPageComponent } from './visitor-page.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { CalculatorModule } from 'src/app/calculator/calculator.module';
import { ActivatedRoute } from '@angular/router';

describe('VisitorPageComponent', () => {
  let component: VisitorPageComponent;
  let fixture: ComponentFixture<VisitorPageComponent>;

  const fakeActivatedRoute = {
    snapshot: {
      paramMap: {
        get: (_id: string) => {
          return '';
        }
      }
    }
  } as ActivatedRoute;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [VisitorPageComponent],
      imports: [
        CalculatorModule,
        SharedModule
      ],
      providers: [ {provide: ActivatedRoute, useValue: fakeActivatedRoute} ],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VisitorPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
