const bcryptjs: any = require('bcryptjs/dist/bcrypt');

export class Login {
    async compare(password: string, hash: string) {
        return await bcryptjs.compare(password, hash);
    }
}
