import { Component, OnInit } from '@angular/core';
import { environment } from './../../environments/environment';
import { NotesComponent } from './../components/notes/notes.component';
import { LoginService } from 'app/services/login.service';

@Component({
    selector: 'dashboard',
    templateUrl: './templates/home.template.html'
})

export class DashboardPage implements OnInit {
    
    constructor(
        private _loginService: LoginService
    ) { 
    }

    ngOnInit() {
        
    }
}