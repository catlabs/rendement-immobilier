import { Component, OnInit, Inject, Optional, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';
import { MAT_DIALOG_DATA } from '@angular/material';
import { Observable } from 'rxjs';
import { AuthService } from '../../core/auth.service';
import { Simulation } from '../../shared/models/simulation';

@Component({
  selector: 'catlabs-immo-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.scss']
})
export class CalculatorComponent implements OnInit {
  @Input() simulationId: string;

  achat = {
    emprunt: 0,
    total: 0,
    totalWithInterest: 0
  };
  balance: number;
  incomes = {
    loyer: 0,
    videLocatif: 0,
    totalNet: 0
  };
  sorties = {
    emprunt: 0,
    total: 0
  };

  calculatorForm: FormGroup;

  isNew: Boolean = true;

  simulation$: Observable<Simulation>;
  simulation: Simulation = {
    achat: {
      prix: undefined,
      type: 0.15
    },
    extraCosts: {
      charges: undefined,
      precompte: undefined,
      travauxAchat: undefined,
      chargesCopro: undefined
    },
    financement: {
      cash: undefined,
      taux: undefined,
      years: undefined
    },
    incomes: {
      loyer: undefined,
      videLocatif: undefined
    },
    store: {
      name: undefined,
      url: undefined
    }
  };

  constructor(
    private fb: FormBuilder,
    public auth: AuthService,
    private db: AngularFirestore,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit() {
    if (this.simulationId) {
      this.data = {
        simId: this.simulationId
      };
    }

    if (this.data && this.data.simId) {
      this.simulation$ = this.db.doc<Simulation>('simulations/' + this.data.simId).valueChanges();
      this.simulation$.subscribe(
        (simulation: Simulation) => {
          if (simulation) {
            this.simulation = simulation;
            this.isNew = false;
            this.populateForm();
          }
        }
      );
    }
    this.populateForm();
    // (100000 * 0.02 / 12) / ( 1 - Math.pow(( 1 + 0.02 / 12 ), -240))
    this.calculatorForm.valueChanges.subscribe(val => {
      this.generateResult();
      // this.calculatorForm.get('enregistrement').setValue(val.achat*val.type, {onlySelf: true});
    });
  }

  generateResult() {
    const values = this.calculatorForm.getRawValue();
    this.achat.total = values.achat.prix + (values.achat.prix * values.achat.type);
    this.achat.emprunt = this.achat.total + values.extraCosts.travauxAchat - values.financement.cash;
    this.sorties.emprunt = Math.round(
      (this.achat.emprunt * (values.financement.taux / 100) / 12) /
      (1 - Math.pow((1 + (values.financement.taux / 100) / 12), -(values.financement.years * 12)))
    );
    this.achat.totalWithInterest = this.sorties.emprunt * values.financement.years * 12;
    this.sorties.total = Math.round(
      this.sorties.emprunt + values.extraCosts.charges + values.extraCosts.precompte / 12 + values.extraCosts.chargesCopro
    );
    this.incomes.loyer = values.incomes.loyer;
    this.incomes.videLocatif = values.incomes.videLocatif;
    this.incomes.totalNet = this.incomes.loyer * ((12 - this.incomes.videLocatif) / 12);

    this.balance = this.incomes.totalNet - this.sorties.total;
  }

  populateForm() {
    this.calculatorForm = this.fb.group({
      achat: this.fb.group({
        prix: [this.simulation.achat.prix, Validators.required],
        type: [this.simulation.achat.type]
      }),
      extraCosts: this.fb.group({
        charges: [this.simulation.extraCosts.charges, Validators.required],
        precompte: [this.simulation.extraCosts.precompte, Validators.required],
        travauxAchat: [this.simulation.extraCosts.travauxAchat, Validators.required],
        chargesCopro: [this.simulation.extraCosts.chargesCopro, Validators.required]
      }),
      financement: this.fb.group({
        cash: [this.simulation.financement.cash],
        taux: [this.simulation.financement.taux, Validators.required],
        years: [this.simulation.financement.years, Validators.required]
      }),
      incomes: this.fb.group({
        loyer: [this.simulation.incomes.loyer, Validators.required],
        videLocatif: [this.simulation.incomes.videLocatif, Validators.required]
      }),
      store: this.fb.group({
        name: [this.simulation.store.name, Validators.required],
        url: [this.simulation.store.url]
      })
    });
    this.generateResult();

    /*this.calculatorForm = this.fb.group({
      achat: this.fb.group({
        prix: [280000, Validators.required],
        type: [0.15]
      }),
      extraCosts: this.fb.group({
        charges: [350, Validators.required],
        precompte: [1000, Validators.required],
        travauxAchat: [10000, Validators.required],
        chargesCopro: [50, Validators.required]
      }),
      financement: this.fb.group({
        cash: [20000],
        taux: [1.8, Validators.required],
        years: [20, Validators.required]
      }),
      incomes: this.fb.group({
        loyer: [1700, Validators.required],
        videLocatif: [1, Validators.required]
      }),
      store: this.fb.group({
        name: [undefined, Validators.required]
      })
    });*/
  }

  onSubmit() {
    if (this.data.simId) {
      this.db.doc('simulations/' + this.data.simId).update(
        { ...this.calculatorForm.value, ...{ balance: this.balance, uid: this.auth.user.uid } }
      );
    } else {
      this.db.collection('simulations').add({ ...this.calculatorForm.value, ...{ balance: this.balance, uid: this.auth.user.uid } });
    }
  }
}
