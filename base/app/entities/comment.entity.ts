import { SafeHtml } from '@angular/platform-browser';
import { IUser } from './../entities/user.entity';

export interface IComment {
    Id: number,
    NoteId: number,
    OwnerId: number,
    Comment: string,
    PostDate: number,
    OwnerDetails?: IUser
}