import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AngularFireAuth } from 'angularfire2/auth';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {
  isLoading: boolean = false;
  loginForm: FormGroup;

  constructor(public fb: FormBuilder, private auth: AngularFireAuth, public snackBar: MatSnackBar, private router:Router) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: [undefined, [Validators.required, Validators.email]],
      password: [undefined, Validators.required]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.isLoading = true;
      this.auth.auth.signInWithEmailAndPassword(this.loginForm.value.email, this.loginForm.value.password)
        .then( (_result) => {
          this.isLoading = false;
          this.router.navigateByUrl("");
        }, (err) => {
          this.isLoading = false;
          this.snackBar.open("Erreur lors de l'inscription: "+err.message, "", {
            duration: 3000,
            panelClass: "error"
          });
        });
    }
  }

}
