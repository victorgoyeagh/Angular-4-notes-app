import { Injectable } from '@angular/core'; 
import { Http } from '@angular/http';
import { INote } from './../entities/notes.entity';
import { environment } from './../../environments/environment';

@Injectable()
export class NotesService {
    public noteCollection: Array<INote>;
    private notesUrl: string;

    constructor(
        private _http: Http
    ){
        this.notesUrl = environment.configurations.api.urls.notesTable;
    }

    GetAllNotes(){
        return this._http.get(this.notesUrl).map((response)=>response.json())
    }

}