import { combineReducers, Reducer, createStore } from 'redux';
import { UserActions, NoteActions, UserCollectionActions, CommentActions } from './state.actions';
import { IUser, IUserCredentials } from './../entities/user.entity';
import { INotes } from './../entities/notes.entity';
import { IComment } from './../entities/comment.entity';
import { initUsers, initNotes, initComments } from './data';

/*** init states ***/

export interface INotesReducer {
    Notes: Array<INotes>
}

export interface IUserCollectionReducer {
    Users: Array<IUser>
}

export interface ILoggedInUser {
    CurrentUser: IUser
}

export interface ILoggedInUser {
    CurrentUser: IUser
}

export interface ICommentsReducer {
    Comments: Array<IComment>
}

let lsNotes = (localStorage.getItem("notes") ? <Array<INotes>>JSON.parse(localStorage.getItem("notes")) : undefined);
let dbNotes = (lsNotes) ? lsNotes : initNotes;
export const notesReducerInitState = {
    Notes: dbNotes
}

let lsComments = (localStorage.getItem("comments") ? <Array<IComment>>JSON.parse(localStorage.getItem("comments")) : undefined);
let dbComments = (lsComments) ? lsComments : initComments;
export const commentsReducerInitState = {
    Comments: dbComments
}

export const userCollectionReducerInitState = {
    Users: initUsers
}

export const userReducerInitState = {
    CurrentUser: undefined
}

export const appInitialState = {
    userCollectionReducerInitState,
    notesReducerInitState,
    userReducerInitState,
    commentsReducerInitState
}

export function commentsReducer(state: ICommentsReducer = commentsReducerInitState, action) {
    switch (action.type) {
        case CommentActions.COMMENT_SAVE:
            let commentCol = state.Comments.concat(action.payload);
            localStorage.setItem("comments", JSON.stringify(commentCol));
            return {
                Comments: commentCol
            }
        default:
            return state;
    }
}

export function notesReducer(state: INotesReducer = notesReducerInitState, action) {
    switch (action.type) {
        case NoteActions.SAVE_NOTE:
            let notesCol = state.Notes.concat(action.payload);
            localStorage.setItem("notes", JSON.stringify(notesCol));
            return {
                Notes: notesCol
            }
        default:
            return state;
    }
}

export function usersCollectionReducer(state: IUserCollectionReducer = userCollectionReducerInitState, action) {

    switch (action.type) {
        case UserCollectionActions.FIND_USER:

            let foundUser: IUser = undefined;
            state.Users.forEach((user) => {
                if ((user.Credentials.Email == action.payload[0]) && (user.Credentials.Password == action.payload[1])) {
                    return user;
                } else {
                    return undefined
                }
            });
        default:
            return state;
    }
}

export function userReducer(state: ILoggedInUser = userReducerInitState, action) {
    switch (action.type) {
        case UserActions.USER_SET:
            return {
                CurrentUser: action.payload[0]
            }
        case UserActions.USER_REMOVE:
            return {
                CurrentUser: undefined
            }
        default:
            return state;
    }
}

export const RootReducer = combineReducers({
    userCollection: usersCollectionReducer,
    user: userReducer,
    notes: notesReducer,
    comments: commentsReducer
});
