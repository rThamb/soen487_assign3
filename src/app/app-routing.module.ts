import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './guard/auth/auth.guard';

import { HomeComponent } from './components/home/home.component';
import { TeamDetailsComponent } from './components/team-details/team-details.component';



const routes: Routes = [
    {path: 'home', component: HomeComponent, canActivate : [AuthGuard]},
    {path: 'login', component: LoginComponent},
    {path: 'team', component: TeamDetailsComponent, canActivate : [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
