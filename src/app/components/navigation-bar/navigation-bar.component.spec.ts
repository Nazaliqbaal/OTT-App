import { ComponentFixture, TestBed } from '@angular/core/testing'

import { NavigationBarComponent } from './navigation-bar.component'
import { UserAuthService } from 'src/app/services/user-auth.service'
import { HttpClientModule } from '@angular/common/http'
import { RouterTestingModule } from '@angular/router/testing'

describe('NavigationBarComponent', () => {
    let component: NavigationBarComponent
    let fixture: ComponentFixture<NavigationBarComponent>

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [NavigationBarComponent],
            imports: [HttpClientModule, RouterTestingModule],
            providers: [UserAuthService],
        }).compileComponents()
    })

    beforeEach(() => {
        fixture = TestBed.createComponent(NavigationBarComponent)
        component = fixture.componentInstance
        fixture.detectChanges()
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })

    it('should set default logo router link', () => {
        expect(component.logoRouterLink).toEqual('/home')
    })

    it('should have drop down data with two options', () => {
        expect(component.dropDownData.length).toEqual(2)
    })

    it('should call Ott-app click handler', () => {
        spyOn(console, 'log')
        const ottAppOption = component.dropDownData[0]
        ottAppOption.onClick()
        expect(console.log).toHaveBeenCalledWith('Option 1 clicked')
    })

    it('should update dropdown data after logging out', () => {
        const originalData = component.dropDownData
        spyOn(component.userAuth, 'logOutUser').and.callFake(() => {
            component.dropDownData = []
        })
        const logoutOption = component.dropDownData[1]
        logoutOption.onClick()
        expect(component.userAuth.logOutUser).toHaveBeenCalled()
        expect(component.dropDownData).toEqual([])
        expect(originalData).not.toEqual([])
    })
})
