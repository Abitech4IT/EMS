import { Component } from '@angular/core';

@Component({
    templateUrl: './successMessage.component.html',
    styleUrls: ['./successMessage.component.css']
})
export class SuccessMessageComponent{
    message: string = "Congratulation, Registration Completed!";

}