import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FrontPageComponent } from './Students/Front-Page/front-page.component';
import { RegformComponent } from './Students/Reg-create/Reg-form.component';
import { RegListComponent } from './Students/Reg-list/Reg-list.component';
import { RegDialogEditComponent } from './Students/Reg-Edit/Reg-DialogEdit.component';
import { SuccessMessageComponent } from './Students/successMessage.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { AuthGuard } from './auth/auth-guard';

const routes: Routes = [
    {path: '', component: FrontPageComponent },
    {path: 'register', component: RegformComponent },
    {path: 'regsuccess', component: SuccessMessageComponent},
    {path: 'login', component: LoginComponent},
    {path: 'signup', component: SignupComponent},

    {path: 'list', component: RegListComponent, canActivate:[AuthGuard], 
    children:[
        {
            path: 'edit/:regId', 
            component: RegDialogEditComponent, canActivate:[AuthGuard]
        }
    ]
 }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
    providers: [AuthGuard]
    
})
export class AppRoutingModule{}