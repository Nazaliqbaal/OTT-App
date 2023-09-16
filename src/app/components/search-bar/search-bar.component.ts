import { Component, Input, Output, EventEmitter } from '@angular/core'
import { debounceTime, distinctUntilChanged, fromEvent } from 'rxjs'
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout'

@Component({
    selector: 'app-search-bar',
    templateUrl: './search-bar.component.html',
    styleUrls: ['./search-bar.component.scss'],
})
export class SearchBarComponent {
    searchValue: string = ''
    @Input() inputPlaceholder: string = ''
    @Output() search = new EventEmitter<string>()

    constructor(public breakpointObserver: BreakpointObserver) {}

    ngOnInit() {
        this.breakpointObserver.observe([Breakpoints.Handset]).subscribe((result: { matches: any }) => {
            if (result.matches) {
                const inputElement = document.querySelector('.searchInput')
                if (inputElement) {
                    fromEvent<KeyboardEvent>(inputElement, 'keydown')
                        .pipe(debounceTime(1000), distinctUntilChanged())
                        .subscribe(() => {
                            this.search.emit(this.searchValue)
                        })
                }
            }
        })
    }

    onSearch(value: Event) {
        if (value) {
            this.searchValue = (value.target as HTMLInputElement).value
        }
    }
    onSeachButtonClick() {
        this.search.emit(this.searchValue)
    }
}
