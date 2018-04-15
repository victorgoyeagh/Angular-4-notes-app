import { Injectable } from '@angular/core';
import { Route, Router } from '@angular/router';
import { Http, Headers, RequestOptionsArgs, URLSearchParams } from '@angular/http';
import { IUser, IUserCredentials } from './../entities/user.entity';
import { StateProviderActions } from './../entities/data.entity';
import { UserActions } from './../state/state.actions';
import { StateProviderService } from './stateprovider.service'
import { DataService } from './../services/data.service';
import { UserService } from './user.service';
import { Cookie } from 'ng2-cookies';

import { createStore } from 'redux';
import { RootReducer } from '../state/state.store';
import { NgRedux } from 'ng2-redux';
import { environment } from "../../environments/environment";
import { Subject } from 'rxjs/Subject';


@Injectable()
export class LoginService {
    private headers: Headers;
    private usersTableUrl: string = environment.configurations.api.urls.usersTable;
    private credentialsTable: string = environment.configurations.api.urls.credentialsTable;

    private userId: number = undefined;
    private currentUser: IUser;
    public userIsLoggedIn: Subject<any> = new Subject<any>()

    constructor(
        private _router: Router,
        private _store: NgRedux<any>,
        private _stateProviderService: StateProviderService,
        private _dataService: DataService,
        private _userService: UserService,
        private _http: Http
    ) {
    }

    public FindUser(username, password) {

        this.headers = new Headers();
        this.headers.append('Content-Type', 'application/json');

        let params = new URLSearchParams();
        params.set('Email', username.toString());
        params.set('Password', password.toString());

        let requestOptionsArgs = <RequestOptionsArgs>{
            params: params,
            headers: this.headers
        };

        this._userService.GetDefaultInfo(this.credentialsTable, requestOptionsArgs)
            .subscribe((userCredentials: Array<IUserCredentials>) => {

                let userCreds = userCredentials[0];
                if (userCreds) {
                    this.userId = userCreds.Id;
                    this.LogInByUserId(userCreds.UserId);
                } else {
                    console.log("User not found");
                    (<any>window).alert("User not found");
                }
            }
        );
    }

    public LogInByUserId(userId: number) {

        if (!userId) {
            return;
        }

        let url = this.usersTableUrl; //+"?Id="+userId;
        let params = new URLSearchParams();
        params.set('UserId', userId.toString());

        let requestOptionsArgs = <RequestOptionsArgs>{
            params: params,
            headers: this.headers
        };

        this._userService.GetDefaultInfo(this.credentialsTable, requestOptionsArgs)
            .subscribe((user: Array<IUser>) => {

                if (user.length) {
                    this.currentUser = user[0];
                    this._stateProviderService.ManageUserInState(StateProviderActions.Save, this.currentUser);
                    this.userIsLoggedIn.next(true);
                    this._router.navigateByUrl('/');
                }
                else {
                    console.log("User details not found");
                    (<any>window).alert("User details not found");
                    //throw new Error("Sorry no such user was found");
                }
            }
            );
    }

    public LogOut() {
        this._stateProviderService.ManageUserInState(StateProviderActions.Remove, this.currentUser);
        this.userIsLoggedIn.next(false);
        this._router.navigateByUrl('/login');
    }

    public CheckLogin() {
        if (!this.UserIsLoggedIn()) {
            this._router.navigateByUrl('/login');
        }
    }

    public UserIsLoggedIn() {
        this.currentUser = <IUser>this._stateProviderService.ManageUserInState(StateProviderActions.Retrieve);
        return (this.currentUser != undefined);
    }
}