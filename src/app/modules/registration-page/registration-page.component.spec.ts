import { HttpClientModule } from '@angular/common/http'
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing'
import { ReactiveFormsModule, Validators } from '@angular/forms'
import { RouterTestingModule } from '@angular/router/testing'
import { UserAuthService } from 'src/app/services/user-auth.service'
import { RegistrationPageComponent } from './registration-page.component'
import { Router } from '@angular/router'
import { of, throwError } from 'rxjs'

describe('RegistrationPageComponent', () => {
    let component: RegistrationPageComponent
    let fixture: ComponentFixture<RegistrationPageComponent>
    let authService: UserAuthService
    let router: Router

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [RegistrationPageComponent],
            imports: [ReactiveFormsModule, HttpClientModule, RouterTestingModule],
            providers: [UserAuthService],
        }).compileComponents()

        authService = TestBed.inject(UserAuthService)
        router = TestBed.inject(Router)
    })

    beforeEach(() => {
        fixture = TestBed.createComponent(RegistrationPageComponent)
        component = fixture.componentInstance
        fixture.detectChanges()
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })

    it('should have a registration form with username,email,password and confirm password controls', () => {
        expect(component.registerForm).toBeDefined()
        expect(component.registerForm.controls['username']).toBeDefined()
        expect(component.registerForm.controls['email']).toBeDefined()
        expect(component.registerForm.controls['password']).toBeDefined()
        expect(component.registerForm.controls['confirmpassword']).toBeDefined()
    })

    it('should have username,email,password and confirm password controls with required validator', () => {
        expect(component.registerForm.controls['username'].hasValidator(Validators.required)).toBeTruthy()
        expect(component.registerForm.controls['email'].hasValidator(Validators.required)).toBeTruthy()
        expect(component.registerForm.controls['password'].hasValidator(Validators.required)).toBeTruthy()
        expect(component.registerForm.controls['confirmpassword'].hasValidator(Validators.required)).toBeTruthy()
    })
    it('should call userauth.registerUser method with form values when onRegistration is called', () => {
        spyOn(authService, 'registerUser').and.returnValue(of({ jwt: 'testToken' }))
        spyOn(localStorage, 'setItem')

        const formValues = { username: 'testuser', email: 'testuser@test.com', password: 'testpassword', confirmpassword: 'testpassword' }
        component.registerForm.setValue(formValues)
        component.onRegistration()

        expect(authService.registerUser).toHaveBeenCalledWith(formValues)
    })
    it('should display success message and navigate to home page when registration is successful', fakeAsync(() => {
        spyOn(authService, 'registerUser').and.returnValue(of({ jwt: 'testToken' }))
        spyOn(localStorage, 'setItem')
        spyOn(router, 'navigate')

        const formValues = { username: 'testuser', email: 'testuser@test.com', password: 'testpassword', confirmpassword: 'testpassword' }
        component.registerForm.setValue(formValues)
        component.onRegistration()
        tick(2000)

        expect(component.successMessage).toEqual('Registration successful!')
        expect(component.errorMessage).toEqual('')
        expect(router.navigate).toHaveBeenCalledWith(['/home'])
    }))
    it('should display error message when registration fails', fakeAsync(() => {
        // create an error response to simulate registration failure
        const errorResponse = { error: { error: { message: 'Registration failed' } } }
        spyOn(authService, 'registerUser').and.returnValue(throwError(errorResponse))

        // set form values
        const formValues = { username: 'testuser', email: 'testuser@test.com', password: 'testpassword', confirmpassword: 'testpassword' }
        component.registerForm.setValue(formValues)

        // trigger registration
        component.onRegistration()
        tick()

        // check that error message is displayed
        expect(component.successMessage).toBe('')
        expect(component.errorMessage).toBe('Registration failed,Registration failed')
    }))
})
