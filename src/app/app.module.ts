import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { RouterModule, Routes } from '@angular/router';

import { FlexLayoutModule } from '@angular/flex-layout';

import { firebaseConfig } from './database-keys';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireModule } from '@angular/fire';

import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule, MatButtonModule, MatDialogModule, MatDividerModule, MatExpansionModule, MatRadioModule, MatSnackBarModule, MatSidenavModule, MatStepperModule, MatProgressSpinnerModule, MatIconModule, MatListModule, MatGridListModule, MatCardModule, MatMenuModule, MatTableModule, MatTooltipModule, MatPaginatorModule, MatSortModule, MatFormFieldModule, MatOptionModule, MatSelectModule, MatInputModule } from '@angular/material';

import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TableComponent } from './table/table.component';
import { CalculatorComponent } from './calculator/calculator/calculator.component';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginPageComponent } from './pages/login-page/login-page.component';

import { CoreModule } from './core/core.module';
import { AuthGuard } from './core/auth.guard';
import { AuthService } from './core/auth.service';
import { RegisterPageComponent } from './pages/register-page/register-page.component';
import { VisitorPageComponent } from './pages/visitor-page/visitor-page.component';

const appRoutes: Routes = [
  { path: 'login', component: LoginPageComponent },
  { path: 'sign-up', component: RegisterPageComponent },
  { path: '', component: VisitorPageComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] }
];

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    TableComponent,
    CalculatorComponent,
    LoginPageComponent,
    RegisterPageComponent,
    VisitorPageComponent
  ],
  imports: [
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule,
    BrowserModule,
    BrowserAnimationsModule,
    CoreModule,
    FlexLayoutModule,
    LayoutModule,
    MatButtonModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatInputModule,
    MatStepperModule,     
    MatOptionModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatSelectModule,
    MatSidenavModule,
    MatSnackBarModule,
    MatIconModule,
    MatListModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatTableModule,
    MatToolbarModule,
    MatTooltipModule,
    MatPaginatorModule,
    MatSortModule,
    ReactiveFormsModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: false } // <-- debugging purposes only
    )
  ],
  providers: [AuthGuard, AuthService],
  entryComponents: [CalculatorComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
