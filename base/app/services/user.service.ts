import { Injectable } from '@angular/core';
import { Http, RequestOptionsArgs, Response } from '@angular/http';
import { INote } from './../entities/notes.entity';
import { IUser } from './../entities/user.entity'; 
import { IComment } from './../entities/comment.entity'; 
import { environment } from "../../environments/environment"; 

@Injectable()
export class UserService {
    private usersTableUrl: string;

    constructor(
        private _http: Http 
    ) {
        this.usersTableUrl = environment.configurations.api.urls.usersTable;
    }

    GetDefaultInfo(credentialsTable:string, requestOptionsArgs?: RequestOptionsArgs){
       return this._http.get(credentialsTable, requestOptionsArgs).map((response) => response.json());
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