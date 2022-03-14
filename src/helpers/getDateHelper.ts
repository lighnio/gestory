export const getDateHelper = (date: any) => {
    const creationDate = new Date();
    return date ? date : creationDate.getFullYear();
};
