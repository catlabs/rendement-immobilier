
import { fakeAsync, ComponentFixture, TestBed, tick } from '@angular/core/testing';

import { DashboardComponent } from './dashboard.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { AuthService, MockAuthService } from '../core/auth.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { firebaseConfig } from './../database-keys';
import { AngularFireModule } from '@angular/fire';
import { Simulation, SimulationId } from '../shared/models/simulation';
import { from } from 'rxjs';

const simulation: SimulationId = {
  id: '1',
  achat: {
    prix: 300000,
    type: 0.15
  },
  extraCosts: {
    charges: 300,
    precompte: 1500,
    travauxAchat: 10000,
    chargesCopro: 100
  },
  financement: {
    cash: 20000,
    taux: 2,
    years: 25
  },
  incomes: {
    loyer: 1500,
    videLocatif: 1
  },
  store: {
    name: 'test',
    url: undefined
  }
};

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  beforeEach(fakeAsync(() => {
    const input: Simulation[][] = [[]];

    const data = from(input);

    const collectionStub = {
      snapshotChanges: jasmine.createSpy('snapshotChanges').and.returnValue(data),
    };

    const angularFirestoreStub = {
      collection: jasmine.createSpy('collection').and.returnValue(collectionStub)
    };

    TestBed.configureTestingModule({
      declarations: [ DashboardComponent ],
      imports: [
        AngularFireModule.initializeApp(firebaseConfig),
        SharedModule
      ],
      providers: [
        {
          provide: AngularFirestore,
          useValue: angularFirestoreStub
        },
        {
          provide: AuthService,
          useClass: MockAuthService
        }
      ],
      schemas: [ NO_ERRORS_SCHEMA ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    tick(500);
  }));

  it('should compile', () => {
    component.simulations = from([[simulation]]);
    expect(component).toBeTruthy();
  });
});
