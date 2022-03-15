export const getQueryForCostumersHelper = () => {
    let selectedFields: string = `BIN_TO_UUID(costumerId) AS costumerId, costumerUsername, costumerMail, costumerName`;
    let allCostumers: string = `SELECT ${selectedFields} FROM costumers;`;

    return `${allCostumers}`;
};
