import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Params, Router } from '@angular/router'
import { UserAuthService } from 'src/app/services/user-auth.service'
import { environment } from 'src/environments/environment'

export interface IMovieSeries {
    adult: boolean
    backdrop_path: string
    genre_ids: []
    id: number
    media_type: string
    original_language: string
    original_title: string
    original_name: string
    overview: string
    popularity: number
    poster_path: string
    release_date: string
    first_air_date: string
    title: string
    video: boolean
    vote_average: number
    vote_count: number
}

@Component({
    selector: 'app-search-result-page',
    templateUrl: './search-result-page.component.html',
    styleUrls: ['./search-result-page.component.scss'],
})
export class SearchResultPageComponent implements OnInit {
    imageBaseUrl: string = environment.imageBaseUrl
    allMovies: IMovieSeries[] = []
    currentPage = 1
    currentMovieSeries: string = ''
    totalItems: number | null = null
    constructor(public userAuth: UserAuthService, private router: Router, private activatedRoute: ActivatedRoute) {}
    ngOnInit(): void {
        this.activatedRoute.params.subscribe((params) => {
            this.userAuth.fetchMoviesSeries(params['query'], this.currentPage).subscribe((res: any) => {
                this.currentMovieSeries = params['query']
                this.totalItems = res.total_results
                this.allMovies = res.results
                if (this.allMovies.length === 0) {
                    this.router.navigate(['/no-result', params['query']])
                }
            })
        })
    }
    onScroll() {
        this.currentPage++
        this.activatedRoute.params.subscribe((params: Params) => {
            this.userAuth.fetchMoviesSeries(params['query'], this.currentPage).subscribe((res: any) => {
                this.allMovies = [...this.allMovies, ...res.results]
            })
        })
    }
}
