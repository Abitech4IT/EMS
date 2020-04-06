import { Injectable } from '@angular/core';
import { Regform } from './Reg.model';
import { Subject } from 'rxjs';

@Injectable({providedIn: 'root'})
export class StudentRegService{
    private Regform: Regform[] = [];
    private regUpdated = new Subject<Regform[]>();

    getregLists(){
        return [...this.Regform];
    }

    getregUpdateListener(){
        return this.regUpdated.asObservable();
    }

    addReg(fname: string, lname: string, email: string, address: string,
         phone: string, dob: string, state: string, gender: string) {
             const regInfo: Regform = {
                 id: null,
                 firstname: fname,
                 lastname: lname,
                 email: email,
                 address: address,
                 phone: phone,
                 dob: dob,
                 state: state,
                 gender: gender
                };
        this.Regform.push(regInfo);
        this.regUpdated.next([...this.Regform]);

    }
    


}