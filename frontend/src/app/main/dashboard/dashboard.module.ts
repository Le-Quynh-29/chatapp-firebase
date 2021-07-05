import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatRadioModule } from '@angular/material/radio';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PipesModule } from '../../core/pipes/pipes.module';

import { ActivationItemsComponent } from './activation-items/activation-items.component';
import { KhaiSonLapHuongComponent } from './khai-son-lap-huong/khai-son-lap-huong.component';
import { ActivationPrinciplesComponent } from './activation-principles/activation-principles.component';
import { DashboardComponent } from './dashboard.component';
import { DialogModule } from '../dialog/dialog.module';
import { DashboardRoutingModule } from './dashboard-routing.module';

@NgModule({
  declarations: [
    ActivationItemsComponent,
    KhaiSonLapHuongComponent,
    ActivationPrinciplesComponent,
    DashboardComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    DialogModule,
    MatDialogModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatIconModule,
    MatMenuModule,
    MatRadioModule,
    MatSidenavModule,
    MatToolbarModule,
    MatInputModule,
    PipesModule,
    MatButtonToggleModule,
    MatListModule
  ]
})
export class DashboardModule { }
