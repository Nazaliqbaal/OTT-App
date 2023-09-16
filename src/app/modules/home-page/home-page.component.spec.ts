import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing'
import { RouterTestingModule } from '@angular/router/testing'
import { HomePageComponent } from './home-page.component'
import { UserAuthService } from 'src/app/services/user-auth.service'
import { HttpClientModule } from '@angular/common/http'
import { ActivatedRoute, NavigationEnd, Router, Routes } from '@angular/router'
import { Location } from '@angular/common'

describe('HomePageComponent', () => {
    let component: HomePageComponent
    let fixture: ComponentFixture<HomePageComponent>
    let router: Router
    let route: ActivatedRoute
    let location: Location

    const routes: Routes = [
        { path: 'home/movies', component: HomePageComponent },
        { path: 'home/series', component: HomePageComponent },
    ]

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [HomePageComponent],
            imports: [RouterTestingModule, HttpClientModule, RouterTestingModule.withRoutes(routes)],
            providers: [UserAuthService],
        }).compileComponents()
    })

    beforeEach(() => {
        fixture = TestBed.createComponent(HomePageComponent)
        component = fixture.componentInstance
        location = TestBed.inject(Location)
        router = TestBed.inject(Router)
        route = TestBed.inject(ActivatedRoute)
        fixture.detectChanges()
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })
    it('should set the correct dropdown options', () => {
        expect(component.dropDownData).toEqual([
            {
                name: 'Ott-app',
                onClick: jasmine.any(Function),
            },
            {
                name: 'Logout',
                onClick: jasmine.any(Function),
            },
        ])

        component.dropDownData[0].onClick()
        component.dropDownData[1].onClick()
        expect(component.dropDownData[0].name).toBe('Ott-app')
        expect(component.dropDownData[1].name).toBe('Logout')
    })

    it('should go back to previous page when goBack() is called', () => {
        spyOn(window.history, 'back')
        component.goBack()
        expect(window.history.back).toHaveBeenCalled()
    })

    it('should navigate to the search page with the given query string', () => {
        const query = 'test'
        const routerSpy = spyOn(component.router, 'navigate')

        component.searchResult(query)

        expect(routerSpy).toHaveBeenCalledWith(['/home/search', query])
    })

    it('should set inputPlaceholder to "Search for movies or TV series" by default', () => {
        expect(component.inputPlaceholder).toBe('Search for movies or TV series')
    })

    it('should navigate to the URL and trigger the navigationEnd event', fakeAsync(() => {
        router.navigate(['/home/movies'])
        tick()
        expect(location.path()).toBe('/home/movies')
        expect(router.events).toBeTruthy()
        router.events.subscribe((event) => {
            if (event instanceof NavigationEnd) {
                expect(event.url).toBe('/home/movies')
            }
        })
        expect(component.inputPlaceholder).toBe('Search for movies')
    }))

    it('should navigate to the URL and trigger the navigationEnd event', fakeAsync(() => {
        router.navigate(['/home/series'])
        tick()
        expect(location.path()).toBe('/home/series')
        expect(router.events).toBeTruthy()
        router.events.subscribe((event) => {
            if (event instanceof NavigationEnd) {
                expect(event.url).toBe('/home/series')
            }
        })
        expect(component.inputPlaceholder).toBe('Search for TV series')
    }))
})
