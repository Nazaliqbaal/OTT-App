import { TestBed } from '@angular/core/testing'

import { BookmarkService } from './bookmark.service'

describe('BookmarkService', () => {
    let service: BookmarkService

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [BookmarkService],
        })
        service = TestBed.inject(BookmarkService)
    })

    it('should be created', () => {
        expect(service).toBeTruthy()
    })
    beforeEach(() => {
        service.bookmarkedItems=[]
    })

    describe('addItem', () => {
        it('should add item to bookmarkedItems', () => {
            const movieData = { title: 'Test Movie', label: 'Test Label', image: 'test-image.jpg', id: '123', year: '2022' }
            service.addItem(movieData)
            expect(service.bookmarkedItems.length).toBe(1)
            expect(service.bookmarkedItems[0]).toEqual(movieData)
        })

        it('should not add item if it already exists in bookmarkedItems', () => {
            const movieData = { title: 'Test Movie', label: 'Test Label', image: 'test-image.jpg', id: '123', year: '2022' }
            service.bookmarkedItems = [movieData]
            spyOn(console, 'log')
            service.addItem(movieData)
            expect(service.bookmarkedItems.length).toBe(1)
            expect(console.log).toHaveBeenCalledWith('Item with same id already exists in local storage')
        })
    })

    describe('removeItem', () => {
        it('should remove item from bookmarkedItems', () => {
            const movieData1 = { title: 'Test Movie 1', label: 'Test Label', image: 'test-image1.jpg', id: '123', year: '2022' }
            const movieData2 = { title: 'Test Movie 2', label: 'Test Label', image: 'test-image2.jpg', id: '456', year: '2022' }
            service.bookmarkedItems = [movieData1, movieData2]
            service.removeItem('123')
            expect(service.bookmarkedItems.length).toBe(1)
            expect(service.bookmarkedItems[0]).toEqual(movieData2)
        })

        it('should not remove item if it does not exist in bookmarkedItems', () => {
            const movieData = { title: 'Test Movie', label: 'Test Label', image: 'test-image.jpg', id: '123', year: '2022' }
            service.bookmarkedItems = [movieData]
            spyOn(localStorage, 'setItem')
            service.removeItem('456')
            expect(service.bookmarkedItems.length).toBe(1)
            expect(localStorage.setItem).toHaveBeenCalledWith('bookmarkedItems', JSON.stringify(service.bookmarkedItems))
        })
    })

    describe('getItems', () => {
        it('should return bookmarkedItems as string', () => {
            const movieData = { title: 'Test Movie', label: 'Test Label', image: 'test-image.jpg', id: '123', year: '2022' }
            service.bookmarkedItems = [movieData]
            const result = service.getItems()
            expect(result).toEqual(JSON.stringify(service.bookmarkedItems))
        })
    })
})
