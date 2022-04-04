// DressU - RHJlc3NV

interface configInterface {
    secret: string;
    port: number | string;
}
export const config: configInterface = {
    secret: 'RHJlc3NV',
    port: process.env.PORT || 3000,
};
