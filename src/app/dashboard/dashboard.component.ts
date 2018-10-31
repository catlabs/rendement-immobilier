import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { CalculatorComponent } from '../calculator/calculator/calculator.component';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  public simulations: Observable<any[]>;

  constructor(public dialog: MatDialog, public db: AngularFirestore) {}

  ngOnInit() {
    this.simulations = this.db.collection('/simulations').valueChanges();
    this.simulations.subscribe(
      (simulations) => {
        console.log(simulations);
      }
    );

    const sim = this.db.doc('/simulations/BNzKe1v7E0IKslSzg6YZ').valueChanges();
    sim.subscribe(
      (simu) => {
        console.log(simu);
      }
    );
  }

  openDialogAddSimulation(sim: any = null) {
    console.log(sim.$key);
    const dialogRef = this.dialog.open(CalculatorComponent, {
      width: '800px'
    });
  }

  trackByFn = (idx, obj) => obj.$key;
}
