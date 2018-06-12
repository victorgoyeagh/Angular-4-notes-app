import { Component, OnInit } from '@angular/core';
import { LoginService } from 'app/services/login.service';

@Component({
    selector: 'dashboard',
    templateUrl: './templates/dashboard.template.html'
})

export class DashboardPage implements OnInit {
    
    constructor(
        private _loginService: LoginService
    ) { 
    }

    ngOnInit() {
        
    }
}