export const processTiket = (tiket: any) => {
    return Buffer.from(tiket).toString('base64');
};
