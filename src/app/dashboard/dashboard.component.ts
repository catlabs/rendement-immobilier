import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { CalculatorComponent } from '../calculator/calculator/calculator.component';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Simulation, SimulationId } from './../shared/models/simulation';

@Component({
  selector: 'catlabs-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  public simulations: Observable<SimulationId[]>;

  constructor(public dialog: MatDialog, public db: AngularFirestore) { }

  ngOnInit() {
    const simulationsCollection: AngularFirestoreCollection<Simulation> = this.db.collection<Simulation>('simulations');
    this.simulations = simulationsCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Simulation;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );

    /* this.simulations.subscribe(
      (simulations) => {
        console.log(simulations);
      }
    ); */
  }

  openDialogAddSimulation(simId: any = null) {
    const dialogRef = this.dialog.open(CalculatorComponent, {
      data: { simId: simId },
      width: '800px'
    });
  }

  trackByFn = (idx, obj) => obj.$key;
}
