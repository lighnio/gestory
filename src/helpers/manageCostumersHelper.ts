export const formatData = (results: any) => {
    let [costumers, total] = JSON.parse(JSON.stringify(results));

    return { costumers, total };
};
