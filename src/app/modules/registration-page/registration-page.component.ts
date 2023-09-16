import { Component } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Router } from '@angular/router'
import { UserAuthService } from 'src/app/services/user-auth.service'
import { username, email, passwordMatch } from 'src/app/components/input/input.component'

@Component({
    selector: 'app-registration-page',
    templateUrl: './registration-page.component.html',
    styleUrls: ['./registration-page.component.scss'],
})
export class RegistrationPageComponent {
    successMessage: string = ''
    errorMessage: string = ''
    registerForm: FormGroup = this.formBuilder.group({
        username: this.formBuilder.control(null, [Validators.required, username]),
        email: this.formBuilder.control(null, [Validators.required, email]),
        password: this.formBuilder.control(null, Validators.required),
        confirmpassword: this.formBuilder.control(null, [Validators.required, passwordMatch]),
    })

    constructor(private formBuilder: FormBuilder, public userauth: UserAuthService, public router: Router) {}

    onRegistration() {
        const user = this.registerForm.value
        this.userauth.registerUser(user).subscribe(
            (response: any) => {
                this.successMessage = 'Registration successful!'
                this.errorMessage = ''

                setTimeout(() => {
                    this.router.navigate(['/home'])
                }, 2000)
            },
            (error) => {
                console.log(error)
                this.errorMessage = `Registration failed,${error.error.error.message}`
                this.successMessage = ''
            }
        )
    }
}
