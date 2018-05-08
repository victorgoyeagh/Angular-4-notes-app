import { IUser } from '../entities/user.entity';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { INote } from './../entities/notes.entity';
import { environment } from './../../environments/environment';
import { Observable } from 'rxjs/Observable';
import { UserService } from 'app/services/user.service';

@Injectable()
export class NotesService {
    public noteCollection: Array<INote>;
    private notesUrl: string;
    private userUrl: string;

    constructor(
        private _http: Http,
        private _userService: UserService
    ) {
        this.userUrl = environment.configurations.api.urls.usersTable;
        this.notesUrl = environment.configurations.api.urls.notesTable;
    }

    GetNoteById(noteId: number) {
        return this._http.get(this.notesUrl + "?Id=" + noteId).switchMap((commentsResponse) => {
            let comments = commentsResponse.json();

            return this._http.get(this.userUrl + "?id=" + comments[0].id).map((usersResponse) => {
                let users = usersResponse.json();
                 comments[0].OwnerDetails = users[0];
                 return comments;
            });
        });
    }

    GetAllNotes() {
        return this._http.get(this.notesUrl).switchMap(notes => {

            let ownerIds = notes.json().map((note: INote) => {
                return "id=" + note.OwnerId;
            });

            return this._http.get(this.userUrl + "?" + ownerIds.join("&")).map((users) => {
                
                let newCollection = new Array<INote>(),
                    colUsers = users.json();

                notes.json().forEach((note: INote) => {
                    note.OwnerDetails = colUsers.filter((noteOwner: IUser) => {
                        if (note.OwnerId === noteOwner.Id)
                            return note.OwnerId === noteOwner.Id
                    })[0];
                    newCollection.push(note);
                });

                return newCollection;
            });
        })
    }
}