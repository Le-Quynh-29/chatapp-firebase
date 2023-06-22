import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ActivationItemsComponent } from './activation-items/activation-items.component';
import { KhaiSonLapHuongComponent } from './khai-son-lap-huong/khai-son-lap-huong.component';
import { ActivationPrinciplesComponent } from './activation-principles/activation-principles.component';
import { DashboardComponent } from './dashboard.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      {
        path: 'activation-items',
        component: ActivationItemsComponent
      },
      {
        path: 'khai-son-lap-huong',
        component: KhaiSonLapHuongComponent
      },
      {
        path: 'activation-principles',
        component: ActivationPrinciplesComponent
      },
    ]
  },
]

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
