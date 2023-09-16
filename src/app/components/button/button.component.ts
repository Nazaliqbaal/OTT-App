import { Component, Input} from '@angular/core'

@Component({
    selector: 'app-button',
    templateUrl: './button.component.html',
    styleUrls: ['./button.component.scss'],
})
export class ButtonComponent {
    @Input() label = ''
    @Input() disabled = false
    @Input() type: 'primary' | 'secondary' = 'primary'
    @Input() size: 'large' | 'small' = 'small'
}
