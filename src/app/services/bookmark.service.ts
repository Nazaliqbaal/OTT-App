import { Injectable } from '@angular/core'

@Injectable()
export class BookmarkService {
    public bookmarkedItems: any[] = []

    constructor() {
        const savedItems = localStorage.getItem('bookmarkedItems')
        if (savedItems) {
            this.bookmarkedItems = JSON.parse(savedItems)
        }
    }

    addItem(movieData: { title: string; label: string; image: string; id: string; year: string }) {
        
        const existingItem = this.bookmarkedItems.find((item: any) => item.id === movieData.id)
        if (existingItem) {
            console.log('Item with same id already exists in local storage')
            return
        }
        const newBookmark = movieData
        this.bookmarkedItems.push(newBookmark)
        localStorage.setItem('bookmarkedItems', JSON.stringify(this.bookmarkedItems))
    }

    removeItem(id: string) {
        this.bookmarkedItems = this.bookmarkedItems.filter((item: any) => item.id !== id)
        localStorage.setItem('bookmarkedItems', JSON.stringify(this.bookmarkedItems))
        console.log('local storage with removed item')
    }

    getItems() {
        return JSON.stringify(this.bookmarkedItems)
    }
}
