import { ComponentFixture, TestBed } from '@angular/core/testing'
import { ActivatedRoute } from '@angular/router'
import { of } from 'rxjs'

import { MovieGenrePageComponent } from '../movie-genre-page/movie-genre-page.component'
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
        // To create a mock for the ActivatedRoute object
        activatedRoute = {
            params: of({ moviesSeries: 'movies' }),
        } as any

        // To create a mock for the UserAuthService object
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

        fixture.detectChanges()
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })

    it('should set isApi1 to true and fetch movie genres', () => {
        // Set up the mock response for fetchMovieGenre
        spyOn(userAuthService, 'fetchMovieGenre').and.returnValue(
            of({
                genres: [
                    { id: 1, name: 'Action' },
                    { id: 2, name: 'Comedy' },
                ],
            })
        )

        expect(component.isApi1).toBeTrue()

        component.fetchMovieTypes()

        expect(userAuthService.fetchMovieGenre).toHaveBeenCalledWith('movie')
        expect(component.movieSeriesGenres).toEqual([
            { id: 1, name: 'Action' },
            { id: 2, name: 'Comedy' },
        ])
    })

    it('should set isApi1 to false and fetch TV series genres', () => {
        // Set up the mock response for fetchMovieGenre
        spyOn(userAuthService, 'fetchMovieGenre').and.returnValue(
            of({
                genres: [
                    { id: 3, name: 'Drama' },
                    { id: 4, name: 'Mystery' },
                ],
            })
        )

        activatedRoute.params = of({ moviesSeries: 'series' })

        component.ngOnInit()

        expect(userAuthService.fetchMovieGenre).toHaveBeenCalledWith('tv')
        expect(component.movieSeriesGenres).toEqual([
            { id: 3, name: 'Drama' },
            { id: 4, name: 'Mystery' },
        ])
    })
})
