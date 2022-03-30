export const processTiket = (tiket: any) => {
    const base64 = Buffer.from(tiket).toString('base64');

    return base64;
};
