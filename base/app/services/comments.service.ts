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
		this.commentUrl = environment.configurations.api.urls.notesTable;
	}

	AddComment(comment: IComment) {

		//TODO: save comment
	}

	GetCommentsByNoteId(noteId: number) {
		return this._http.get(this.commentUrl + "?Id=" + noteId).map((commentResponse) => commentResponse.json());

		 /*this._http.get(this.userUrl + "?Id=" + noteId).map((commentResponse) => {

			let comment = commentResponse.json();
			return this._http.get(this.userUrl + "?Id=" + comment.OwnerId).map((userResponse) => {

				return Observable.of([
					commentResponse,
					userResponse
				]);
			});
		});*/
	}
}