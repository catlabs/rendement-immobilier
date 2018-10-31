import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../core/auth.service';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'catlabs-immo-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.scss']
})
export class CalculatorComponent implements OnInit {
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

  constructor(private fb: FormBuilder, public auth:AuthService, private db:AngularFirestore) { }

  ngOnInit() {
    this.calculatorForm = this.fb.group({
      achat: this.fb.group({
        prix: [undefined, Validators.required],
        type: [0.15]
      }),
      extraCosts: this.fb.group({
        charges: [undefined, Validators.required],
        precompte: [undefined, Validators.required],
        travauxAchat: [undefined, Validators.required],
        travauxEntretien: [undefined, Validators.required]
      }),
      financement: this.fb.group({
        cash: [undefined],
        taux: [undefined, Validators.required],
        years: [undefined, Validators.required]
      }),
      incomes: this.fb.group({
        loyer: [undefined, Validators.required],
        videLocatif: [undefined, Validators.required]
      }),
      store: this.fb.group({
        name: [undefined, Validators.required]
      })
    });

    this.calculatorForm = this.fb.group({
      achat: this.fb.group({
        prix: [280000, Validators.required],
        type: [0.15]
      }),
      extraCosts: this.fb.group({
        charges: [350, Validators.required],
        precompte: [1000, Validators.required],
        travauxAchat: [10000, Validators.required],
        travauxEntretien: [50, Validators.required]
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
    });


    this.generateResult();
    // console.log(this.calculatorForm.value);
    // (100000 * 0.02 / 12) / ( 1 - Math.pow(( 1 + 0.02 / 12 ), -240))

    this.calculatorForm.valueChanges.subscribe(val=>{
      this.generateResult();
      // this.calculatorForm.get('enregistrement').setValue(val.achat*val.type, {onlySelf: true});
    });
  }

  generateResult(){
    const values = this.calculatorForm.getRawValue();
    this.achat.total = values.achat.prix + (values.achat.prix*values.achat.type);
    this.achat.emprunt = this.achat.total + values.extraCosts.travauxAchat - values.financement.cash;
    this.sorties.emprunt = Math.round((this.achat.emprunt * (values.financement.taux/100) / 12) / ( 1 - Math.pow(( 1 + (values.financement.taux/100) / 12 ), -(values.financement.years*12))));
    this.achat.totalWithInterest = this.sorties.emprunt * values.financement.years * 12;
    this.sorties.total = Math.round(this.sorties.emprunt + values.extraCosts.charges + values.extraCosts.precompte/12 + values.extraCosts.travauxEntretien);

    this.incomes.loyer = values.incomes.loyer;
    this.incomes.videLocatif = values.incomes.videLocatif;
    this.incomes.totalNet = this.incomes.loyer * ((12-this.incomes.videLocatif)/12);

    this.balance = this.incomes.totalNet - this.sorties.total;
  }

  onSubmit() {
    this.db.collection('simulations').add({...this.calculatorForm.value, ...{balance: this.balance, uid: this.auth.user.uid}});
  }
}
