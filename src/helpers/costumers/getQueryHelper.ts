export const getQueryForCostumersHelper = () => {
    let selectedFields: string = `BIN_TO_UUID(costumerId) AS costumerId, costumerUsername, costumerMail, costumerName`;
    let allCostumers: string = `SELECT ${selectedFields} FROM costumers;`;
    let avgCostumers: string = 'SELECT COUNT(*) AS total FROM costumers;';
    return `${allCostumers}${avgCostumers}`;
};
