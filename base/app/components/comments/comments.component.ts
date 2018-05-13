import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { FormatAsUKDatePipe, FormatAs24HourTimePipe } from './../../pipes/fomatdate.pipe';
import { FormControl, FormGroup, FormBuilder, Validators } from "@angular/forms";
import { IUser } from './../../entities/user.entity';
import { INote } from './../../entities/notes.entity';
import { IComment } from './../../entities/comment.entity';
import { NumberUtil } from './../../helpers/NumberUtil';
import { CommentsService } from './../../services/comments.service';
import { NotesService } from './../../services/notes.service';
import { CommunicationService } from './../../services/communication.service';
import { environment } from './../../../environments/environment';
import { NgRedux } from 'ng2-redux';

@Component({
    selector: 'c-comments',
    templateUrl: './templates/comments.template.html'
})

export class CommentsComponent implements OnInit {
    private noteId: number;
    private imagesFolder: string = environment.configurations.imagesFolder.users;
    private requestedNote: INote;
    public showCommentForm: boolean = false;
    public commentsCollection: Array<IComment>;
    private textRestrictRegex = new RegExp("^[0-9,a-z,A-Z ,.'-]+$");
    private commentEntryForm = new FormGroup({
        comment: new FormControl("", [
            Validators.required,
            Validators.pattern(this.textRestrictRegex)
        ])
    });

    constructor(
        public _store: NgRedux<any>,
        public _commentsService: CommentsService,
        private _notesService: NotesService,
        private _router: Router
    ) {

        let path = window.location.href,
            query = path.substring(path.indexOf("?"));

        this.noteId = parseInt(query.replace("?NoteId=", ""));
    }

    ngOnInit() {
        
        this._commentsService.GetCommentsByNoteId(this.noteId).subscribe((response: Array<IComment>) => {
            let fetchedNotes = response;
            this.commentsCollection = fetchedNotes;
        });

        this._notesService.GetNoteById(this.noteId).subscribe((response: Array<INote>) => {
            let fetchedNote = response[0];
            this.requestedNote = fetchedNote;
        });
    }

    AddComment() {
        let formIsValid = this.commentEntryForm.valid,
            _self = this;

        if (!formIsValid) {

            for (let i in this.commentEntryForm.controls) {
                this.commentEntryForm.controls[i].markAsTouched();
            }
        } else {

            let controls = this.commentEntryForm.controls;
            let user = <IUser>this._store.getState().user.CurrentUser;

            let newComment = <IComment>{
                Id: NumberUtil.GetRandomNumber(),
                NoteId: this.noteId,
                OwnerId: user.Id,
                Comment: controls.comment.value,
                PostDate: Date.now()
            };

            this._commentsService.AddComment(newComment);
            this.commentsCollection.push(newComment);
            this.CancelAddComment();
        }
    }

    NavgigateToNotes() {
        this._router.navigate(["dashboard"]);
    }

    CancelAddComment() {
        this.ResetForm();
        this.ToggleShowCommentForm();
    }

    ResetForm() {
        this.commentEntryForm.reset({
            onlySelf: true
        });
    }

    ToggleShowCommentForm() {
        this.showCommentForm = !this.showCommentForm;
    }

}