import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core'

@Component({
    selector: 'app-movie-series-card',
    templateUrl: './movie-series-card.component.html',
    styleUrls: ['./movie-series-card.component.scss'],
})
export class MovieSeriesCardComponent {
    @Input() title: string = ''
    @Input() image: string = ''
    @Input() icon: string = ''
    @Input() isBookmark: boolean = false
    @Input() detailRouter: string | null = null
    @Input() year: string = ''
    @Input() label: string = ''
    @Input() id: string = ''
}
