import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';

import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { RoleWrComponent } from './components/roleWr/roleWr.component'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { DemoMaterialModule } from './material.module';
import { AgGridModule } from 'ag-grid-angular';


const appRoutes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'roles_wr/:mode', component: RoleWrComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
]

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    RoleWrComponent
  ],
  imports: [
    RouterModule.forRoot(
      appRoutes,
      {
        enableTracing: false,
        onSameUrlNavigation: 'reload'
      }
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
