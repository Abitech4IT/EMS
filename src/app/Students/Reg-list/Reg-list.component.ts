import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Regform } from '../Reg.model';
import { StudentRegService } from '../studentReg.service';
import { MatTableDataSource } from '@angular/material';

@Component({
    selector:'app-Reglist',
    templateUrl: './Reg-list.component.html',
    styleUrls: ['./Reg-list.component.css']
    
})
export class RegListComponent implements OnInit, OnDestroy{

    studentData: Regform[] = [];
    private regSub: Subscription;
    private dataSource;

    constructor(private studentreg: StudentRegService){}

    displayedColumns: string[] = [
        'id',
        'firstname',
        'lastname',
        'email',
        'address',
        'phone',
        'dob',
        'gender',
        'state'
     ];

    ngOnInit(){
        this.studentData = this.studentreg.getregLists();
        this.regSub = this.studentreg.getregUpdateListener()
        .subscribe((studentData: Regform[]) =>{
            this.studentData = studentData;
            this.dataSource = new MatTableDataSource(studentData);
        });
        // console.log(this.studentData);
    }

    ngOnDestroy(){
        this.regSub.unsubscribe();
    }
    
}