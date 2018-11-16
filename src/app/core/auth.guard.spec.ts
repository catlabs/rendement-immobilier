import { TestBed, async, inject } from '@angular/core/testing';

import { AuthGuard } from './auth.guard';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { AuthService, MockAuthService } from './auth.service';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';

const FirestoreStub = {
  collection: (name: string) => ({
    doc: (_id: string) => ({
      valueChanges: () => new BehaviorSubject({ foo: 'bar' }),
      set: (_d: any) => new Promise((resolve, _reject) => resolve()),
    }),
  }),
};

describe('AuthGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: AngularFireAuth, useValue: FirestoreStub },
        {
          provide: Router,
          useClass: class { navigate = jasmine.createSpy('navigate'); }
        },
        {
          provide: AuthService,
          useClass: MockAuthService
        }
      ]
    });
  });

  it('should ...', inject([AuthGuard], (guard: AuthGuard) => {
    expect(guard).toBeTruthy();
  }));
});
