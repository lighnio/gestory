export const lengthCount = (results : any) => {

    const [ count ] = JSON.parse(JSON.stringify(results));
            
    return count['count(*)']

}