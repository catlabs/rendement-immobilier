import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';

import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';

@NgModule({
  imports: [
    CommonModule,
    AngularFireAuthModule,
    AngularFirestoreModule,
  ],
  providers: [AuthService, AuthGuard]
})
export class CoreModule { }
