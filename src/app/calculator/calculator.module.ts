import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { CalculatorComponent } from './calculator.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatRadioModule } from '@angular/material/radio';
import { MatStepperModule } from '@angular/material/stepper';

@NgModule({
  declarations: [ CalculatorComponent ],
  imports: [
    MatExpansionModule,
    MatRadioModule,
    MatStepperModule,
    SharedModule
  ],
  exports: [
    CalculatorComponent
  ]
})
export class CalculatorModule { }
