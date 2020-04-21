import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FrontPageComponent } from './Students/Front-Page/front-page.component';
import { RegformComponent } from './Students/Reg-create/Reg-form.component';
import { RegListComponent } from './Students/Reg-list/Reg-list.component';
import { RegDialogEditComponent } from './Students/Reg-Edit/Reg-DialogEdit.component';

const routes: Routes = [
    {path: '', component: FrontPageComponent },
    {path: 'register', component: RegformComponent },
    {path: 'list', component: RegListComponent, 
    children:[
        {
            path: 'edit/:regId', 
            component: RegDialogEditComponent
        }
    ]
 }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
    
})
export class AppRoutingModule{}