export interface IUser {
    Type: 'IUser',
    Id: number,
    Firstname: string,
    Surname: string,
    Credentials: IUserCredentials,
    ProfileImage: string
}

export interface IUserCredentials {
    Email: string,
    Password: string
}