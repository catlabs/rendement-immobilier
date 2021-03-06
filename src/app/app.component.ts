import { Component } from '@angular/core';
import { Observable } from 'rxjs';

import { AuthService } from './core/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'catlabs-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  hasInit = false;
  items: Observable<any[]>;

  constructor(private authService: AuthService, private router: Router) {
      this.authService.user$.subscribe(
        (user) => {
          this.hasInit = true;
          if (user) {
            this.router.navigateByUrl('dashboard');
          }
        }
      );
  }

  logout() {
    this.authService.logout();
  }
}
