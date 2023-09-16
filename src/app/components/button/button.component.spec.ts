import { ComponentFixture, TestBed } from '@angular/core/testing'

import { ButtonComponent } from './button.component'

describe('ButtonComponent', () => {
    let component: ButtonComponent
    let fixture: ComponentFixture<ButtonComponent>

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ButtonComponent],
        }).compileComponents()
    })

    beforeEach(() => {
        fixture = TestBed.createComponent(ButtonComponent)
        component = fixture.componentInstance
        fixture.detectChanges()
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })

        it('should render the label', () => {
            const label = 'Click me!'
            component.label = label
            fixture.detectChanges()
            const button = fixture.nativeElement.querySelector('button')
            expect(button.textContent.trim()).toEqual(label)
        })

        it('should apply the "primary" class when type is "primary"', () => {
            component.type = 'primary'
            fixture.detectChanges()
            const button = fixture.nativeElement.querySelector('button')
            expect(button.classList.contains('primary')).toBeTrue()
        })

        it('should apply the "secondary" class when type is "secondary"', () => {
            component.type = 'secondary'
            fixture.detectChanges()
            const button = fixture.nativeElement.querySelector('button')
            expect(button.classList.contains('secondary')).toBeTrue()
        })

        it('should apply the "large" class when size is "large"', () => {
            component.size = 'large'
            fixture.detectChanges()
            const button = fixture.nativeElement.querySelector('button')
            expect(button.classList.contains('large')).toBeTrue()
        })

        it('should disable the button when disabled is true', () => {
            component.disabled = true
            fixture.detectChanges()
            const button = fixture.nativeElement.querySelector('button')
            expect(button.disabled).toBeTrue()
        })

        it('should enable the button by default when disabled is not set', () => {
            const button = fixture.nativeElement.querySelector('button')
            expect(button.disabled).toBeFalse()
        })
})
