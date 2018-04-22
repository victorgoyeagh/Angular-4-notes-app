import { combineReducers, Reducer, createStore } from 'redux';
import { UserActions, NoteActions, UserCollectionActions, CommentActions } from './state.actions';
import { IUser, IUserCredentials } from './../entities/user.entity';
import { INote } from './../entities/notes.entity';
import { IComment } from './../entities/comment.entity';
import { ICommentsReducer, IUserReducer, INotesReducer } from './../entities/store.entity';

/*** init states ***/

export const notesReducerInitState = {
    Notes: undefined
}

export const commentsReducerInitState = {
    Comments: undefined
}

export const userReducerInitState = {
    CurrentUser: undefined
}

/*** init states ***/
export const appInitialState = {
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

export function userReducer(state: IUserReducer = userReducerInitState, action) {
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
    user: userReducer,
    notes: notesReducer,
    comments: commentsReducer
});
