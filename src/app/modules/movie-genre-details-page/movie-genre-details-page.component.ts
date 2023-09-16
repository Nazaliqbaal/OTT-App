import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Params, Router } from '@angular/router'
import { UserAuthService } from 'src/app/services/user-auth.service'
import { environment } from 'src/environments/environment'

interface IMovieSeries {
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
    selector: 'app-movie-genre-details-page',
    templateUrl: './movie-genre-details-page.component.html',
    styleUrls: ['./movie-genre-details-page.component.scss'],
})
export class MovieGenreDetailsPageComponent implements OnInit {
    imageBaseUrl: string = environment.imageBaseUrl
    movieGenreDetails: IMovieSeries[] = []
    currentPage: number = 1
    currentMovieorSeriesUrl: string = ''
    constructor(public userAuth: UserAuthService, private router: Router, private activatedRoute: ActivatedRoute) {}

    ngOnInit(): void {
        this.activatedRoute.params.subscribe((params) => {
            this.currentMovieorSeriesUrl = this.router.url
            if (this.router.url.includes('movies')) {
                this.userAuth.fetchMovieGenreDetails('movie', this.currentPage, params['id']).subscribe((res: any) => {
                    console.log(res)
                    this.movieGenreDetails = res.results
                })
            } else if (this.router.url.includes('series')) {
                this.userAuth.fetchMovieGenreDetails('tv', this.currentPage, params['id']).subscribe((res: any) => {
                    console.log(res)
                    this.movieGenreDetails = res.results
                })
            }
        })
    }
    onScroll() {
        this.currentPage++
        this.activatedRoute.params.subscribe((params: Params) => {
            this.userAuth.fetchMovieGenreDetails('movie', this.currentPage, params['id']).subscribe((res: any) => {
                this.movieGenreDetails = [...this.movieGenreDetails, ...res.results]
            })
        })
    }
}
