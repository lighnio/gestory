"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.genRegisterMailHelper = void 0;
const genRegisterMailHelper = (name) => {
    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Wellcome</title>
    <style>
        * {
            margin: 0;
            padding: 0;
        }
        nav {
            width: 100%;
            background: #f39c12;
            color: white;
            font-size: 20px;
            text-align: center;
            padding: 1em;
            margin-bottom: 2em;
        }

        .text {
            text-align: center;
            font-size: 40px;
        }

    </style>
</head>
<body>
    
    <div class="text">
        ${name}, THANK YOU SO MUCH FOR JOINING US!
        
        From today you will be part of our great family passionate about good clothes.
    </div>
</body>
</html>`;
};
exports.genRegisterMailHelper = genRegisterMailHelper;
