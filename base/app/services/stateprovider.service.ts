import { Injectable } from '@angular/core';
import { StateProviders, StateProviderActions } from './../entities/data.entity';
import { UserActions } from './../state/state.actions';
import { IUser } from './../entities/user.entity';
import { NgRedux } from 'ng2-redux';
import { Cookie } from 'ng2-cookies';
import { environment } from './../../environments/environment';

@Injectable()
export class StateProviderService {
    private stateProvider: StateProviders;
    private cookieLifeSpan: number = 12;
    private cookieUserStr = environment.configurations.names.cookieUserStr;
    
    constructor(
        private _store: NgRedux<any>
    ) {
        this.stateProvider = StateProviders.ReduxStore;
    }

    ManageUserInState(action?: StateProviderActions, user?: IUser) {
        let retreivedUser: IUser = null;
        switch (this.stateProvider) {
            case StateProviders.ReduxStore:
                if(action == StateProviderActions.Retrieve){ 
                    retreivedUser = this._store.getState().user.CurrentUser;
                } else {
                    this._store.dispatch({
                        type: (action == StateProviderActions.Remove) ? UserActions.USER_REMOVE : UserActions.USER_SET,
                        payload: [user]
                    });
                }
            break;
            case  StateProviders.Cookies:
                if(action == StateProviderActions.Retrieve) {
                    retreivedUser = JSON.parse(Cookie.get(this.cookieUserStr));
                } else {
                    if(action == StateProviderActions.Remove) {
                        Cookie.delete(this.cookieUserStr) 
                    } else { 
                        Cookie.set(this.cookieUserStr, JSON.stringify(user), this.cookieLifeSpan);
                    }
                }
            break;
        }

        return <IUser>retreivedUser;
    }

}