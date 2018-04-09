import { INote } from './../entities/notes.entity';
import { IComment } from './../entities/comment.entity';
import { IUser } from './../entities/user.entity';


export const initUsers = <Array<IUser>>[
    {
        Id: 1,
        Firstname: "Sarah",
        Surname: "Jones",
        Credentials: {
            Email: "sarah.jones@mycompany.com",
            Password: "mainclient"
        },
        ProfileImage: "sarah-jones.jpg"
    },
    {
        Id: 2,
        Firstname: "James",
        Surname: "Mandarin",
        Credentials: {
            Email: "james.mandarin@hotmail.com",
            Password: "jamesthaman"
        },
        ProfileImage: "james-mandarin.jpg"
    }
];

export const initNotes = <Array<INote>>[
    {
        Id: 1,
        OwnerId: 1,
        Title: "This is a note",
        Description: "Note for Henry description",
        PostDate: Date.now()
    },
    {
        Id: 2,
        OwnerId: 2,
        Title: "This is another note",
        Description: "My note description",
        PostDate: Date.now()
    }
];

export const initComments = <Array<IComment>>[
    {
        Id: 20,
        OwnerId: 1, 
        NoteId: 2,
        Comment: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras varius.Curabitur molestie tortor ac hendrerit laoreet. Sed convallis lacinia consectetur.",
        PostDate: Date.now()
    },
    {
        Id: 21,
        OwnerId: 1,
        NoteId: 2,
        Comment: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras varius leo a efficitur ullamcorper. Curabitur molestie tortor ac hendrerit laoreet. Sed convallis lacinia consectetur.",
        PostDate: Date.now()
    },
    {
        Id: 23,
        OwnerId: 2,
        NoteId: 1,
        Comment: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent eget eleifend orci. Curabitur molestie tortor ac hendrerit laoreet. Sed convallis lacinia consectetur.",
        PostDate: Date.now()
    }
];
