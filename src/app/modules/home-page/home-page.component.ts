import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router'
import { UserAuthService } from 'src/app/services/user-auth.service'

@Component({
    selector: 'app-home-page',
    templateUrl: './home-page.component.html',
    styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements OnInit {
    inputPlaceholder = 'Search for movies or TV series'

    constructor(public router: Router, public route: ActivatedRoute, private userAuth: UserAuthService) {}

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

    ngOnInit() {
        this.router.events.subscribe((event) => {
            if (this.router.url === '/home/movies') {
                this.inputPlaceholder = 'Search for movies'
            } else if (this.router.url === '/home/series') {
                this.inputPlaceholder = 'Search for TV series'
            } else {
                this.inputPlaceholder = 'Search for movies or TV series'
            }
        })
    }

    searchResult(query: string) {
        this.router.navigate(['/home/search', query])
    }

    isMobileView(): boolean {
        return window.innerWidth <= 768
    }

    goBack() {
        window.history.back()
    }
}
