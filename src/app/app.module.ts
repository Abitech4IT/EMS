import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
   MatToolbarModule,
   MatInputModule,
   MatCardModule,
   MatButtonModule,
   MatSelectModule,
   MatRadioModule,
   MatTableModule,
   MatDialogModule
   } from '@angular/material';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { RegformComponent } from './Students/Reg-create/Reg-form.component';
import { RegListComponent } from './Students/Reg-list/Reg-list.component';
import { FrontPageComponent } from './Students/Front-Page/front-page.component';
import { AppRoutingModule } from './app-routing.module';
import { FooterComponent } from './footer/footer.component';
import { RegEditComponent } from './Students/Reg-Edit/Reg-edit.component';
import { RegDialogEditComponent } from './Students/Reg-Edit/Reg-DialogEdit.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    RegformComponent,
    RegListComponent,
    FrontPageComponent,
    RegEditComponent,
    RegDialogEditComponent
    

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatSelectModule,
    MatRadioModule,
    MatTableModule,
    HttpClientModule,
    MatDialogModule


  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [RegListComponent, RegEditComponent]
})
export class AppModule { }
