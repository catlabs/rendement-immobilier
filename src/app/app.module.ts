import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core/core.module';

import { firebaseConfig } from './database-keys';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireModule } from '@angular/fire';

import { AuthGuard } from './core/auth.guard';
import { AuthService } from './core/auth.service';

import { MatToolbarModule } from '@angular/material';

import { AppComponent } from './app.component';
import { CalculatorComponent } from './calculator/calculator.component';
import { AppRoutingModule } from './app-routing.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { PagesModule } from './pages/pages.module';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule,
    BrowserModule,
    BrowserAnimationsModule,
    CoreModule,
    RouterModule,
    SharedModule,
    MatToolbarModule,
    AppRoutingModule,
    DashboardModule,
    PagesModule
  ],
  providers: [AuthGuard, AuthService],
  entryComponents: [CalculatorComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
