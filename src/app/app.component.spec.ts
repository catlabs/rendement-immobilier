import { NO_ERRORS_SCHEMA, Directive, Input, DebugElement } from '@angular/core';
import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Router, RouterLink } from '@angular/router';
import { MatToolbarModule } from '@angular/material';
import { firebaseConfig } from './database-keys';
import { AngularFirestoreModule, AngularFirestore } from '@angular/fire/firestore';
import { AngularFireModule } from '@angular/fire';
import { AuthService, MockAuthService } from './core/auth.service';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[routerLink]',
  // tslint:disable-next-line:use-host-property-decorator
  host: { '(click)': 'onClick()' }
})
// tslint:disable-next-line:directive-class-suffix
export class RouterLinkDirectiveStub {
  @Input('routerLink') linkParams: any;
  navigatedTo: any = null;

  onClick() {
    this.navigatedTo = this.linkParams;
  }
}

fdescribe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let app: AppComponent;
  let auth: MockAuthService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        RouterLinkDirectiveStub
      ],
      imports: [
        AngularFireModule.initializeApp(firebaseConfig),
        AngularFirestoreModule,
        MatToolbarModule,
        SharedModule
      ],
      providers: [
        AngularFirestore,
        {
          provide: AuthService,
          useClass: MockAuthService
        },
        {
          provide: Router,
          useClass: class { navigate = jasmine.createSpy('navigate'); }
        }
      ],
      schemas: [ NO_ERRORS_SCHEMA ]
    }).compileComponents();
  }));

  beforeEach(async(() => {
    auth = TestBed.get(AuthService);
    fixture = TestBed.createComponent(AppComponent);
    app = fixture.debugElement.componentInstance;
    app.hasInit = true;
    fixture.detectChanges();
  }));

  it('should create the app', () => {
    expect(app).toBeTruthy();
  });

  describe('AppComponent routing', () => {
    it('should have a login button when not authentificated', async(() => {
      const loginButton = fixture.debugElement.query(By.css('.mat-toolbar button[routerLink="/login"]'));
      expect(loginButton).not.toBeNull();
      const loginRouterDirective = fixture.debugElement.query(By.directive(RouterLinkDirectiveStub)).injector.get(RouterLinkDirectiveStub);
      spyOn(loginRouterDirective, 'onClick');
      loginButton.nativeElement.click();
      fixture.detectChanges();
      expect(loginRouterDirective.onClick).toHaveBeenCalledTimes(1);
    }));

    it('should not have a login button when authentificated', () => {
      auth.user = 'test user';
      fixture.detectChanges();
      const loginButton = fixture.debugElement.query(By.css('.mat-toolbar button[routerLink="/login"]'));
      expect(loginButton).toBeNull();
    });

    it('should have a logout button when authentificated', () => {
      spyOn(app, 'logout');
      auth.user = 'test user';
      fixture.detectChanges();
      const logoutButton = fixture.debugElement.nativeElement.querySelector('.mat-toolbar button');
      expect(logoutButton.textContent).toBe('Deconnection');
      logoutButton.click();
      fixture.detectChanges();
      expect(app.logout).toHaveBeenCalledTimes(1);
    });

    it('should not have a logout button when not authentificated', () => {
      spyOn(app, 'logout');
      const ToolbarButtons: DebugElement[] = fixture.debugElement.queryAll(By.css('.mat-toolbar button'));
      ToolbarButtons.forEach((element: DebugElement) => {
        expect(element.nativeElement.textContent).not.toBe('Deconnection');
        expect(app.logout).not.toHaveBeenCalled();
      });
    });
  });

});
