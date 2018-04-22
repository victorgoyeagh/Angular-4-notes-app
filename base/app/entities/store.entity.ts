import { IUser, IUserCredentials } from './../entities/user.entity';
import { INote } from './../entities/notes.entity';
import { IComment } from './../entities/comment.entity';

export interface INotesReducer {
    Notes: Array<INote>
}

export interface IUserReducer {
    CurrentUser: IUser
}

export interface ICommentsReducer {
    Comments: Array<IComment>
}
