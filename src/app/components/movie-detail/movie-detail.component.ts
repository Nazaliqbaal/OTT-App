import { Component, Input, OnInit } from '@angular/core'

@Component({
    selector: 'app-movie-detail',
    templateUrl: './movie-detail.component.html',
    styleUrls: ['./movie-detail.component.scss'],
})
export class MovieDetailComponent {
    @Input() label!: string
    @Input() movieDetail!: string
}
