import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
   MatToolbarModule,
   MatInputModule,
   MatCardModule,
   MatButtonModule,
   MatSelectModule,
   MatRadioModule,
   MatTableModule
   } from '@angular/material';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { RegformComponent } from './Students/Reg-create/Reg-form.component';
import { RegListComponent } from './Students/Reg-list/Reg-list.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    RegformComponent,
    RegListComponent
    

  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatSelectModule,
    MatRadioModule,
    MatTableModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
