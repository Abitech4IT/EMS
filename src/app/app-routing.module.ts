import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FrontPageComponent } from './Students/Front-Page/front-page.component';
import { RegformComponent } from './Students/Reg-create/Reg-form.component';
import { RegListComponent } from './Students/Reg-list/Reg-list.component';

const routes: Routes = [
    {path: '', component: FrontPageComponent },
    {path: 'register', component: RegformComponent },
    {path: 'list', component: RegListComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
    
})
export class AppRoutingModule{}