"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./app");
app_1.app.listen(app_1.app.get('port'), () => console.log(`Server running on port ${app_1.app.get('port')}`));
