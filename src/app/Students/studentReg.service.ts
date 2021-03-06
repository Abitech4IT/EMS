import { Injectable } from '@angular/core';
import { IRegform } from './Reg.model';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({providedIn: 'root'})
export class StudentRegService{
    private RegForm: IRegform[] = [];
    private regUpdated = new Subject<{Regs: IRegform[], regCount: number}>();    
    

    constructor(private http: HttpClient, private router: Router){}

    getregLists(RegsPerPage: number, currentPage: number){
        const queryParams = `?pagesize=${RegsPerPage}&page=${currentPage}`;
       this.http.get<{message: string, reglists: any, maxReglists: number}>('http://localhost:3000/api/Reglist' + queryParams)
       .pipe(map((ReglistData) => {
           return { regs: ReglistData.reglists.map(reglist => {
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
                id: reglist._id,
                imagePath: reglist.imagePath
               };
           }),regLength: ReglistData.maxReglists };
       }))
        .subscribe(transformreglistData => {
            this.RegForm = transformreglistData.regs;
            this.regUpdated.next({Regs:[...this.RegForm], regCount: transformreglistData.regLength});
        });
    }

    getregUpdateListener(){
        return this.regUpdated.asObservable();
    }

    getregList(id: string){

        return this.http.get<{_id: string; firstname: string; lastname: string; 
            email: string; regno: string;  address: string;
            phone: string; dob: string; state: string; gender: string; imagePath: string }>
            ('http://localhost:3000/api/Reglist/' + id);

        // return {...this.RegForm.find(p => p.id === id)};
    }


    addReg(firstname: string, lastname: string, email: string, regno: string,  address: string,
         phone: string, dob: string, state: string, gender: string, image: File) {
            const regData = new FormData();
            regData.append("regno", regno);
            regData.append("firstname", firstname);
            regData.append("lastname", lastname);
            regData.append("email", email);
            regData.append("address", address);
            regData.append("phone", phone);
            regData.append("dob", dob);
            regData.append("state", state);
            regData.append("gender", gender);
            regData.append("image", image, firstname);
        this.http.post<{message: string, regs: IRegform}>('http://localhost:3000/api/Reglist', regData)
        .subscribe(responseData =>{
            const regInfo: IRegform = {
                id: responseData.regs.id,
                regno: regno,
                firstname: firstname,        
                lastname: lastname,
                email: email,
                address: address,
                phone: phone,
                dob: dob,
                state: state,
                gender: gender,
                imagePath: responseData.regs.imagePath
              };
            this.RegForm.push(regInfo);
            this.regUpdated.next({Regs:[...this.RegForm], regCount: null});
            this.router.navigate(["/regsuccess"]);
        });
        
    }

    updateReg(id: string, firstname: string, lastname: string, email: string, regno: string,  address: string,
        phone: string, dob: string, state: string, gender: string, image: File | string ){
            let regData: IRegform | FormData;
            if(typeof image === "object"){
                regData = new FormData();
                regData.append("id", id);
                regData.append("regno", regno);
                regData.append("firstname", firstname);
                regData.append("lastname", lastname);
                regData.append("email", email);
                regData.append("address", address);
                regData.append("phone", phone);
                regData.append("dob", dob);
                regData.append("state", state);
                regData.append("gender", gender);
                regData.append("image", image, firstname);

            } else {
                regData = {
                    id: id,
                    regno: regno,
                    firstname: firstname,
                    lastname: lastname,
                    email: email,
                    address: address,
                    phone: phone,
                    dob: dob,
                    state: state,
                    gender: gender, 
                    imagePath: image
                }
            }
               this.http.put('http://localhost:3000/api/Reglist/' + id, regData)
               .subscribe(response => {
                   const updatedregs = [...this.RegForm];
                   const oldregIndex = updatedregs.findIndex(p => p.id === id);
                   const regInfo: IRegform = {
                    id: id,
                    regno: regno,
                    firstname: firstname,
                    lastname: lastname,
                    email: email,
                    address: address,
                    phone: phone,
                    dob: dob,
                    state: state,
                    gender: gender, 
                    imagePath: ""
                }
                   updatedregs[oldregIndex] = regInfo;
                   this.RegForm = updatedregs;
                   this.regUpdated.next({Regs:[...this.RegForm], regCount: null});
               });
         }

    deleteReg(regid: string){
        return this.http.delete('http://localhost:3000/api/Reglist/' + regid);
    }

}