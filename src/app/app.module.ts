import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
   MatToolbarModule,
   MatInputModule,
   MatCardModule,
   MatButtonModule,
   MatSelectModule,
   MatRadioModule,
   MatTableModule,
   MatDialogModule,
   MatProgressSpinnerModule,
   MatPaginatorModule,
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
import { SuccessMessageComponent } from './Students/successMessage.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { AuthInterceptor } from './auth/auth-interceptor';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    RegformComponent,
    RegListComponent,
    FrontPageComponent,
    RegEditComponent,
    RegDialogEditComponent,
    SuccessMessageComponent,
    LoginComponent,
    SignupComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatSelectModule,
    MatRadioModule,
    MatTableModule,
    MatProgressSpinnerModule,
    HttpClientModule,
    MatPaginatorModule,
    MatDialogModule

  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}],
  bootstrap: [AppComponent],
  entryComponents: [RegListComponent, RegEditComponent]
})
export class AppModule { }
