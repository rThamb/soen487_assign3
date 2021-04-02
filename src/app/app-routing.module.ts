import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './guard/auth/auth.guard';


const routes: Routes = [
    // {path: 'home', component: PostListComponent, canActivate : [AuthGuard]},
    {path: 'login', component: LoginComponent, canActivate : [AuthGuard]},
    // {path: 'create', component: PostCreateComponent, canActivate : [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
