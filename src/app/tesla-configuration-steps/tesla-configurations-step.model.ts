export class TeslaConfigurationStep {
    readonly id: number;
    readonly name: string;
    readonly routerLink: string;

    constructor(id: number, routerLink: string) {
        this.id = id;
        this.name = "Step " + this.id;
        this.routerLink = routerLink;
    }
}
