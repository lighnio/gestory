export const genRegisterMailHelper = (name: string) => {
    return `<!DOCTYPE html>
                <html lang="en">
                <head>
                    <meta charset="UTF-8">
                    <meta http-equiv="X-UA-Compatible" content="IE=edge">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet"
                        integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">
                    <title>Register</title>
                </head>
                <body>

                <nav class="navbar navbar-dark bg-dark">
                    <div class="container-fluid">
                        <a class="navbar-brand">WELLCOME</a>
                    </div>
                </nav>

                <div class="container">
                    <div class="card">
                        <div class="card-body">
                            <div class="card-title">
                                Wellcome to DressU
                            </div>
                            <div class="card-text">
                                
                            ${name}, THANK YOU SO MUCH FOR JOINING US!

                            From today you will be part of our great family passionate about good clothes.
                            </div>
                        </div>
                    </div>
                </div>
                    
                </body>
                </html>`;
};
