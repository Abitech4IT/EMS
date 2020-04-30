import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators, FormGroupDirective } from '@angular/forms';
import { StudentRegService } from '../studentReg.service';
import { mimeType } from './mime-type.validator';

function randomString(length, chars) {
    var result = '';
    for (var i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
    return result;
}

@Component({
    selector: 'app-regForm',
    templateUrl: './Reg-form.component.html',
    styleUrls: ['./Reg-form.component.css']
})
export class RegformComponent implements OnInit{
    form: FormGroup;
    imagePreview: string;

    constructor(private studentregService: StudentRegService){}

    rString = randomString(8, 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789abcdefghijklmnopqrstuvwxyz');

    ngOnInit(){
        this.form = new FormGroup({
            firstname: new FormControl(null, {validators:[Validators.required]}),
            lastname: new FormControl(null, {validators:[Validators.required]}),
            email: new FormControl(null, {validators:[Validators.required, Validators.email]}),
            regno: new FormControl(this.rString),
            address: new FormControl(null, {validators:[Validators.required]}),
            phone: new FormControl(null, {validators:[Validators.required]}),
            dob: new FormControl(null, {validators:[Validators.required]}),
            state: new FormControl(null, {validators:[Validators.required]}),
            gender: new FormControl(null, {validators:[Validators.required]}),
            image: new FormControl(null, {validators:[Validators.required], asyncValidators: [mimeType]})
        });
    }


    states: any = [
        {value: 'Kwara', viewValue: 'Kwara'},
        {value: 'Oyo', viewValue: 'Oyo'},
        {value: 'Lagos', viewValue: 'Lagos'},
        {value: 'Ogun', viewValue: 'Ogun'}
      ];
    
      onImagePicked(event: Event){
        const file = (event.target as HTMLInputElement).files[0];
        this.form.patchValue({image: file});
        this.form.get('image').updateValueAndValidity();
        const reader = new FileReader();
        reader.onload = () => {
            this.imagePreview = reader.result as string;
        };
        reader.readAsDataURL(file);
      }
    
      onSave(formDirective: FormGroupDirective){
          if(this.form.invalid){
              return;
          }
          this.studentregService.addReg(
              this.form.value.firstname, 
              this.form.value.lastname, 
              this.form.value.email,
              this.form.value.regno,
              this.form.value.address,
              this.form.value.phone,
              this.form.value.dob,
              this.form.value.state,
              this.form.value.gender,
              this.form.value.image

              );
              formDirective.resetForm();
              this.form.reset();
              
      }

}