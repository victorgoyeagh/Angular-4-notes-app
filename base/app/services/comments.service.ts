import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { IComment } from './../entities/comment.entity';
import { NumberUtil } from './../helpers/NumberUtil';
import { IUser } from './../entities/user.entity';
import { environment } from './../../environments/environment';
import { merge } from 'rxjs/operators/merge';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class CommentsService {
    private commentUrl: string;
    private userUrl: string;
    private notesUrl: string;

    constructor(
        private _http: Http
    ) {
        this.userUrl = environment.configurations.api.urls.usersTable;
        this.commentUrl = environment.configurations.api.urls.commentsTable;
    }

    AddComment(comment: IComment) {

        //TODO: save comment
    }

    GetCommentsByNoteId(noteId: number) {
        return this._http.get(this.commentUrl + "?NoteId=" + noteId).switchMap((comments) => {

            let ownerIds = comments.json().map((comment: IComment) => {
                return "id=" + comment.OwnerId;
            });

            return this._http.get(this.userUrl + "?" + ownerIds.join("&")).map((users) => {
                let newCollection = new Array<IComment>(),
                    colUsers = users.json();

                comments.json().forEach((comment: IComment) => {
                    comment.OwnerDetails = colUsers.filter((user: IUser) => {
                        if (comment.OwnerId === user.Id)
                            return comment.OwnerId == user.Id
                    })[0];
                    newCollection.push(comment);
                });

                return newCollection;
            });
        });
    }
}