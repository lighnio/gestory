export const getDataHellper = (date: any) => {
    const creationDate = new Date();
    return date ? date : creationDate.getFullYear();
};
