import { Observable } from "rxjs";
import { FormControl, FormGroup, Validators } from '@angular/forms';

export class TeslaConfiguration {
    modelCode: FormControl<string | null>;
    colorCode: FormControl<string | null>;
    configId: FormControl<number | null>;
    includeYoke: FormControl<boolean>;
    includeTow: FormControl<boolean>;

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

    constructor() {
        const initialTeslaConfiguration = new TeslaConfiguration();
        this._form = new FormGroup<TeslaConfiguration>(initialTeslaConfiguration);
    }

    get form(): FormGroup<TeslaConfiguration> {
        return this._form;
    }

    get modelCodeControl(): FormControl<string | null> {
        return this.form.controls.modelCode;
    }

    get colorCodeControl(): FormControl<string | null> {
        return this.form.controls.colorCode;
    }

    get configIdControl(): FormControl<number | null> {
        return this.form.controls.configId;
    }

    get includeYokeControl(): FormControl<boolean> {
        return this.form.controls.includeYoke;
    }

    get includeTowControl(): FormControl<boolean> {
        return this.form.controls.includeTow;
    }

    get modelCodeControlValue(): string | null {
        return this.modelCodeControl.value;
    }

    get modelCodeSelected(): boolean {
        return this.modelCodeControlValue !== null;
    }

    get modelCodeControlValueChanges(): Observable<string | null> {
        return this.modelCodeControl.valueChanges;
    }

    get configIdControlValueChanges(): Observable<number | null> {
        return this.configIdControl.valueChanges;
    }

    get configIdControlValue(): number | null {
        return this.configIdControl.value;
    }

    get colorCodeControlValue(): string | null {
        return this.colorCodeControl.value;
    }

    setColorCodeControlValue(colorCode: string): void {
        this.colorCodeControl.setValue(colorCode);
    }

    resetConfigIdControl(): void {
        return this.configIdControl.reset();
    }
}