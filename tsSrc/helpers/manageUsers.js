export const lengthCount = results => {

    const [ count ] = JSON.parse(JSON.stringify(results));
            
    return count['count(*)']

}