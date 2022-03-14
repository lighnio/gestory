export const salesByIdHelper = (results: any) => {
    let [data] = JSON.parse(JSON.stringify(results));

    return data;
};
