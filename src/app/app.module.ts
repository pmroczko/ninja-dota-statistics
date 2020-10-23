import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';

import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import {FullComponent } from './components/full/full.component'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { DemoMaterialModule } from './material.module';
import { AgGridModule } from 'ag-grid-angular';


const appRoutes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'full/:fullMode', component: FullComponent},
  { path: '',   redirectTo: '/home', pathMatch: 'full' },
]

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    FullComponent
  ],
  imports: [
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: false, 
        onSameUrlNavigation: 'reload' }
    ),
    BrowserModule,
    AppRoutingModule,
    DemoMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AgGridModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
