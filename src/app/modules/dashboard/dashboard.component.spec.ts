import { ComponentFixture, TestBed } from '@angular/core/testing'

import { DashboardComponent } from './dashboard.component'
import { HttpClientModule } from '@angular/common/http'
import { RouterTestingModule } from '@angular/router/testing'
import { UserAuthService } from 'src/app/services/user-auth.service'
import { of } from 'rxjs'

describe('DashboardComponent', () => {
    let component: DashboardComponent
    let fixture: ComponentFixture<DashboardComponent>
    let userAuthService: UserAuthService

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [DashboardComponent],
            imports: [HttpClientModule, RouterTestingModule],
            providers: [UserAuthService],
        }).compileComponents()
    })

    beforeEach(() => {
        fixture = TestBed.createComponent(DashboardComponent)
        component = fixture.componentInstance
        userAuthService = TestBed.inject(UserAuthService)
        fixture.detectChanges()
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })
    it('should call fetchTrendingMovies and fetchPopularMovies methods on component initialization', () => {
        spyOn(component, 'fetchTrendingMovies')
        spyOn(component, 'fetchPopularMovies')
        component.ngOnInit()
        expect(component.fetchTrendingMovies).toHaveBeenCalled()
        expect(component.fetchPopularMovies).toHaveBeenCalled()
    })
    it('should fetch trending movies', () => {
        // Define mock response for the `fetchTrendingMoviess` method
        const mockResponse = {
            results: [{ title: 'Movie 1' }, { title: 'Movie 2' }],
        }

        // Spy on the `fetchTrendingMoviess` method and return the mock response
        spyOn(userAuthService, 'fetchTrendingMoviess').and.returnValue(of(mockResponse))

        // Call the `fetchTrendingMovies` method
        component.fetchTrendingMovies()

        // Expect that the `fetchTrendingMoviess` method was called
        expect(userAuthService.fetchTrendingMoviess).toHaveBeenCalled()

        // Expect that the `allTrendingMovies` property was updated with the correct value
        expect(component.allTrendingMovies).toEqual(mockResponse.results)
    })
    it('should fetch popular movies', () => {
        // Define mock response for the `fetchPopularMoviess` method
        const mockResponse = {
            results: [{ title: 'Movie 1' }, { title: 'Movie 2' }],
        }

        // Spy on the `fetchPopularMoviess` method and return the mock response
        spyOn(userAuthService, 'fetchPopularMoviess').and.returnValue(of(mockResponse))

        // Call the `fetchPopularMovies` method
        component.fetchPopularMovies()

        // Expect that the `fetchPopularMoviess` method was called
        expect(userAuthService.fetchPopularMoviess).toHaveBeenCalled()

        // Expect that the `allPopularMovies` property was updated with the correct value
        expect(component.allPopularMovies).toEqual(mockResponse.results)
    })
})
