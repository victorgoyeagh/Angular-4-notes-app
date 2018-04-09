import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from "@angular/forms";
import { FormValidator } from './../../helpers/FormValidatorUtil';
import { LoginService } from './../../services/login.service';
import { ModalInfo, ModalCommand, ModalFormType, ModalLocation, ModalType } from './../../entities/modal.entity';
import { CommunicationService } from './../../services/communication.service';

@Component({
    selector: 'c-login',
    templateUrl: './templates/login.template.html'
})

export class LoginComponent {
    private pwMinLength: number = 5;

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
        private _loginService: LoginService,
        private _communicationService: CommunicationService
    ){
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

    
    LaunchModal() {
        let modalInfo: ModalInfo = new ModalInfo(
            `<h3>Modal</h3>`,
            ``,
            ModalCommand.Open,
            ModalType.Alert,
            "OK",
            "",
            null,
            ModalFormType.Default,
            "defaultModal",
            {
                Width: 400,
                Height: 400
            },
            ModalLocation.Center
        );

        this._communicationService.ShareModalInfoData(modalInfo);
        return false;
    }

}