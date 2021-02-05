import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterComponent } from './pages/register/register.component';

const routes: Routes = [
  {path:'register', component: RegisterComponent},
  {path:'', redirectTo: 'register', pathMatch: 'full'}
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
