import { Component, EventEmitter, Input, OnInit } from '@angular/core'

export interface IDropDownData {
    name: string
    onClick: () => void
}

@Component({
    selector: 'app-drop-down-menu',
    templateUrl: './drop-down-menu.component.html',
    styleUrls: ['./drop-down-menu.component.scss'],
})
export class DropDownMenuComponent {
    @Input() dropdownData: IDropDownData[] = [];
}
