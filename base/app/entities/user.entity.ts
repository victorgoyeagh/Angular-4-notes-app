export interface IUser {
    Id: number,
    Firstname: string,
    Surname: string,
    Credentials: IUserCredentials,
    ProfileImage: string,
    Denominator: 'IUser',
}

export interface IUserCredentials {
    Id: number,
    UserId: number,
    Email: string,
    Password: string
}