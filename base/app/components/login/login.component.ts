import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from "@angular/forms";
import { FormValidator } from './../../helpers/FormValidatorUtil';
import { LoginService } from './../../services/login.service';
import * as Rx from 'rxjs';

@Component({
    selector: 'c-login',
    templateUrl: './templates/login.template.html'
})

export class LoginComponent implements OnInit {
    private pwMinLength: number = 5;
    private getLoggedInStatus: Rx.BehaviorSubject<boolean> = new Rx.BehaviorSubject<boolean>(false);
    public userIsLoggedIn:boolean= false;

    private logInForm = new FormGroup({
        email: new FormControl('test.ing@test.com', [
            Validators.required,
            Validators.pattern(FormValidator.emailRegex)
        ]),
        password: new FormControl('password', [
            Validators.required,
            Validators.minLength(this.pwMinLength)
        ])
    });

    constructor(
        private _loginService: LoginService
    ){

    }

    ngOnInit(){
        this._loginService.userIsLoggedIn.subscribe((isLoggedIn) => {
            this.userIsLoggedIn = isLoggedIn;
        })
    }

    SubmitLoginDetails(){

        let formIsValid: boolean = this.logInForm.valid;
        
        if(!formIsValid){
            for (let i in this.logInForm.controls) {
                this.logInForm.controls[i].markAsTouched();
            }
        } else {
            let username = this.logInForm.controls.email.value,
                password = this.logInForm.controls.password.value;
 
            this._loginService.FindUser(username, password);
        }
    }
    

}