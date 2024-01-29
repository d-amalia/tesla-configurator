import { TeslaColor, TeslaModel } from "../tesla-model-selector/tesla-model.model";
import { TeslaModelConfig } from "../tesla-options-selector/tesla-option.model";

export class TeslaConfiguration {
    private model: TeslaModel | null;
    private color: TeslaColor | null;
    private config: TeslaModelConfig | null;
    private includeYoke: boolean;
    private includeTow: boolean;

    constructor() {
        this.model = null;
        this.color = null;
        this.config = null;
        this.includeYoke = false;
        this.includeTow = false;
    }

    public setSelectedModel(model: TeslaModel): void {
        this.model = model;
    }

    public getSelectedModel(): TeslaModel | null {
        return this.model;
    }

    public setSelectedColor(color: TeslaColor): void {
        this.color = color;
    }

    public getSelectedColor(): TeslaColor | null {
        return this.color;
    }

    public setSelectedConfig(config: TeslaModelConfig): void {
        this.config = config;
    }

    public getSelectedConfig(): TeslaModelConfig | null {
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
            total += 1000;
        }

        if (this.includeTow) {
            total += 1000;
        }

        return total;
    }
}