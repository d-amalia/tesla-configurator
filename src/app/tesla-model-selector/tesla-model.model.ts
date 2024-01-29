export interface TeslaModel {
    code: string;
    description: string;
    colors: TeslaColor[];
}

export interface TeslaColor {
    code: string;
    description: string;
    price: number;
}
