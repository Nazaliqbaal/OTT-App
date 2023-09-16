import { ComponentFixture, TestBed } from '@angular/core/testing'
import { ActivatedRoute, Params } from '@angular/router'
import { NoResultPageComponent } from './no-result-page.component'
import { RouterTestingModule } from '@angular/router/testing'

describe('NoResultPageComponent', () => {
    let component: NoResultPageComponent
    let fixture: ComponentFixture<NoResultPageComponent>

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [NoResultPageComponent],
            imports: [RouterTestingModule.withRoutes([])],
            providers: [
                {
                    provide: ActivatedRoute,
                    useValue: {
                        params: {
                            subscribe: (fn: (value: Params) => void) =>
                                fn({
                                    errorData: 'test-movie',
                                }),
                        },
                    },
                },
            ],
        }).compileComponents()
    })

    beforeEach(() => {
        fixture = TestBed.createComponent(NoResultPageComponent)
        component = fixture.componentInstance
        fixture.detectChanges()
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })

    it('should display the error movie in the message', () => {
        const noResultMessage = fixture.nativeElement.querySelector('.no-result-message')
        expect(noResultMessage.textContent).toContain('No Results found for the search test-movie')
    })

    it('should have a back arrow button that links to the home page', () => {
        const backButton = fixture.nativeElement.querySelector('a')
        expect(backButton.getAttribute('routerLink')).toBe('/home')
    })
})
