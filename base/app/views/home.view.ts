import { Component } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Route, Router, NavigationExtras } from '@angular/router';
import { MiscUtil } from './../helpers/MiscUtils';
import { INotes } from './../entities/notes.entity';
import { IUser } from './../entities/user.entity';
import { CommunicationService } from './../services/communication.service';
import { LoginService } from 'app/services/login.service';
import { DataService } from 'app/services/data.service';

@Component({
    selector: 'home',
    templateUrl: './templates/home.template.html'
})

export class HomeComponent {
    public mu = new MiscUtil();
    private currentUser: IUser;
    public noteCollection: Array<INotes> = new Array<INotes>();
    private showNoteForm: boolean = false;
    private textRestrictRegex = new RegExp("^[0-9,a-z,A-Z ,.'-]+$");
    private noteEntryForm = new FormGroup({
        noteTitle: new FormControl("", [
            Validators.required,
            Validators.pattern(this.textRestrictRegex)
        ]),
        noteDescription: new FormControl("", [
            Validators.required,
            Validators.pattern(this.textRestrictRegex)
        ])
    });

    constructor(
        private _router: Router,
        private _dataService: DataService,
        private _loginService: LoginService,
        private _communicationService: CommunicationService
    ) {
        this._loginService.CheckLogin();

        this.currentUser = this._loginService.GetUserDetails();
        this.noteCollection = this._dataService.GetNotesData();
    }

    NavigateToDetails(noteId: number) {
        this._router.navigateByUrl("comments?NoteId=" + noteId);
    }

    CancelAddNote() {
        this.ResetForm();
        this.ToggleShowNoteForm();
    }

    ResetForm() {
        this.noteEntryForm.reset({
            onlySelf: true
        });
    }

    ToggleShowNoteForm() {
        this.showNoteForm = !this.showNoteForm;
    }

    AddNote() {

        let formIsValid = this.noteEntryForm.valid,
            _self = this;

        if (!formIsValid) {
            for (let i in this.noteEntryForm.controls) {
                this.noteEntryForm.controls[i].markAsTouched();
            }
        } else {
            let controls = this.noteEntryForm.controls,
                user = <IUser>this._loginService.GetUserDetails(),
                userId = user.Id;

            console.log(userId);

            //submit form vars
            let newNote = <INotes>{
                Id: MiscUtil.GetRandomNumber(),
                OwnerId: userId,
                Title: controls.noteTitle.value,
                Description: controls.noteDescription.value,
                PostDate: Date.now(),
                OwnerDetails: user
            };

            _self._dataService.SaveNotesData(newNote);
            this.noteCollection = this._dataService.GetNotesData();
            this.CancelAddNote();
        }
    }

}