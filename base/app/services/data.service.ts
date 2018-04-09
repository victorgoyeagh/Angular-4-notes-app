import { Injectable } from '@angular/core';
import { INote } from './../entities/notes.entity';
import { IUser } from './../entities/user.entity';
import { UserActions, UserCollectionActions, NoteActions, CommentActions } from './../state/state.actions';
import { IComment } from './../entities/comment.entity';
import { NgRedux } from 'ng2-redux';
import { environment } from "../../environments/environment";

@Injectable()
export class DataService {
    private usersTableUrl: string = environment.configurations.api.urls.usersTable;

    constructor(
        private _store: NgRedux<any>
    ) {
    }

    FindUser(username: string, password: string) {
        let userDetails = <Array<IUser>>this.GetAllUsersData(),
            user = userDetails["Users"].filter((user) => {
            return ((user.Credentials.Email == username) && (user.Credentials.Password == password))
        })

        return (user.length > 0) ? user[0] : undefined;
    }

    GetNoteById(noteId: number) {
        let notesData = <Array<INote>>this._store.getState().notes["Notes"],
            retNotes = Array.from(notesData).filter((note: INote) => {
                return note.Id == noteId;
            });
        return retNotes[0];
    }

    GetAllUsersData(): Array<IUser> {
        return <Array<IUser>>this._store.getState().userCollection;
    }

    GetCommentsById(noteId: number): Array<IComment> {
        let allComments = <Array<IComment>>this._store.getState().comments.Comments,
            retComments = new Array<IComment>();

        retComments = allComments.filter((comment: IComment) => {
            return comment.NoteId == noteId;
        })
        return retComments;
    }

    GetNotesData() {
        let notesData = <Array<INote>>this._store.getState().notes["Notes"];

        var allUsers = this.GetAllUsersData()["Users"];
        var notesCollection = new Array<INote>();

        Array.from(notesData).forEach((note: INote) => {
            let user = <Array<IUser>>allUsers.filter((user: IUser) => {
                return user.Id == note.OwnerId;
            });

            note.OwnerDetails = user[0];
            notesCollection.push(note);
        })

        return notesCollection;
    }

    GetUserById(ownerId: number): IUser {
        let users = <Array<IUser>>this.GetAllUsersData(),
            fUser: Array<IUser>;

        fUser = users["Users"].filter((user: IUser) => {
            return user.Id == ownerId;
        });

        return fUser[0];
    }

    GetUserDetails(email: string) {
        let foundUser: IUser = undefined,
            users = <Array<IUser>>this.GetAllUsersData();

        Array.from(users["Users"]).forEach((user: IUser) => {
            if (email == user.Credentials.Email) {
                foundUser = user;

                this._store.dispatch({
                    type: UserActions.USER_SET,
                    payload: [foundUser]
                });
            }
        });
        return foundUser;
    }

    GetCurrentUserDetails(){
        return <IUser>this._store.getState().user.CurrentUser;
    }

    RemoveUser(){
        this._store.dispatch({
            type: UserActions.USER_REMOVE
        });
    }

    SaveCommentData(comment: IComment) {
        this._store.dispatch({
            type: CommentActions.COMMENT_SAVE,
            payload: [comment]
        })
    }

    SaveNotesData(note: INote) {
        this._store.dispatch({
            type: NoteActions.SAVE_NOTE,
            payload: [note]
        })
    }

}