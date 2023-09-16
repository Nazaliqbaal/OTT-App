import { Component } from '@angular/core'
import { BookmarkService } from 'src/app/services/bookmark.service'
import { environment } from 'src/environments/environment'

@Component({
    selector: 'app-bookmark-page',
    templateUrl: './bookmark-page.component.html',
    styleUrls: ['./bookmark-page.component.scss'],
})
export class BookmarkPageComponent {
    imageBaseUrl: string = environment.imageBaseUrl
    constructor(public bookmarkService: BookmarkService) {}
}
