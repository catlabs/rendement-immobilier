import { Component } from '@angular/core';
import { MatDialog } from '@angular/material';
import { CalculatorComponent } from '../calculator/calculator/calculator.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  
  constructor(public dialog: MatDialog) {}

  openDialogAddSimulation(){
    const dialogRef = this.dialog.open(CalculatorComponent, {
      width: '800px'
    });
  }
}
