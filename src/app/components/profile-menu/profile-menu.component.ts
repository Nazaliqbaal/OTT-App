import { Component, EventEmitter, Input, OnInit } from '@angular/core'
import { IDropDownData } from '../drop-down-menu/drop-down-menu.component'

@Component({
    selector: 'app-profile-menu',
    templateUrl: './profile-menu.component.html',
    styleUrls: ['./profile-menu.component.scss'],
})
export class ProfileMenuComponent {
    private _dropDownData: IDropDownData[] = []
    isOpen = false

    @Input() icon: string | null = null

    @Input() set dropDownData(value: IDropDownData[]) {
        const result = value.map((x) => {
            return {
                ...x,
                onClick: () => {
                    this.closeDropdown()
                    x.onClick()
                },
            }
        })
        this._dropDownData = result
    }

    get dropDownData() {
        return this._dropDownData
    }

    openDropdown() {
        this.isOpen = true
    }

    closeDropdown() {
        this.isOpen = false
    }
}
