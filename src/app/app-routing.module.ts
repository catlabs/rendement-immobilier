import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/auth.guard';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RegisterPageComponent } from './pages/register-page/register-page.component';
import { VisitorPageComponent } from './pages/visitor-page/visitor-page.component';
import { SharedModule } from './shared/shared.module';

const appRoutes: Routes = [
  { path: 'login', component: LoginPageComponent },
  { path: 'sign-up', component: RegisterPageComponent },
  { path: '', component: VisitorPageComponent },
  { path: 'simulation/:id', component: VisitorPageComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] }
];

@NgModule({
  declarations: [
  ],
  imports: [
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: false } // <-- debugging purposes only
    ),
    SharedModule
  ],
  exports: [
  ]
})
export class AppRoutingModule { }
