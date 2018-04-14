import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from "@angular/forms"; 
import { IUser } from './../../entities/user.entity'; 
import { LoginService } from 'app/services/login.service';
import { UserService } from './../../services/user.service'; 

@Component({
    selector: 'c-user',
    templateUrl: './templates/user.template.html'
})

export class UserComponent {

    constructor(
        private _userService: UserService
    ){

    }

}