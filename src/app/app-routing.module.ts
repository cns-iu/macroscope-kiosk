import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { environment } from '../environments/environment';
import { HomeComponent } from './components/home/home.component';
import { MacroscopeComponent } from './components/macroscope/macroscope.component';

const routes: Routes = [
  {
    path: 'home', component: HomeComponent, children: [
      { path: 'page/:id', component: HomeComponent }
    ]
  },
  { path: 'macroscope/:id', component: MacroscopeComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: environment.useHashRouting })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
