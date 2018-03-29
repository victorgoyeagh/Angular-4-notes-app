import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from "@angular/forms";
import { LoginService } from './../services/login.service';
import { ModalInfo, ModalCommand, ModalFormType, ModalLocation, ModalType } from './../entities/modal.entity';
import { CommunicationService } from './../services/communication.service';
import { LoginComponent } from "../components/login/login.component";

@Component({
    selector: 'login',
    templateUrl: './templates/login.template.html'
})

export class LoginPage {

    constructor(){}
}