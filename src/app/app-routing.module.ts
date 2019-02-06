import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { environment } from '../environments/environment';
import { HomeComponent } from './components/home/home.component';
import { MacroscopeComponent } from './components/macroscope/macroscope.component';

const routes: Routes = [
  { path: '', component: HomeComponent, children: [{ path: ':iid', component: HomeComponent }] },
  { path: ':iid/:mid', component: MacroscopeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: environment.useHashRouting })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
