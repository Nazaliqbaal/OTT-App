import { Injectable } from '@angular/core'
import { CanActivate, Router } from '@angular/router'
import { JwtHelperService } from '@auth0/angular-jwt'

@Injectable()
export class AuthGuardService implements CanActivate {
    constructor(public router: Router, public jwtHelper: JwtHelperService) {}

    public isAuthenticated(): boolean {
        const token = localStorage.getItem('token')
        return !this.jwtHelper.isTokenExpired(token)
    }

    canActivate(): boolean {
        if (!this.isAuthenticated()) {
            this.router.navigate(['/login'])
            return false
        }
        return true
    }
}
