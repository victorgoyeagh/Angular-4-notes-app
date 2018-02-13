import { Injectable } from '@angular/core';
import { Route, Router } from '@angular/router';
import { IUser } from './../entities/user.entity';
import { UserActions } from './../state/state.actions';
import { DataService } from './../services/data.service';
import { Cookie } from 'ng2-cookies';
import { NgRedux } from 'ng2-redux';
import { error } from 'selenium-webdriver';


@Injectable()
export class LoginService {
    private currentUser: IUser;
    public userIsLoggedIn:boolean = false;

    constructor(
        private _router: Router,
        private _dataService: DataService,
        private _store: NgRedux<any>,
    ){
    }

    LogOut(){
        this._store.dispatch({
            type: UserActions.USER_REMOVE
        });
        Cookie.delete("userisloggedin");
        this._router.navigate(['login']);
        this.userIsLoggedIn = false;
    }

    LogInUser(username: string, password: string){

        let userDetails = <IUser>this._dataService.FindUser(username, password);
        if(userDetails){

            //get user details
            let loggedInUser = <IUser>this._dataService.GetUserDetails(userDetails.Credentials.Email);
            
            //wont usually store user crendetials, just details 
            Cookie.set("userisloggedin", JSON.stringify(loggedInUser), 12);
            this.userIsLoggedIn = true;

            //redirect to home
            this._router.navigate(['/']);
        } else {
            console.log("User not found");
            (<any>window).alert("User not found");
            //throw new Error("Sorry no such user was found");
        }
    }

    CheckLogin(){
        this.currentUser = <IUser>this._store.getState().user.CurrentUser;
        let userLoggenIn = (this.currentUser != undefined);

        if(!userLoggenIn) 
            this._router.navigate(['/login']);
    }

    GetUserDetails(){
        return <IUser>this._store.getState().user.CurrentUser;
    }
}