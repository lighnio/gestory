export class Costumer {
    costumerName;
    costumerUsername;
    costumerPassword;
    costumerMail;
    costumerZipCode;
    costumerAdress;
    costumerCountry;

    constructor(
        name: string,
        username: string,
        password: string,
        mail: string,
        zipCode: number,
        adress: string,
        country: string
    ) {
        this.costumerName = name;
        this.costumerUsername = username;
        this.costumerPassword = password;
        this.costumerMail = mail;
        this.costumerZipCode = zipCode;
        this.costumerAdress = adress;
        this.costumerCountry = country;
    }
}
