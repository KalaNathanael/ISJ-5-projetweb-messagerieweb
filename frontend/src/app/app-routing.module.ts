import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContainerComponent } from './container/container.component';
import { ConnexionComponent } from './pages/connexion/connexion.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { RegisterComponent } from './pages/register/register.component';
import { AuthGuardService } from './_guards/auth-guard.service';

const routes: Routes = [
  {path:'register', component: RegisterComponent},
  {path:'login', component:ConnexionComponent},
  {path:'home', component: HomePageComponent},
  {path:'contact', component:ContainerComponent, canActivate:[AuthGuardService]},
  {path:'', redirectTo: 'home', pathMatch: 'full'}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    CommonModule,
    RouterModule,
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
