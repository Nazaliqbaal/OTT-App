import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { BookmarkService } from 'src/app/services/bookmark.service'

@Component({
    selector: 'app-bookmark-icon',
    templateUrl: './bookmark-icon.component.html',
    styleUrls: ['./bookmark-icon.component.scss'],
})
export class BookmarkIconComponent {
    isBookmark = false
    @Input() title: string = ''
    @Input() image: string = ''
    @Input() year: string = ''
    @Input() label: string = ''
    private _id: string = ''

    constructor(public bookmarkService: BookmarkService) {}

    get id(): string {
        return this._id
    }
    @Input() set id(value: string) {
        this._id = value
        const bookmarkedItems = JSON.parse(this.bookmarkService.getItems() ?? '[]')
        const isBookmarked = bookmarkedItems.some((item: any) => item.id === this._id)
        this.isBookmark = isBookmarked
    }

    toggleBookmark(event: Event) {
        event.stopPropagation()
        if (this.isBookmark === false) {
            const newMovieBookmark = {
                title: this.title,
                label: this.label,
                image: this.image,
                id: this.id,
                year: this.year,
            }
            this.bookmarkService.addItem(newMovieBookmark)
            this.isBookmark = true
        } else if (this.isBookmark) {
            this.bookmarkService.removeItem(this.id)
            this.isBookmark = false
        }
    }
}
