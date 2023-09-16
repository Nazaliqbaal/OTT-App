import { TestBed } from '@angular/core/testing'
import { RouterTestingModule } from '@angular/router/testing'
import { Router } from '@angular/router'
import { JwtHelperService, JwtModule } from '@auth0/angular-jwt'
import { LoginRegisterAuthService } from './login-register-auth.service'

describe('LoginRegisterAuthService', () => {
    let service: LoginRegisterAuthService
    let router: Router

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                JwtModule.forRoot({
                    config: {
                        tokenGetter: () => {
                            return localStorage.getItem('token')
                        },
                        allowedDomains: ['example.com'],
                        disallowedRoutes: ['example.com/examplebadroute/'],
                    },
                }),
                RouterTestingModule,
            ],
            providers: [JwtHelperService, LoginRegisterAuthService],
        })

        service = TestBed.inject(LoginRegisterAuthService)
        router = TestBed.inject(Router)
    })

    it('should return false if token is not present', () => {
        // Mock the localStorage.getItem() method to return null
        spyOn(localStorage, 'getItem').and.returnValue(null)
        const result = service.isAuthenticated()

        expect(localStorage.getItem).toHaveBeenCalledWith('token')
        expect(result).toBeFalse()
    })

    it('should redirect to home if user is already authenticated', () => {
        // Spy on the isAuthenticated() method to return true
        spyOn(service, 'isAuthenticated').and.returnValue(true)
        const navigateSpy = spyOn(router, 'navigate')
        const result = service.canActivate()

        expect(service.isAuthenticated).toHaveBeenCalled()
        expect(navigateSpy).toHaveBeenCalledWith(['/home'])
        expect(result).toBeFalse()
    })

    it('should allow access if user is not authenticated', () => {
        // Spy on the isAuthenticated() method to return false
        spyOn(service, 'isAuthenticated').and.returnValue(false)
        const navigateSpy = spyOn(router, 'navigate')
        const result = service.canActivate()

        expect(service.isAuthenticated).toHaveBeenCalled()
        expect(navigateSpy).not.toHaveBeenCalled()
        expect(result).toBeTrue()
    })
})
