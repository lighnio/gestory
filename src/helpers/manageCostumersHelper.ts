export const formatData = (results: any) => {
    let [costumers, count] = JSON.parse(JSON.stringify(results));
    let [Count] = count;
    let { total } = Count;
    return { costumers, total };
};
