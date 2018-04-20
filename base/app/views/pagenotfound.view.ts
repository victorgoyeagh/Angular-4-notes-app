import { Component } from '@angular/core';
import { LoginService } from './../services/login.service';

@Component({
    selector: 'pagenotfound',
    templateUrl: './templates/pagenotfound.template.html'
})

export class PageNotFoundComponent {

    constructor(
        private _loginService: LoginService
    ){
        this._loginService.CheckLogin();
    }
}