export class Costumer {
    costumerName;
    costumerUsername;
    costumerPassword;
    costumerMail;
    costumerZipCode;
    costumerAdress;
    costumerCreditCard;
    costumerCvvCode;
    costumerCountry;
    costumerCardExpiration;

    constructor(
        name: string,
        username: string,
        password: string,
        mail: string,
        zipCode: number,
        adress: string,
        creditCard: number,
        cvv: string,
        country: string,
        expiration: number
    ) {
        this.costumerName = name;
        this.costumerUsername = username;
        this.costumerPassword = password;
        this.costumerMail = mail;
        this.costumerZipCode = zipCode;
        this.costumerAdress = adress;
        this.costumerCreditCard = creditCard;
        this.costumerCvvCode = cvv;
        this.costumerCountry = country;
        this.costumerCardExpiration = expiration;
    }
}
