import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { StudentRegService } from '../studentReg.service';

@Component({
    selector: 'app-regForm',
    templateUrl: './Reg-form.component.html',
    styleUrls: ['./Reg-form.component.css']
})
export class RegformComponent implements OnInit{
    form: FormGroup;

    constructor(private studentregService: StudentRegService){}

    ngOnInit(){
        this.form = new FormGroup({
            firstname: new FormControl(null, {validators:[Validators.required]}),
            lastname: new FormControl(null, {validators:[Validators.required]}),
            email: new FormControl(null, {validators:[Validators.required, Validators.email]}),
            address: new FormControl(null, {validators:[Validators.required]}),
            phone: new FormControl(null, {validators:[Validators.required]}),
            dob: new FormControl(null, {validators:[Validators.required]}),
            state: new FormControl(null, {validators:[Validators.required]}),
            gender: new FormControl(null, {validators:[Validators.required]})
        });
    }


    states: any = [
        {value: 'Kwara', viewValue: 'Kwara'},
        {value: 'Oyo', viewValue: 'Oyo'},
        {value: 'Lagos', viewValue: 'Lagos'},
        {value: 'Ogun', viewValue: 'Ogun'}
      ];
    
      onSave(){
          if(this.form.invalid){
              return;
          }
          this.studentregService.addReg(
              this.form.value.firstname, 
              this.form.value.lastname, 
              this.form.value.email,
              this.form.value.address,
              this.form.value.phone,
              this.form.value.dob,
              this.form.value.state,
              this.form.value.gender
              );
              this.form.reset();
      }

}