import { HttpClientModule } from '@angular/common/http'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { ReactiveFormsModule, Validators } from '@angular/forms'
import { RouterTestingModule } from '@angular/router/testing'
import { UserAuthService } from 'src/app/services/user-auth.service'
import { LoginPageComponent } from './login-page.component'
import { Router } from '@angular/router'
import { of, throwError } from 'rxjs'

describe('LoginPageComponent', () => {
    let component: LoginPageComponent
    let fixture: ComponentFixture<LoginPageComponent>
    let authService: UserAuthService
    let router: Router

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [LoginPageComponent],
            imports: [ReactiveFormsModule, HttpClientModule, RouterTestingModule],
            providers: [UserAuthService],
        }).compileComponents()

        authService = TestBed.inject(UserAuthService)
        router = TestBed.inject(Router)
    })

    beforeEach(() => {
        fixture = TestBed.createComponent(LoginPageComponent)
        component = fixture.componentInstance
        fixture.detectChanges()
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })

    it('should have a login form with email and password controls', () => {
        expect(component.loginForm).toBeDefined()
        expect(component.loginForm.controls['email']).toBeDefined()
        expect(component.loginForm.controls['password']).toBeDefined()
    })

    it('should have email and password controls with required validator', () => {
        expect(component.loginForm.controls['email'].hasValidator(Validators.required)).toBeTruthy()
        expect(component.loginForm.controls['password'].hasValidator(Validators.required)).toBeTruthy()
    })

    it('should set errorMessage to empty string when email or password value changes', () => {
        component.errorMessage = 'some error message'

        component.loginForm.controls['email'].setValue('example@example.com')
        expect(component.errorMessage).toEqual('')

        component.loginForm.controls['password'].setValue('123456')
        expect(component.errorMessage).toEqual('')
    })

    it('should call loginUser method of AuthService with user data and navigate to home page on successful login', () => {
        const navigateSpy = spyOn(router, 'navigate')
        const user = {
            identifier: 'example@example.com',
            password: 'password',
        }
        const response = {
            jwt: 'jwt_token',
        }
        const authServiceSpy = spyOn(authService, 'loginUser').and.returnValue(of(response))

        component.loginForm.controls['email'].setValue(user.identifier)
        component.loginForm.controls['password'].setValue(user.password)
        component.onLogin()

        expect(authServiceSpy).toHaveBeenCalledWith(user)
        expect(localStorage.getItem('token')).toEqual(response.jwt)
        expect(navigateSpy).toHaveBeenCalledWith(['/home'])
    })

    it('should set errorMessage on login failure', () => {
        const error = {
            error: {
                error: {
                    message: 'Invalid credentials',
                },
            },
        }
        const authServiceSpy = spyOn(authService, 'loginUser').and.returnValue(throwError(error))

        component.loginForm.controls['email'].setValue('example@example.com')
        component.loginForm.controls['password'].setValue('password')
        component.onLogin()

        expect(authServiceSpy).toHaveBeenCalled()
        expect(component.errorMessage).toEqual(`SignIn failed, ${error.error.error.message}`)
    })

    it('should navigate to register page', () => {
        spyOn(component.router, 'navigate').and.callThrough()
        component.onSignUpClick()
        expect(component.router.navigate).toHaveBeenCalledWith(['/register'])
    })
})
