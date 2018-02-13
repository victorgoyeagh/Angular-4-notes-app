import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from "@angular/forms";
import { LoginService } from './../services/login.service';
import { ModalInfo, ModalCommand, ModalFormType, ModalLocation, ModalType } from './../entities/modal.entity';
import { CommunicationService } from './../services/communication.service';

@Component({
    selector: 'login',
    templateUrl: './templates/login.template.html'
})

export class LoginComponent {
    private pwPattern = new RegExp("^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$");
    private emailRegex = new RegExp("^([a-zA-Z0-9_.-]+)@([a-zA-Z0-9_.-]+)\\.([a-zA-Z]{2,5})$");
    private pwMinLength: number = 5;

    private logInForm = new FormGroup({
        email: new FormControl('sarah.jones@mycompany.com', [
            Validators.required,
            Validators.pattern(this.emailRegex)
        ]),
        password: new FormControl('yopaclient', [
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
            let un = this.logInForm.controls.email.value,
                pw = this.logInForm.controls.password.value;

            this._loginService.LogInUser(un, pw);
        }
    }

    
    LaunchModal() {
        let modalInfo: ModalInfo = new ModalInfo(
            `<h3>Map preview</h3>`,
            ``,
            ModalCommand.Open,
            ModalType.Alert,
            "Close",
            "",
            null,
            ModalFormType.Default,
            "mapPreviewModal",
            {
                Width: 400,
                Height: 400
            },
            ModalLocation.Center
        );

        this._communicationService.ShareModalInfoData(modalInfo);
    }

}