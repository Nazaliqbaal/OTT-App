import { ComponentFixture, TestBed } from '@angular/core/testing'

import { DetailPageComponent } from './detail-page.component'
import { RouterTestingModule } from '@angular/router/testing'
import { HttpClientModule } from '@angular/common/http'
import { UserAuthService } from 'src/app/services/user-auth.service'
import { of } from 'rxjs'

describe('DetailPageComponent', () => {
    let component: DetailPageComponent
    let fixture: ComponentFixture<DetailPageComponent>

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [DetailPageComponent],
            imports: [HttpClientModule, RouterTestingModule],
            providers: [UserAuthService],
        }).compileComponents()
    })

    beforeEach(() => {
        fixture = TestBed.createComponent(DetailPageComponent)
        component = fixture.componentInstance
        fixture.detectChanges()
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })

    it('should call fetchMovieData and fetchMovieCast with correct parameters when url includes "movies"', () => {
        spyOn(component.userAuth, 'fetchMovieData').and.returnValue(of({}))
        spyOn(component.userAuth, 'fetchMovieCast').and.returnValue(of({}))
        spyOnProperty(component.router, 'url', 'get').and.returnValue('http://localhost:4200/movies/123')
        component.ngOnInit()
        expect(component.userAuth.fetchMovieData).toHaveBeenCalledWith('movie', component.movieId)
        expect(component.userAuth.fetchMovieCast).toHaveBeenCalledWith('movie', component.movieId)
    })

    it('should call fetchMovieData and fetchMovieCast with correct parameters when url includes "series"', () => {
        spyOn(component.userAuth, 'fetchMovieData').and.returnValue(of({}))
        spyOn(component.userAuth, 'fetchMovieCast').and.returnValue(of({}))
        spyOnProperty(component.router, 'url', 'get').and.returnValue('http://localhost:4200/series/123')
        component.ngOnInit()
        expect(component.userAuth.fetchMovieData).toHaveBeenCalledWith('tv', component.movieId)
        expect(component.userAuth.fetchMovieCast).toHaveBeenCalledWith('tv', component.movieId)
    })
})
