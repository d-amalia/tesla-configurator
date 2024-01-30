export class TeslaConfigurationStep {
    readonly id: number;
    readonly name: string;
    readonly routerLink: string;
    readonly canDeactivateCallback: () => boolean;

    constructor(id: number, routerLink: string, canActivateCallback: () => boolean) {
        this.id = id;
        this.name = "Step " + this.id;
        this.routerLink = routerLink;
        this.canDeactivateCallback = canActivateCallback;
    }
}
