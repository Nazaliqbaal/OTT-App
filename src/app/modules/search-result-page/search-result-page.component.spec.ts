import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing'
import { ActivatedRoute, Params, Router } from '@angular/router'
import { of } from 'rxjs'
import { IMovieSeries, SearchResultPageComponent } from './search-result-page.component'
import { UserAuthService } from 'src/app/services/user-auth.service'

describe('SearchResultPageComponent', () => {
    let component: SearchResultPageComponent
    let fixture: ComponentFixture<SearchResultPageComponent>
    let mockActivatedRoute: any
    let mockRouter: any
    let mockUserAuthService: any

    beforeEach(
        waitForAsync(() => {
            mockActivatedRoute = {
                params: of({
                    query: 'test',
                } as Params),
            }

            mockRouter = {
                navigate: jasmine.createSpy('navigate'),
            }

            mockUserAuthService = {
                fetchMoviesSeries: jasmine.createSpy('fetchMoviesSeries').and.returnValue(
                    of({
                        total_results: 1,
                        results: [
                            {
                                adult: false,
                                backdrop_path: '',
                                genre_ids: [],
                                id: 1,
                                media_type: '',
                                original_language: '',
                                original_name: '',
                                original_title: '',
                                overview: '',
                                popularity: 0,
                                poster_path: '',
                                release_date: '',
                                first_air_date: '',
                                title: '',
                                video: false,
                                vote_average: 0,
                                vote_count: 0,
                            },
                        ] as IMovieSeries[],
                    })
                ),
            }

            TestBed.configureTestingModule({
                declarations: [SearchResultPageComponent],
                providers: [
                    { provide: ActivatedRoute, useValue: mockActivatedRoute },
                    { provide: Router, useValue: mockRouter },
                    { provide: UserAuthService, useValue: mockUserAuthService },
                ],
            }).compileComponents()
        })
    )

    beforeEach(() => {
        fixture = TestBed.createComponent(SearchResultPageComponent)
        component = fixture.componentInstance
        fixture.detectChanges()
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })

    it('should fetch movies series from UserAuthService when initialized', () => {
        expect(mockUserAuthService.fetchMoviesSeries).toHaveBeenCalledWith('test', 1)
    })

    it('should navigate to no-result page if search result is empty', () => {
        mockUserAuthService.fetchMoviesSeries.and.returnValue(
            of({
                total_results: 0,
                results: [] as IMovieSeries[],
            })
        )

        component.ngOnInit()
        expect(mockRouter.navigate).toHaveBeenCalledWith(['/no-result', 'test'])
    })

    it('should fetch more movies series when user scrolls down the page', () => {
        component.currentPage = 1
        component.totalItems = 2

        component.onScroll()

        expect(component.currentPage).toBe(2)
        expect(mockUserAuthService.fetchMoviesSeries).toHaveBeenCalledWith('test', 2)
    })
})
