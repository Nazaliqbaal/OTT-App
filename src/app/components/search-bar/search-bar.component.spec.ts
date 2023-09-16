import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing'
import { SearchBarComponent } from './search-bar.component'
import { By } from '@angular/platform-browser'
import { of } from 'rxjs'
import { BreakpointObserver, BreakpointState, Breakpoints } from '@angular/cdk/layout'

describe('SearchBarComponent', () => {
    let component: SearchBarComponent
    let fixture: ComponentFixture<SearchBarComponent>

    beforeEach(async () => {
        const breakpointObserverMock = {
            observe: () => of({ matches: true }),
        }

        await TestBed.configureTestingModule({
            declarations: [SearchBarComponent],
            providers: [{ provide: BreakpointObserver, useValue: breakpointObserverMock }],
        }).compileComponents()
    })

    beforeEach(() => {
        fixture = TestBed.createComponent(SearchBarComponent)
        component = fixture.componentInstance
        fixture.detectChanges()
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })
    it('should emit search event on button click', () => {
        spyOn(component.search, 'emit')
        component.searchValue = 'test'
        fixture.detectChanges()
        const button = fixture.debugElement.query(By.css('app-button')).nativeElement
        button.click()
        expect(component.search.emit).toHaveBeenCalledWith('test')
    })
    it('should update searchValue on input', () => {
        const testValue = 'test'
        const inputElement = fixture.debugElement.query(By.css('.searchInput')).nativeElement

        inputElement.value = testValue
        inputElement.dispatchEvent(new Event('input'))

        fixture.detectChanges()

        expect(component.searchValue).toEqual(testValue)
    })
    it('should observe the Handset breakpoint', () => {
        spyOn(component.breakpointObserver, 'observe').and.returnValue(of({ breakpoints: { xs: true }, matches: true } as BreakpointState))
        component.ngOnInit()
        expect(component.breakpointObserver.observe).toHaveBeenCalledWith([Breakpoints.Handset])
    })
    it('should emit search event on subscribe when breakpoint is true', () => {
        // Mock the observe method to return a matching breakpoint state
        spyOn(component.breakpointObserver, 'observe').and.returnValue(of({ breakpoints: { xs: true }, matches: true } as BreakpointState))

        // Set the search value
        component.searchValue = 'test'

        // Call ngOnInit to subscribe to the breakpointObserver and search for the input element
        component.ngOnInit()

        // Check that the search event is emitted with the expected searchValue
        component.search.subscribe((value) => {
            console.log(value)
            expect(value).toEqual('test')
        })
    })
    it('should emit search value on keydown after debounce time', fakeAsync(() => {
        const searchValue = 'test value'
        spyOn(component.search, 'emit')
        const inputElement = fixture.debugElement.query(By.css('input')).nativeElement
        inputElement.value = searchValue // set the input element value
        inputElement.dispatchEvent(new KeyboardEvent('keydown'))
        tick(1000)
        expect(inputElement.value).toBe(searchValue) // ensure input element value is set
    }))
})
