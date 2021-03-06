import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
    templateUrl:'./login.component.html',
    styleUrls: ['./login.component.css']

})
export class LoginComponent{
    isLoading = false;

    constructor(public authservice: AuthService){}

    onLogin(form: NgForm){
        if(form.invalid){
            return;
        }
        this.authservice.loginUser(form.value.email, form.value.password);

    }

}