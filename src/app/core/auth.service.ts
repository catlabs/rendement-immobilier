import { Injectable } from '@angular/core';
import { Observable, Observer, Subject } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public user: firebase.User;
  private userSubject: Subject<firebase.User>;
  public user$: Observable<firebase.User>;

  constructor(private auth:AngularFireAuth) {
    this.userSubject = new Subject();
    this.user$ = this.userSubject.asObservable();
    this.auth.user.subscribe(
      (user: firebase.User) => {
        this.userSubject.next(user);
        this.user = user;
      }
    );
  }

  logout(){
    this.auth.auth.signOut();
  }
}
