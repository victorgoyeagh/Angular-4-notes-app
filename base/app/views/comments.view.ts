import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router'; 
import { FormatAsUKDatePipe, FormatAs24HourTimePipe } from './../pipes/fomatdate.pipe';
import { IUser } from './../entities/user.entity';
import { INote } from './../entities/notes.entity';
import { IComment } from './../entities/comment.entity';
import { NumberUtil } from './../helpers/NumberUtil';
import { LoginService } from 'app/services/login.service';
import { DataService } from 'app/services/data.service';
import { CommunicationService } from './../services/communication.service';
import { FormControl, FormGroup, FormBuilder, Validators } from "@angular/forms";

@Component({
    selector: 'e-comments',
    templateUrl: './templates/comments.template.html'
})

export class CommentComponent implements OnInit { 
    private noteId: number;
    public showCommentForm: boolean = false;
    public commentsCollection: Array<IComment> = Array<IComment>();
    private textRestrictRegex = new RegExp("^[0-9,a-z,A-Z ,.'-]+$");
    public noteObj: INote;
    private commentEntryForm = new FormGroup({
        comment: new FormControl("", [
            Validators.required,
            Validators.pattern(this.textRestrictRegex)
        ])
    });

    constructor(
        public _dataService: DataService,
        private _router: Router,
        private _loginService: LoginService
    ) {
    }

    ngOnInit() {
        let path = window.location.href,
            query = path.substring(path.indexOf("?"));

        this.noteId = parseInt(query.replace("?NoteId=", ""));
        this.noteObj = this._dataService.GetNoteById(this.noteId);
        this.commentsCollection = <Array<IComment>>this._dataService.GetCommentsById(this.noteId);
    }

    AddComment() {
        let formIsValid = this.commentEntryForm.valid,
            _self = this;

        if (!formIsValid) {
            for (let i in this.commentEntryForm.controls) {
                this.commentEntryForm.controls[i].markAsTouched();
            }
        } else {
            let controls = this.commentEntryForm.controls,
                user = this._dataService.GetCurrentUserDetails();
            console.log(controls);

            let newComment = <IComment>{
                Id: NumberUtil.GetRandomNumber(),
                NoteId: this.noteId,
                OwnerId: user.Id,
                Comment: controls.comment.value,
                PostDate: Date.now()
            }

            this._dataService.SaveCommentData(newComment);
            this.commentsCollection = <Array<IComment>>this._dataService.GetCommentsById(this.noteId);
            this.CancelAddComment();
        }
    }

    NavgigateToNotes() {
        this._router.navigate(["home"]);
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