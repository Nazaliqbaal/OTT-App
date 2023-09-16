import { Component, Input, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { UserAuthService } from 'src/app/services/user-auth.service'

@Component({
    selector: 'app-navigation-bar',
    templateUrl: './navigation-bar.component.html',
    styleUrls: ['./navigation-bar.component.scss'],
})
export class NavigationBarComponent {
    constructor(public userAuth: UserAuthService, private router: Router) {}
    @Input() logoRouterLink = '/home'
    dropDownData = [
        {
            name: 'Ott-app',
            onClick: () => {
                console.log('Option 1 clicked')
            },
        },
        {
            name: 'Logout',
            onClick: () => {
                this.userAuth.logOutUser()
            },
        },
    ]
}
