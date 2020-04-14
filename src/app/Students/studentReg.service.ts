import { Injectable } from '@angular/core';
import { IRegform } from './Reg.model';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({providedIn: 'root'})
export class StudentRegService{
    private RegForm: IRegform[] = [];
    private regUpdated = new Subject<IRegform[]>();    
    

    constructor(private http: HttpClient){}

    getregLists(){
       this.http.get<{message: string, Reglists: IRegform[]}>('http://localhost:3000/api/Reglist')
        .subscribe(ReglistData => {
            this.RegForm = ReglistData.Reglists;
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
        this.http.post<{message: string}>('http://localhost:3000/api/Reglist', regInfo)
        .subscribe(responseData =>{
            console.log(responseData.message);
            this.RegForm.push(regInfo);
            this.regUpdated.next([...this.RegForm]);
        });
        
    }
    


}