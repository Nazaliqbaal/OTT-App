import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'app-genre-card',
    templateUrl: './genre-card.component.html',
    styleUrls: ['./genre-card.component.scss'],
})
export class GenreCardComponent {
    @Input() genre!: string
}
