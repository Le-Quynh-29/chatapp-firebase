import { NgModule } from '@angular/core';
import { Routes, RouterModule, Router } from '@angular/router';
import {AppNoAuthGuard} from "./app-no-auth.guard";

const routes: Routes = [
  {
    path : '',
    redirectTo: '/auth',
    pathMatch: 'full'
  },
  {
    path : 'dashboard',
    loadChildren: () => import('./main/dashboard/dashboard.module').then(m => m.DashboardModule),
  },
  {
    path : 'chat',
    loadChildren: () => import('./main/chat/chat.module').then(m => m.ChatModule),
    // canActivate: [AppNoAuthGuard],
  },
  {
    path : 'auth',
    loadChildren: () => import('./main/auth/auth.module').then(m => m.AuthModule),
    // canActivate: [AppNoAuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
