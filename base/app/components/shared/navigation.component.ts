import { Component } from '@angular/core';
import { LoginService } from './../../services/login.service';

@Component({
    selector: 'e-navigation',
    templateUrl: './templates/navigation.template.html'
})

export class NavigationComponent {

    constructor(
        private _loginService: LoginService
    ){  
    }

    Logout(){
        this._loginService.LogOut();
    }
}