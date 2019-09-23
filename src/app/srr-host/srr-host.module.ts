import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { SrrHostPage } from './srr-host.page';


//import the routes

import {SrrPageRoutingModule} from './srr-host.router.module';

const routes: Routes = [
  {
    path: '',
    component: SrrHostPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    SrrPageRoutingModule
  ],
  declarations: [SrrHostPage]
})
export class SrrHostPageModule {}
