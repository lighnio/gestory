const bcryptjs: any = require('bcryptjs/dist/bcrypt');

export class Login {
    compare(password: string, hash: string) {
        console.log(hash);
    }
}
