import { Component, OnInit, OnDestroy } from "@angular/core";
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']

})
export class HeaderComponent implements OnInit, OnDestroy{
    userIsAunthenticated = false;
    private authListenerSub: Subscription;

    constructor(private authservice: AuthService){}

    ngOnInit(){
        this.userIsAunthenticated = this.authservice.getIsAuth();
        this.authListenerSub = this.authservice.getAuthStatusListener()
        .subscribe(isAuthenticated => {
            this.userIsAunthenticated = isAuthenticated;
        });
        
    }

    onLogout(){
        this.authservice.logOut();
    }

    ngOnDestroy(){
        this.authListenerSub.unsubscribe();
    }


}