export interface ResponseFormat {
    err: boolean;
    msg?: string;
    data?: Array<object>;
}

export interface productType {
    id: string;
    productName: string;
    serialNumber: number;
    productPrice: number;
    productCategory: string;
    productImage: any;
}
