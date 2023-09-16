import { ComponentFixture, TestBed } from '@angular/core/testing'
import { NavigationEnd, Router } from '@angular/router'
import { RouterTestingModule } from '@angular/router/testing'
import { NavigationMenuComponent, IItems } from './navigation-menu.component'

import { Subject } from 'rxjs'

describe('NavigationMenuComponent', () => {
    let component: NavigationMenuComponent
    let fixture: ComponentFixture<NavigationMenuComponent>
    let router: Router
    let routerSubject: Subject<any>

    beforeEach(async () => {
        routerSubject = new Subject<any>()

        await TestBed.configureTestingModule({
            declarations: [NavigationMenuComponent],
            imports: [RouterTestingModule],
        }).compileComponents()
        TestBed.overrideProvider(Router, { useValue: { events: routerSubject } })
    })

    beforeEach(() => {
        fixture = TestBed.createComponent(NavigationMenuComponent)
        component = fixture.componentInstance
        router = TestBed.inject(Router)
        fixture.detectChanges()
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })

    it('should set the currentUrl when the route changes', () => {
        const testItems: IItems[] = [
            { name: 'Home', icon: 'home', path: '/home' },
            { name: 'About', icon: 'info', path: '/about' },
        ]
        component.items = testItems
        // To create a NavigationEnd event with a URL
        const navigationEnd = new NavigationEnd(0, '/about', '/about')
        // Emit the NavigationEnd event on the routerSubject
        routerSubject.next(navigationEnd)
        //To Check if the currentUrl has been updated
        expect(component.currentUrl).toEqual('/about')
    })
})
