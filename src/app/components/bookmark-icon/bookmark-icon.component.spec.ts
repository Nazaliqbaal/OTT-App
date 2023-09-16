import { ComponentFixture, TestBed } from '@angular/core/testing'
import { BookmarkService } from 'src/app/services/bookmark.service'
import { BookmarkIconComponent } from './bookmark-icon.component'

describe('BookmarkIconComponent', () => {
    let component: BookmarkIconComponent
    let fixture: ComponentFixture<BookmarkIconComponent>
    let bookmarkService: BookmarkService

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [BookmarkIconComponent],
            providers: [BookmarkService],
        }).compileComponents()
    })

    beforeEach(() => {
        fixture = TestBed.createComponent(BookmarkIconComponent)
        component = fixture.componentInstance
        bookmarkService = TestBed.inject(BookmarkService)
        fixture.detectChanges()
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })

    it('should set isBookmark to true if the item is already bookmarked', () => {
        const bookmarkedItems = [{ id: '123', title: 'Movie Title' }]
        spyOn(bookmarkService, 'getItems').and.returnValue(JSON.stringify(bookmarkedItems))
        component.id = '123'
        expect(component.isBookmark).toBe(true)
    })

    it('should add a new bookmark when toggleBookmark is called and isBookmark is false', () => {
        spyOn(bookmarkService, 'addItem')
        component.isBookmark = false
        component.toggleBookmark(new Event('click'))
        expect(bookmarkService.addItem).toHaveBeenCalled()
        expect(component.isBookmark).toBe(true)
    })

    it('should remove item from the bookmark list when toggleBookmark is called', () => {
        spyOn(bookmarkService, 'removeItem').and.callThrough()
        component.id = '123'
        component.isBookmark = true
        component.toggleBookmark(new Event('click'))
        expect(bookmarkService.removeItem).toHaveBeenCalledOnceWith('123')
        expect(component.isBookmark).toBe(false)
    })
})
