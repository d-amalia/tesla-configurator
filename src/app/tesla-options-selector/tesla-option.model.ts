export interface TeslaModelConfig {
    id: number;
    description: string;
    range: number;
    speed: number;
    price: number;
}

export interface TeslaModelOption {
    configs: TeslaModelConfig[];
    towHitch: boolean;
    yoke: boolean
}
