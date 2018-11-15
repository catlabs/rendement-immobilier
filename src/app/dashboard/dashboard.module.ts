import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { DashboardComponent } from './dashboard.component';
import { CalculatorModule } from '../calculator/calculator.module';

@NgModule({
  declarations: [
    DashboardComponent
  ],
  imports: [
    CalculatorModule,
    SharedModule
  ]
})
export class DashboardModule { }
