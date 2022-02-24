import 'express-session';



interface Data {
    name: string,
    user: string,
    rol: string
}

declare module 'express-session' {


    interface Session {
        loggedIn : boolean,
        data: Data,
        user: string
    }
}
