import { Injectable } from '@angular/core';
import { IRegform } from './Reg.model';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Injectable({providedIn: 'root'})
export class StudentRegService{
    private RegForm: IRegform[] = [];
    private regUpdated = new Subject<IRegform[]>();    
    

    constructor(private http: HttpClient){}

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