import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Params } from '@angular/router'

@Component({
    selector: 'app-no-result-page',
    templateUrl: './no-result-page.component.html',
    styleUrls: ['./no-result-page.component.scss'],
})
export class NoResultPageComponent implements OnInit {
    errorMovie: string = ''
    constructor(public activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.params.subscribe((params:Params) => {
            this.errorMovie = params['errorData']
        })
    }
}
