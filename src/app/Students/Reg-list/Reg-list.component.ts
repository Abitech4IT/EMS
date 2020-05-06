import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { IRegform } from '../Reg.model';
import { StudentRegService } from '../studentReg.service';
import { MatTableDataSource, PageEvent } from '@angular/material';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
    selector:'app-Reglist',
    templateUrl: './Reg-list.component.html',
    styleUrls: ['./Reg-list.component.css']
    
})

export class RegListComponent implements OnInit, OnDestroy{
    isLoading = false;
    userIsAuthenticated = false;
    totalRegs = 0;
    RegsperPage = 2;
    currentPage = 1;
    pageSizeOptions = [1, 2, 5, 10];



    studentData: IRegform[] = [];
    private regSub: Subscription;
    private authListenerSub: Subscription;

    private dataSource;    

    constructor(private studentreg: StudentRegService, private authservice: AuthService){}

    displayedColumns: string[] = [
        'index',
        'regno',
        'image',
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
        this.isLoading = true;
        this.studentreg.getregLists(this.RegsperPage, this.currentPage);
        this.regSub = this.studentreg.getregUpdateListener()
        .subscribe((regData:{Regs: IRegform[], regCount: number}) =>{
            this.isLoading = false;
            this.totalRegs = regData.regCount;
            this.studentData = regData.Regs;
            this.dataSource = new MatTableDataSource(regData.Regs);
        });
        this.userIsAuthenticated = this.authservice.getIsAuth();
        this.authListenerSub = this.authservice.getAuthStatusListener()
        .subscribe(isAuthenticated => {
            this.userIsAuthenticated = isAuthenticated;
        });
         
    }

    onPageChange(pageData: PageEvent){
        this.isLoading = true;
        this.currentPage = pageData.pageIndex + 1;
        this.RegsperPage = pageData.pageSize;
        this.studentreg.getregLists(this.RegsperPage, this.currentPage);
    }


    onDelete(regid: string){
        this.isLoading = true;
        this.studentreg.deleteReg(regid).subscribe(()=>{
            this.studentreg.getregLists(this.RegsperPage, this.currentPage);
        });
    }

    ngOnDestroy(){
        this.regSub.unsubscribe();
        this.authListenerSub.unsubscribe();
    }
    
}