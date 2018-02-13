import { SafeHtml } from '@angular/platform-browser';

export interface IComment {
    Id: number,
    NoteId: number,
    OwnerId: number,
    Comment: string,
    PostDate: number
}