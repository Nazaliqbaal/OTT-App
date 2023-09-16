import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core'

@Component({
    selector: 'app-card',
    templateUrl: './card.component.html',
    styleUrls: ['./card.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class CardComponent {
    @Input() type: 'primary' | 'secondary' = 'primary'
}
