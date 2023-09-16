import { ComponentFixture, TestBed } from '@angular/core/testing'

import { MovieSeriesCardComponent } from './movie-series-card.component'

describe('MovieSeriesCardComponent', () => {
    let component: MovieSeriesCardComponent
    let fixture: ComponentFixture<MovieSeriesCardComponent>

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [MovieSeriesCardComponent],
        }).compileComponents()
    })

    beforeEach(() => {
        fixture = TestBed.createComponent(MovieSeriesCardComponent)
        component = fixture.componentInstance
        fixture.detectChanges()
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })
})
