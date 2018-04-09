import { Injectable } from '@angular/core';
import { Route, Router } from '@angular/router';
import { Http, Headers, RequestOptionsArgs, URLSearchParams } from '@angular/http';
import { IUser, IUserCredentials } from './../entities/user.entity';
import { StateProviderActions } from './../entities/data.entity';
import { UserActions } from './../state/state.actions';
import { StateProviderService } from './stateprovider.service'
import { DataService } from './../services/data.service';
import { Cookie } from 'ng2-cookies';

import { createStore } from 'redux';
import { RootReducer } from '../state/state.store';
import { NgRedux } from 'ng2-redux';
import { environment } from "../../environments/environment";


@Injectable()
export class LoginService {
    private headers: Headers;
    private usersTableUrl: string = environment.configurations.api.urls.usersTable;
    private credentialsTable: string = environment.configurations.api.urls.credentialsTable;

    private userId: number = undefined;
    private currentUser: IUser;

    constructor(
        private _router: Router,
        private _stateProviderService: StateProviderService,
        private _dataService: DataService,
        private _http: Http
    ) {
        this.headers = new Headers();
        this.headers.append('Content-Type', 'application/json')
    }

    public FindUser(username, password) {

        let params = new URLSearchParams();
        params.set('Email', username.toString());
        params.set('Password', password.toString());

        let requestOptionsArgs = <RequestOptionsArgs>{
            params: params,
            headers: this.headers
        };

        return this._http.get(this.credentialsTable, requestOptionsArgs).map((response) => response.json())
            .subscribe((userCredentials: Array<IUserCredentials>) => {

                let userCreds = userCredentials[0];
                if (userCreds) {
                    this.userId = userCreds.Id;
                    this.LogInByUserId(userCreds.Id);
                } else {
                    console.log("User not found");
                    (<any>window).alert("User not found");
                }
            });
    }

    public LogInByUserId(userId: number) {

        if (!userId) {
            return;
        }

        let params = new URLSearchParams();
        params.set('UserId', userId.toString());

        let requestOptionsArgs = <RequestOptionsArgs>{
            params: params,
            headers: this.headers
        };

        this._http.get(this.usersTableUrl, requestOptionsArgs).map((response) => response.json())
            .subscribe((user: IUser) => {

                if (user) {
                    this.currentUser = user;
                    this._stateProviderService.ManageUserInState(StateProviderActions.Save, this.currentUser);
                    this._router.navigate(['/']);
                }
                else {
                    console.log("User details not found");
                    (<any>window).alert("User details not found");
                    //throw new Error("Sorry no such user was found");
                }
            });
    }

    public LogOut() {
        this._stateProviderService.ManageUserInState(StateProviderActions.Remove, this.currentUser);
        this._router.navigate(['/login']);
    }

    public CheckLogin() {
        if (!this.UserIsLoggedIn())
            this._router.navigate(['/login']);
    }

    public UserIsLoggedIn() {
        this.currentUser = <IUser>this._stateProviderService.ManageUserInState(StateProviderActions.Retrieve);
        return (this.currentUser != undefined);
    }
}