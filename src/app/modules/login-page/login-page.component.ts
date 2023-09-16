import { Component } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { UserAuthService } from 'src/app/services/user-auth.service'
import { Router } from '@angular/router'
import { email } from 'src/app/components/input/input.component'

@Component({
    selector: 'app-login-page',
    templateUrl: './login-page.component.html',
    styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent {
    errorMessage: string = ''
    constructor(private formBuilder: FormBuilder, private userauth: UserAuthService, public router: Router) {}

    loginForm: FormGroup = this.formBuilder.group({
        email: this.formBuilder.control(null, [Validators.required, email]),
        password: this.formBuilder.control(null, Validators.required),
    })

    ngOnInit() {
        this.loginForm.get('email')?.valueChanges.subscribe(() => {
            this.errorMessage = ''
        })
        this.loginForm.get('password')?.valueChanges.subscribe(() => {
            this.errorMessage = ''
        })
    }

    onLogin() {
        const user = {
            identifier: this.loginForm.get('email')?.value,
            password: this.loginForm.get('password')?.value,
        }
        this.router.navigate(['/home'])
        this.userauth.loginUser(user).subscribe(
            (response: any) => {
                console.log('SignIn Successful', response)
                localStorage.setItem('token', response.jwt)
                this.router.navigate(['/home'])
            },
            (error) => {
                console.error('SignIn failed:', error)
                this.errorMessage = `SignIn failed, ${error.error.error.message}`
            }
        )
    }

    onSignUpClick() {
        this.router.navigate(['/register'])
    }
}
