import { Injectable } from '@angular/core';
import { IRegform } from './Reg.model';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({providedIn: 'root'})
export class StudentRegService{
    private RegForm: IRegform[] = [];
    private regUpdated = new Subject<IRegform[]>();    
    

    constructor(private http: HttpClient, private router: Router){}

    getregLists(){
       this.http.get<{message: string, Reglists: any}>('http://localhost:3000/api/Reglist')
       .pipe(map((ReglistData) => {
           return ReglistData.Reglists.map(reglist => {
               return {
                firstname: reglist.firstname,
                lastname: reglist.lastname,
                email: reglist.email,
                regno: reglist.regno,
                address: reglist.address,
                phone: reglist.phone,
                dob: reglist.dob,
                gender: reglist.gender,
                state: reglist.state,
                id: reglist._id
               };
           });
       }))
        .subscribe(transformreglistData => {
            this.RegForm = transformreglistData;
            this.regUpdated.next([...this.RegForm]);
        });
    }

    getregUpdateListener(){
        return this.regUpdated.asObservable();
    }

    getregList(id: string){

        return this.http.get<{_id: string; firstname: string; lastname: string; 
            email: string; regno: string;  address: string;
            phone: string; dob: string; state: string; gender: string }>
            ('http://localhost:3000/api/Reglist/' + id);

        // return {...this.RegForm.find(p => p.id === id)};
    }


    addReg(fname: string, lname: string, email: string, regno: string,  address: string,
         phone: string, dob: string, state: string, gender: string) {
             const regInfo: IRegform = {
                 id: null,
                 regno: regno,
                 firstname: fname,
                 lastname: lname,
                 email: email,
                 address: address,
                 phone: phone,
                 dob: dob,
                 state: state,
                 gender: gender
                };
        this.http.post<{message: string, regId: string}>('http://localhost:3000/api/Reglist', regInfo)
        .subscribe(responseData =>{
            const id = responseData.regId;
            regInfo.id = id;
            this.RegForm.push(regInfo);
            this.regUpdated.next([...this.RegForm]);
            this.router.navigate(["/regsuccess"]);
        });
        
    }

    updateReg(id: string, fname: string, lname: string, email: string, regno: string,  address: string,
        phone: string, dob: string, state: string, gender: string ){
            const regInfo: IRegform = {
                id: id,
                regno: regno,
                firstname: fname,
                lastname: lname,
                email: email,
                address: address,
                phone: phone,
                dob: dob,
                state: state,
                gender: gender
               };
               this.http.put('http://localhost:3000/api/Reglist/' + id, regInfo)
               .subscribe(response => {
                   const updatedregs = [...this.RegForm];
                   const oldregIndex = updatedregs.findIndex(p => p.id === regInfo.id);
                   updatedregs[oldregIndex] = regInfo;
                   this.RegForm = updatedregs;
                   this.regUpdated.next([...this.RegForm]);
               });


        }

    deleteReg(regid: string){
        this.http.delete('http://localhost:3000/api/Reglist/' + regid)
        .subscribe(()=>{
            const updatedRegform = this.RegForm.filter(reg => reg.id !== regid);
            this.RegForm = updatedRegform;
            this.regUpdated.next([...this.RegForm]);
        });
    }
    


}