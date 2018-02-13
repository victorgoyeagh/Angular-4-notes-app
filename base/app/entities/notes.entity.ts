import { IUser } from './user.entity';

export interface INotes {
    Id: number,
    OwnerId: number,
    Title: string;
    Description: string,
    PostDate: number,
    OwnerDetails?: IUser,
}
