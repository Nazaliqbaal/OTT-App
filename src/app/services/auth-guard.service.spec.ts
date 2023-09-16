import { TestBed } from '@angular/core/testing'
import { Router } from '@angular/router'
import { AuthGuardService } from './auth-guard.service'
import { JwtHelperService, JwtModule } from '@auth0/angular-jwt'

describe('MyAuthGuard', () => {
    let guard: AuthGuardService
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
            ],
            providers: [AuthGuardService, { provide: Router, useValue: { navigate: jasmine.createSpy('navigate') } }, JwtHelperService],
        })
        guard = TestBed.inject(AuthGuardService)
        router = TestBed.inject(Router)
    })

    it('should return false if token is null', () => {
        // Spy on localStorage.getItem() to return null
        const getItemSpy = spyOn(localStorage, 'getItem').and.returnValue(null)
        const result = guard.isAuthenticated()

        expect(getItemSpy).toHaveBeenCalled() // Ensure getItem() was called
        expect(getItemSpy).toHaveBeenCalledWith('token') // Ensure getItem() was called with the correct key
        expect(result).toBeFalse() // Ensure the correct result is returned
    })

    it('should return true if user is authenticated', () => {
        // Mock isAuthenticated() to return true
        spyOn(guard, 'isAuthenticated').and.returnValue(true)
        const result = guard.canActivate()

        expect(result).toBeTrue()
        expect(guard.isAuthenticated).toHaveBeenCalledOnceWith() // Ensure isAuthenticated() was called
        expect(router.navigate).not.toHaveBeenCalled() // Ensure navigate() was not called
    })

    it('should return false and navigate to login page if user is not authenticated', () => {
        // Mock isAuthenticated() to return false
        spyOn(guard, 'isAuthenticated').and.returnValue(false)
        const result = guard.canActivate()

        expect(result).toBeFalse()
        expect(guard.isAuthenticated).toHaveBeenCalledOnceWith() // Ensure isAuthenticated() was called
        expect(router.navigate).toHaveBeenCalledOnceWith(['/login']) // Ensure navigate() was called with the correct URL
    })
})
