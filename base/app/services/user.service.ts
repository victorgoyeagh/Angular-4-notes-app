import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { INote } from './../entities/notes.entity';
import { IUser } from './../entities/user.entity'; 
import { IComment } from './../entities/comment.entity'; 
import { environment } from "../../environments/environment";
import { Response } from '@angular/http/src/static_response';

@Injectable()
export class UserService {
    private usersTableUrl: string;

    constructor(
        private _http: Http 
    ) {
        this.usersTableUrl = environment.configurations.api.urls.usersTable;
    }

    GetUsersById(usersIds: Array<number>){
        let query: Array<string> = new Array<string>();
        query.push("?");
        usersIds.forEach((userId, i) => {
            if(userId)
                query.push("id="+ userId +"&")
        });

        return this._http.get(this.usersTableUrl + query.join("")).map((response) => response.json());
    }

}