import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { IRegform } from '../Reg.model';
import { Router, ActivatedRoute } from '@angular/router';
import { StudentRegService } from '../studentReg.service';
import { mimeType } from '../Reg-create/mime-type.validator';

@Component({
    templateUrl: './Reg-edit.component.html',
    styleUrls: ['./Reg-edit.component.css']
})
export class RegEditComponent implements OnInit{
    imagePreview: string;


    constructor(public dialogref: MatDialogRef<RegEditComponent>, 
        private router: Router, private route: ActivatedRoute,
        private studentreg: StudentRegService,
        @Inject(MAT_DIALOG_DATA) public data:{reglist: IRegform}){}
       

    form: FormGroup;

    ngOnInit(){
        this.form = new FormGroup({
            firstname: new FormControl(this.data.reglist.firstname, {validators:[Validators.required]}),
            lastname: new FormControl(this.data.reglist.lastname, {validators:[Validators.required]}),
            email: new FormControl(this.data.reglist.email, {validators:[Validators.required, Validators.email]}),
            regno: new FormControl(this.data.reglist.regno),
            address: new FormControl(this.data.reglist.address, {validators:[Validators.required]}),
            phone: new FormControl(this.data.reglist.phone, {validators:[Validators.required]}),
            dob: new FormControl(this.data.reglist.dob, {validators:[Validators.required]}),
            state: new FormControl(this.data.reglist.state, {validators:[Validators.required]}),
            gender: new FormControl(this.data.reglist.gender, {validators:[Validators.required]}),
            image: new FormControl(this.data.reglist.imagePath, {validators:[Validators.required], 
                asyncValidators: [mimeType]})
        });

    }

    onSave(){
        let id = this.data.reglist.id;
        this.studentreg.updateReg(id, 
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
            this.dialogref.close();
            this.router.navigate(['/list'], {relativeTo: this.route} );
        

    }

    onCloseDialog(){
        this.dialogref.close();
        this.router.navigate(['/list'], {relativeTo: this.route} );
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

}

