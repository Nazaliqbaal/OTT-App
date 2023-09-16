import { ComponentFixture, TestBed } from '@angular/core/testing'
import { ActivatedRoute } from '@angular/router'
import { of } from 'rxjs'

import { MovieGenrePageComponent } from './movie-genre-page.component'
import { UserAuthService } from 'src/app/services/user-auth.service'
import { HttpClientModule } from '@angular/common/http'
import { RouterTestingModule } from '@angular/router/testing'

describe('MovieGenrePageComponent', () => {
    let component: MovieGenrePageComponent
    let fixture: ComponentFixture<MovieGenrePageComponent>
    let userAuthService: UserAuthService
    let activatedRoute: ActivatedRoute

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [MovieGenrePageComponent],
            imports: [HttpClientModule, RouterTestingModule],
            providers: [UserAuthService],
        }).compileComponents()
    })

    beforeEach(() => {
        // Create a mock for the ActivatedRoute object
        activatedRoute = {
            params: of({ moviesSeries: 'movies' }),
        } as any

        // Create a mock for the UserAuthService object
        userAuthService = {
            fetchMovieGenre: () =>
                of({
                    genres: [
                        { id: 1, name: 'Action' },
                        { id: 2, name: 'Comedy' },
                    ],
                }),
        } as any

        fixture = TestBed.createComponent(MovieGenrePageComponent)
        component = fixture.componentInstance

        // Inject the mock dependencies into the component
        component.activatedRoute = activatedRoute
        component.userAuth = userAuthService

        spyOn(component.userAuth, 'fetchMovieGenre').and.callThrough()

        fixture.detectChanges()
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })

    it('should set isApi1 to true and fetch movie genres', () => {
        expect(component.isApi1).toBeTrue()

        component.fetchMovieTypes()

        expect(component.movieSeriesGenres).toEqual([
            { id: 1, name: 'Action' },
            { id: 2, name: 'Comedy' },
        ])
    })

    it('should set movieSeriesGenres correctly when moviesSeries is series', () => {
        activatedRoute = {
            params: of({ moviesSeries: 'series' }),
        } as any
        component.activatedRoute = activatedRoute

        component.fetchMovieTypes()
        fixture.detectChanges()

        expect(component.movieSeriesGenres).toEqual([
            { id: 1, name: 'Action' },
            { id: 2, name: 'Comedy' },
        ])
    })

    it('should call userAuthService.fetchMovieGenre() with "tv" parameter when moviesSeries is series', () => {
        activatedRoute = {
            params: of({ moviesSeries: 'series' }),
        } as any
        component.activatedRoute = activatedRoute

        component.fetchMovieTypes()
        fixture.detectChanges()

        expect(component.userAuth.fetchMovieGenre).toHaveBeenCalledWith('tv')
    })
})
