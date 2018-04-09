import { Component } from '@angular/core';
import { LoginService } from './../../services/login.service';

@Component({
    selector: 'e-navigation',
    templateUrl: './templates/navigation.template.html'
})

export class NavigationComponent {
    public userIsLoggedIn: boolean = false;

    constructor(
        private _loginService: LoginService
    ){  
        this.userIsLoggedIn = this._loginService.UserIsLoggedIn();
    }

    LogOutUser(){
        this._loginService.LogOut();
    }
}