import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/auth';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';

@Component({
  selector: 'catlabs-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss']
})
export class RegisterPageComponent implements OnInit {
  isLoading = false;
  registerForm: FormGroup;

  constructor(public fb: FormBuilder, private auth: AngularFireAuth, public snackBar: MatSnackBar, private router: Router) { }

  ngOnInit() {
    this.registerForm = this.fb.group({
      email: [undefined, [Validators.required, Validators.email]],
      password: [undefined, Validators.required]
    });
  }

  onSubmit() {
    if (this.registerForm.valid) {
      this.isLoading = true;
      this.auth.auth.createUserWithEmailAndPassword(this.registerForm.value.email, this.registerForm.value.password)
        .then((_result) => {
          this.snackBar.open('Vous êtes inscrit!', '', {
            duration: 3000,
            panelClass: 'success'
          });
          this.isLoading = false;
          this.auth.auth.signInWithEmailAndPassword(this.registerForm.value.email, this.registerForm.value.password);
          this.router.navigateByUrl('dashboard');

        }, (err) => {
          this.snackBar.open('Erreur lors de l\'inscription: ' + err.message, '', {
            duration: 3000,
            panelClass: 'error'
          });
          this.isLoading = false;
        });
    }
  }
}
