import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { IRegform } from '../Reg.model';
import { StudentRegService } from '../studentReg.service';
import { MatTableDataSource } from '@angular/material';

@Component({
    selector:'app-Reglist',
    templateUrl: './Reg-list.component.html',
    styleUrls: ['./Reg-list.component.css']
    
})

export class RegListComponent implements OnInit, OnDestroy{

    studentData: IRegform[] = [];
    private regSub: Subscription;
    private dataSource;    

    constructor(private studentreg: StudentRegService){}

    displayedColumns: string[] = [
        'index',
        'regno',
        'firstname',
        'lastname',
        'email',
        'address',
        'phone',
        'dob',
        'gender',
        'state',
        'action'
     ];

    //  columnsToDisplay: string[] = this.displayedColumns.slice();

    ngOnInit(){
        
        this.studentreg.getregLists();
        this.regSub = this.studentreg.getregUpdateListener()
        .subscribe((studentData: IRegform[]) =>{
            this.studentData = studentData;
            this.dataSource = new MatTableDataSource(studentData);
        });
         
    }

    onDelete(regid: string){
        this.studentreg.deleteReg(regid);
    }

    ngOnDestroy(){
        this.regSub.unsubscribe();
    }
    
}