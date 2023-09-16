import { Component, Input } from '@angular/core'

@Component({
    selector: 'app-genre',
    templateUrl: './genre.component.html',
    styleUrls: ['./genre.component.scss'],
})
export class GenreComponent {
    @Input() genre: string = ''
    @Input() color: string = ''
    @Input() routerURL: string | null = null
}
