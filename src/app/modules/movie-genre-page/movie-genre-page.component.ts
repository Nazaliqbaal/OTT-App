import { Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { UserAuthService } from 'src/app/services/user-auth.service'

@Component({
    selector: 'app-movie-genre-page',
    templateUrl: './movie-genre-page.component.html',
    styleUrls: ['./movie-genre-page.component.scss'],
})
export class MovieGenrePageComponent implements OnInit {
    movieSeriesGenres: any
    isApi1: boolean = false
    constructor(public userAuth: UserAuthService, public activatedRoute: ActivatedRoute) {}
    ngOnInit() {
        this.fetchMovieTypes()
    }
    fetchMovieTypes() {
        this.activatedRoute.params.subscribe((params) => {
            if (params['moviesSeries'] === 'movies') {
                this.isApi1 = true
                this.userAuth.fetchMovieGenre('movie').subscribe((res: any) => {
                    this.movieSeriesGenres = res.genres
                    console.log(this.movieSeriesGenres.id)
                })
            } else if (params['moviesSeries'] === 'series') {
                this.isApi1 = false
                this.userAuth.fetchMovieGenre('tv').subscribe((res: any) => {
                    this.movieSeriesGenres = res.genres
                    console.log(res.genres.id)
                })
            }
        })
    }
}
