import { TeslaColor, TeslaModel } from "../tesla-model-selector/tesla-model.model";
import { TeslaModelConfig } from "../tesla-options-selector/tesla-option.model";

export class TeslaConfiguration {
    private model: TeslaModel | null;
    private color: TeslaColor | null;
    private config: TeslaModelConfig | null;
    private includeYoke: boolean;
    private includeTow: boolean;

    private readonly YOKE_COST: number;
    private readonly TOW_COST: number;

    constructor() {
        this.model = null;
        this.color = null;
        this.config = null;
        this.includeYoke = false;
        this.includeTow = false;
        this.YOKE_COST = 1000;
        this.TOW_COST = 1000;
    }

    public setModel(model: TeslaModel): void {
        this.model = model;
    }

    public getModel(): TeslaModel | null {
        return this.model;
    }

    public setColor(color: TeslaColor): void {
        this.color = color;
    }

    public getColor(): TeslaColor | null {
        return this.color;
    }

    public setConfig(config: TeslaModelConfig): void {
        this.config = config;
    }

    public getConfig(): TeslaModelConfig | null {
        return this.config;
    }

    public setIncludeYoke(include: boolean): void {
        this.includeYoke = include;
    }

    public getIncludeYoke(): boolean {
        return this.includeYoke;
    }

    public setIncludeTow(include: boolean): void {
        this.includeTow = include;
    }

    public getIncludeTow(): boolean {
        return this.includeTow;
    }

    public calculateTotalCost(): number {
        let total = 0;

        if (this.color) {
            total += this.color.price;
        }

        if (this.config) {
            total += this.config.price;
        }

        if (this.includeYoke) {
            total += this.YOKE_COST;
        }

        if (this.includeTow) {
            total += this.TOW_COST;
        }

        return total;
    }
}