import { Component } from '@angular/core';
import { LoginService } from './../../services/login.service';
import { CommunicationService } from './../../services/communication.service';
import { ModalInfo, ModalCommand, ModalFormType, ModalLocation, ModalType } from './../../entities/modal.entity';

@Component({
    selector: 'e-navigation',
    templateUrl: './templates/navigation.template.html'
})

export class NavigationComponent {
    private userIsLoggedIn: boolean = false;

    constructor(
        private _loginService: LoginService,
        private _communicationService: CommunicationService
    ){  
        this._loginService.userIsLoggedIn.subscribe((value: boolean) => {
            this.userIsLoggedIn = value;
        });
    }

    LogOutUser(){
        this._loginService.LogOut();
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