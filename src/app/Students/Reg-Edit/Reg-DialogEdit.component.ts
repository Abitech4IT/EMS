import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { RegEditComponent } from './Reg-edit.component';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { StudentRegService } from '../studentReg.service';
import { IRegform } from '../Reg.model';

@Component({
    template: ''
})
export class RegDialogEditComponent implements OnInit{
    regId: string;
    listData: IRegform;
    

    constructor( private dialog: MatDialog, private router: Router, 
        public route: ActivatedRoute, private studentreg: StudentRegService){}

    ngOnInit(){
        this.openEditDialog();
    }

    openEditDialog() {
        this.route.paramMap.subscribe((paramMap: ParamMap) => {
            if(paramMap.has('regId')){
                this.regId = paramMap.get('regId')
                this.studentreg.getregList(this.regId)
                .subscribe((regData)=>{
                    this.listData = {
                        id: regData._id,
                        firstname: regData.firstname,
                        lastname: regData.lastname,
                        regno: regData.regno,
                        email: regData.email,
                        address: regData.address,
                        phone: regData.phone,
                        dob: regData.dob,
                        state: regData.state,
                        gender: regData.gender
                    };
                     const dialogRef = this.dialog.open(RegEditComponent, {width: '600px',
                        data: {
                            reglist: this.listData
                        }
                     });
                     dialogRef.afterClosed().subscribe(result => {
                        this.router.navigate(['/list'], {relativeTo: this.route} );
                    });
            
                });
                
            }else{
                this.regId = null;
            }

        });

        
    }
}

// // this.studentreg.getregList(this.regId)
// //                 .subscribe(regData => { 
// //                     this.listData =  {
// //                         id: regData._id,
//                         firstname: regData.firstname,
//                         lastname: regData.lastname,
//                         regno: regData.regno,
//                         email: regData.email,
//                         address: regData.address,
//                         phone: regData.phone,
//                         dob: regData.dob,
//                         state: regData.state,
//                         gender: regData.gender
// //                     };
// //                 });
