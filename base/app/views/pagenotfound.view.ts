import { Component } from '@angular/core';
import { LoginService } from './../services/login.service';

@Component({
    selector: 'pagenotfound',
    templateUrl: './templates/pagenotfound.template.html'
})

export class PageNotFoundPage {

    constructor(
        private _loginService: LoginService
    ){
    }
}