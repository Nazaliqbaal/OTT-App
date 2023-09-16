import {
    Component,
    EventEmitter,
    forwardRef,
    Inject,
    InjectFlags,
    INJECTOR,
    Injector,
    Input,
    OnInit,
    Output,
} from '@angular/core'
import { Subject } from 'rxjs'
import { AbstractControl, ControlValueAccessor, NG_VALIDATORS, NG_VALUE_ACCESSOR, NgControl, Validator } from '@angular/forms'

const VALIDATION_TXT: any = {
    email: 'Invalid email',
    password: 'Empty password',
    required: 'Field is required',
    username: 'Invalid username',
    MATCH_PASSWORD: 'Password is not matching!',
}

export function username(AC: AbstractControl): null | { username: boolean } {
    const regex = /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/
    if (AC.value === null) {
        return null
    }
    return regex.test(AC.value) ? null : { username: true }
}

export function email(AC: AbstractControl): null | { email: boolean } {
    const regex =
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    if (AC.value === null) {
        return null
    }
    return AC.value.indexOf('@') > 64 || AC.value.length > 255 || !regex.test(AC.value) ? { email: true } : null
}

export function passwordMatch(AC: AbstractControl): null | { MATCH_PASSWORD: boolean } {
    if (AC.parent?.get('password')?.value === AC.value) return null
    return { MATCH_PASSWORD: true }
}

@Component({
    selector: 'app-input',
    templateUrl: './input.component.html',
    styleUrls: ['./input.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => InputComponent),
            multi: true,
        },

        { provide: NG_VALIDATORS, useExisting: forwardRef(() => InputComponent), multi: true },
    ],
})
export class InputComponent implements ControlValueAccessor, OnInit, Validator {
    @Input() label: string = ''
    @Input() type: string = 'text'
    @Input() placeholder: string = ''
    @Input() value: string | number = ''
    @Output() onChange = new EventEmitter<any>()

    public ngControl?: NgControl
    public error$ = new Subject()
    public focusIn = false
    public validationAttempt = false

    constructor(@Inject(INJECTOR) private injector: Injector) {}

    ngOnInit() {
        this.ngControl = this.injector.get(NgControl, undefined, InjectFlags.Optional)
    }

    validate(control: AbstractControl): any {
        setTimeout(() => {
            if ((!this.focusIn && control.touched) || (this.focusIn && this.validationAttempt)) this.checkErrors()
        })
    }

    set input(value: string) {
        this.onChangeFn(value)
        this.onTouchFn(value)
        this.onChange.emit(value)
    }

    onChangeFn: any = () => {}

    onTouchFn: any = () => {}

    public writeValue(value: any) {
        this.error$.next(undefined)
        setTimeout(() => {
            this.value = value
        })
    }

    public registerOnChange(fn: any) {
        this.onChangeFn = fn
    }

    public registerOnTouched(fn: any) {
        this.onTouchFn = fn
    }

    public checkErrors(): void {
        if (!this.ngControl?.control?.errors) {
            this.error$.next(undefined)
            return
        }
        const key = Object.keys(this.ngControl.control.errors)[0]
        this.validationAttempt = true
        this.error$.next(VALIDATION_TXT[key])
    }
}
