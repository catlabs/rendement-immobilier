import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VisitorPageComponent } from './visitor-page.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ActivatedRoute } from '@angular/router';
import { NO_ERRORS_SCHEMA } from '@angular/core';

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
        SharedModule
      ],
      providers: [ {provide: ActivatedRoute, useValue: fakeActivatedRoute} ],
      schemas: [ NO_ERRORS_SCHEMA ]
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
