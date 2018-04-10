import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Route, Router, NavigationExtras } from '@angular/router';
import { INote } from './../entities/notes.entity';
import { IUser } from './../entities/user.entity';
import { StateProviderActions } from './../entities/data.entity';
import { FormatAsUKDatePipe, FormatAs24HourTimePipe } from './../pipes/fomatdate.pipe';
import { NumberUtil } from './../helpers/NumberUtil';
import { DateUtil } from './../helpers/DateUtil';
import { CommunicationService } from './../services/communication.service';
import { LoginService } from 'app/services/login.service';
import { UserService } from './../services/user.service';
import { StateProviderService } from 'app/services/stateprovider.service';
import { NotesService } from 'app/services/notes.service';
import { forEach } from '@angular/router/src/utils/collection';
import { UserActions } from 'app/state/state.actions';
import { environment } from './../../environments/environment';

@Component({
    selector: 'home',
    templateUrl: './templates/home.template.html'
})

export class HomeComponent implements OnInit {
    private currentUser: IUser;
    private usersTableUrl: string = environment.configurations.api.urls.usersTable;
    public DateUtil = DateUtil;
    public noteCollection: Array<INote>;
    public noteOwners: Array<IUser>;
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
        private _notesService: NotesService,
        private _userService: UserService,
        private _router: Router,
        private _stateProviderService: StateProviderService,
        private _loginService: LoginService,
        private _communicationService: CommunicationService
    ) {
        this._loginService.CheckLogin();
    }

    ngOnInit() {
        this.currentUser = <IUser>this._stateProviderService.ManageUserInState(StateProviderActions.Retrieve);
        this.noteCollection = new Array<INote>();

        this._notesService.GetAllNotes().subscribe((allNotes: Array<INote>) => {

            let ownerIds: Array<number>;
            if (allNotes.length > 0) {
                ownerIds = allNotes.map((item) => item.OwnerId);

                this._userService.GetUsersById(ownerIds).subscribe((users: Array<IUser>) => {
                    this.noteOwners = users;

                    allNotes.forEach((note: INote) => {
                        note.OwnerDetails = this.noteOwners.filter((noteOwner) => {
                            return note.OwnerId == noteOwner.Id
                        })[0];
                        this.noteCollection.push(note);
                    });

                });
            }
        });
    }

    GetOwnerDetailsById(userId: number) {

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
                user = this.currentUser,
                userId = user.Id;

            //submit form vars
            let newNote = <INote>{
                Id: NumberUtil.GetRandomNumber(),
                OwnerId: userId,
                Title: controls.noteTitle.value,
                Description: controls.noteDescription.value,
                PostDate: Date.now(),
                OwnerDetails: user
            };

            //_self._dataService.SaveNotesData(newNote);
            //this.noteCollection = this._dataService.GetNotesData();
            //this.CancelAddNote();
        }
    }

}