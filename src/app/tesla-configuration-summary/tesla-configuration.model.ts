import { Observable } from "rxjs";
import { FormControl, FormGroup, Validators } from '@angular/forms';

export class TeslaConfiguration {
    public modelCode: FormControl<string | null>;
    public colorCode: FormControl<string | null>;
    public configId: FormControl<number | null>;
    public includeYoke: FormControl<boolean>;
    public includeTow: FormControl<boolean>;

    constructor() {
        this.modelCode = new FormControl<string | null>(null, { validators: Validators.required });
        this.colorCode = new FormControl<string | null>(null, { validators: Validators.required });
        this.configId = new FormControl<number | null>(null, { validators: Validators.required });
        this.includeYoke = new FormControl<boolean>(false, { nonNullable: true });
        this.includeTow = new FormControl<boolean>(false, { nonNullable: true });
    }
}

export class TeslaConfigurationFormManager {
    private _form: FormGroup<TeslaConfiguration>;

    public constructor() {
        const initialTeslaConfiguration = new TeslaConfiguration();
        this._form = new FormGroup<TeslaConfiguration>(initialTeslaConfiguration);
    }

    public get form(): FormGroup<TeslaConfiguration> {
        return this._form;
    }

    public get modelCodeControl(): FormControl<string | null> {
        return this.form.controls.modelCode;
    }

    public get colorCodeControl(): FormControl<string | null> {
        return this.form.controls.colorCode;
    }

    public get configIdControl(): FormControl<number | null> {
        return this.form.controls.configId;
    }

    public get includeYokeControl(): FormControl<boolean> {
        return this.form.controls.includeYoke;
    }

    public get includeTowControl(): FormControl<boolean> {
        return this.form.controls.includeTow;
    }

    public get modelCodeControlValue(): string | null {
        const modelCodeControl = this.modelCodeControl;

        return modelCodeControl.value;
    }

    public get hasModelCodeSelected(): boolean {
        const modelCodeControlValue = this.modelCodeControlValue;

        return modelCodeControlValue !== null;
    }

    public get modelCodeControlValueChanges(): Observable<string | null> {
        return this.modelCodeControl.valueChanges;
    }

    public setColorCodeControlValue(colorCode: string): void {
        const colorCodeControl = this.colorCodeControl;

        colorCodeControl.setValue(colorCode);
    }

}