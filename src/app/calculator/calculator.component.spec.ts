import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AngularFirestore } from '@angular/fire/firestore';
import { CalculatorComponent } from './calculator.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatRadioModule } from '@angular/material/radio';
import { MatStepperModule } from '@angular/material/stepper';
import { SharedModule } from '../shared/shared.module';
import { AuthService, MockAuthService } from '../core/auth.service';
import { AngularFireModule } from '@angular/fire';
import { firebaseConfig } from './../database-keys';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('CalculatorComponent', () => {
  let component: CalculatorComponent;
  let fixture: ComponentFixture<CalculatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CalculatorComponent ],
      imports: [
        AngularFireModule.initializeApp(firebaseConfig),
        MatExpansionModule,
        MatRadioModule,
        MatStepperModule,
        NoopAnimationsModule,
        SharedModule
      ],
      providers: [
        AngularFirestore,
        {
          provide: AuthService,
          useClass: MockAuthService
        }
      ],
      schemas: [ NO_ERRORS_SCHEMA ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalculatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
