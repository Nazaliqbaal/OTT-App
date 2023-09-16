import { ComponentFixture, TestBed } from '@angular/core/testing'

import { BookmarkPageComponent } from './bookmark-page.component'
import { BookmarkService } from 'src/app/services/bookmark.service'

describe('BookmarkPageComponent', () => {
    let component: BookmarkPageComponent
    let fixture: ComponentFixture<BookmarkPageComponent>
    let bookmarkService: BookmarkService

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [BookmarkPageComponent],
            providers: [BookmarkService],
        }).compileComponents()
    })

    beforeEach(() => {
        fixture = TestBed.createComponent(BookmarkPageComponent)
        component = fixture.componentInstance
        bookmarkService = TestBed.inject(BookmarkService)
        fixture.detectChanges()
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })
    it('should display "No bookmarked items" when bookmarkService.bookmarkedItems is empty', () => {
        bookmarkService.bookmarkedItems = []
        fixture.detectChanges()
        
        const titleElement = fixture.nativeElement.querySelector('.bookmark-title')
        expect(titleElement.textContent).toBe('No Bookmarked Items')
    })
    it('should display "Bookmarked Movies" when bookmarkService.bookmarkedItems is not empty', () => {
        // Add a fake bookmark to the bookmark service
        const fakeBookmark = {
            label: 'Movie',
            title: 'Fake Movie',
            year: '2022',
            image: 'fake-movie.jpg',
            id: '1',
        }
        bookmarkService.bookmarkedItems = [fakeBookmark]

        // Trigger change detection and get the title element
        fixture.detectChanges()
        const titleElement = fixture.nativeElement.querySelector('.bookmark-title')

        // Verify that the title element displays "Bookmarked Movies"
        expect(titleElement.textContent.trim()).toEqual('Bookmarked Movies')
    })
    beforeEach(() => {
        bookmarkService.bookmarkedItems = []
    })
    it('should display all bookmarked movies', () => {
        const movieData = {
            title: 'The Shawshank Redemption',
            label: 'Movie',
            image: 'shawshank-redemption.jpg',
            id: '1',
            year: '1994',
        }
        bookmarkService.addItem(movieData)
        fixture.detectChanges()
        const movieElements = fixture.nativeElement.querySelectorAll('.movie app-movie-series-card')
        expect(movieElements.length).toEqual(1)
        expect(movieElements[0].getAttribute('title')).toEqual('The Shawshank Redemption')
    })
})
