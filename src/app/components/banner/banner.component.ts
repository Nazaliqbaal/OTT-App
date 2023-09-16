import { Component, Input } from '@angular/core'

@Component({
    selector: 'app-banner',
    templateUrl: './banner.component.html',
    styleUrls: ['./banner.component.scss'],
})
export class BannerComponent {
    @Input() background: string = ''
    @Input() year: string = ''
    @Input() overview: string = ''
    @Input() title: string = ''
    @Input() voteAverage: string = ''
    @Input() movieRoute: string | null = null
}
