export const formatData = (results: any) => {
    let [costumers, count] = JSON.parse(JSON.stringify(results));
    console.log(count);
    let [Count] = count;
    let { total } = Count;
    return { costumers, total };
};
