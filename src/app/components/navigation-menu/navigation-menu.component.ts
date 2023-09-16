import { Component, Input, OnInit } from '@angular/core'
import { NavigationEnd, Router } from '@angular/router'

export interface IItems {
    name: string
    icon: string
    path: string
}

@Component({
    selector: 'app-navigation-menu',
    templateUrl: './navigation-menu.component.html',
    styleUrls: ['./navigation-menu.component.scss'],
})
export class NavigationMenuComponent implements OnInit {
    @Input() items: IItems[] = []
    currentUrl: string = '/home'
    ngOnInit() {
        this.router.events.subscribe((event) => {
            if (event instanceof NavigationEnd) {
                this.currentUrl = event.url
            }
        })
    }
    constructor(private router: Router) {}
}
