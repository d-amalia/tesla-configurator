export interface TeslaModelConfig {
    id: number;
    description: string;
    range: number;
    speed: number;
    price: number;
}

export interface TeslaModelOptions {
    configs: TeslaModelConfig[];
    towHitch: boolean;
    yoke: boolean
}
