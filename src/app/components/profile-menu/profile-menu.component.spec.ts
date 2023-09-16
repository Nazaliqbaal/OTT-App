import { ComponentFixture, TestBed } from '@angular/core/testing'

import { ProfileMenuComponent } from './profile-menu.component'
import { IDropDownData } from '../drop-down-menu/drop-down-menu.component'

describe('ProfileMenuComponent', () => {
    let component: ProfileMenuComponent
    let fixture: ComponentFixture<ProfileMenuComponent>

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ProfileMenuComponent],
        }).compileComponents()
    })

    beforeEach(() => {
        fixture = TestBed.createComponent(ProfileMenuComponent)
        component = fixture.componentInstance
        fixture.detectChanges()
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })

    it('should modify the onClick functions when dropDownData is set', () => {
        const onClick1 = jasmine.createSpy('onClick1')
        const onClick2 = jasmine.createSpy('onClick2')

        const dropDownData: IDropDownData[] = [
            {
                name: 'Item 1',
                onClick: onClick1,
            },
            {
                name: 'Item 2',
                onClick: onClick2,
            },
        ]
        component.dropDownData = dropDownData
        // Verify that the onClick functions have been modified
        expect(component.dropDownData[0].onClick).toEqual(jasmine.any(Function))
        expect(component.dropDownData[1].onClick).toEqual(jasmine.any(Function))
        // Call the onClick functions and verify that the original functions are called
        component.dropDownData[0].onClick()
        component.dropDownData[1].onClick()
        expect(onClick1).toHaveBeenCalled()
        expect(onClick2).toHaveBeenCalled()
    })

    it('should open dropdown', () => {
        component.openDropdown()
        expect(component.isOpen).toBe(true)
    })

    it('should close dropdown', () => {
        component.closeDropdown()
        expect(component.isOpen).toBe(false)
    })
})
