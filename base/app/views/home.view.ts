import { Component, OnInit } from '@angular/core';
import { LoginService } from 'app/services/login.service';
@Component({
    selector: 'home',
    templateUrl: './templates/home.template.html'
})

export class HomeComponent {

    constructor(
        private _loginService: LoginService
    ) {

        this._loginService.CheckLogin();
    }

}