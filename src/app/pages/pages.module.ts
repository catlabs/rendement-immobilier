import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { LoginPageComponent } from './login-page/login-page.component';
import { RegisterPageComponent } from './register-page/register-page.component';
import { VisitorPageComponent } from './visitor-page/visitor-page.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { CalculatorModule } from '../calculator/calculator.module';

@NgModule({
  declarations: [
    LoginPageComponent,
    RegisterPageComponent,
    VisitorPageComponent
  ],
  imports: [
    CalculatorModule,
    MatSnackBarModule,
    SharedModule
  ],
  exports: [
    LoginPageComponent,
    RegisterPageComponent,
    VisitorPageComponent
  ]
})
export class PagesModule { }
