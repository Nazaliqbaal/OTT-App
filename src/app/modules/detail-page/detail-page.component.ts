import { HttpClient } from '@angular/common/http'
import { Component } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { UserAuthService } from 'src/app/services/user-auth.service'

@Component({
    selector: 'app-detail-page',
    templateUrl: './detail-page.component.html',
    styleUrls: ['./detail-page.component.scss'],
})
export class DetailPageComponent {
    movieId!: number
    movieCredits: any
    movie: any

    constructor(private route: ActivatedRoute, private http: HttpClient, public userAuth: UserAuthService, public router: Router) {}

    ngOnInit() {
        this.route.params.subscribe((params) => {
            this.movieId = params['id']
            console.log('activated route is',this.movieId)
            if (this.router.url.includes('movie'||'movies')) {
                console.log('call movie api')
                this.userAuth.fetchMovieData('movie', this.movieId).subscribe((movie) => {
                    this.movie = movie
                })
                this.userAuth.fetchMovieCast('movie', this.movieId).subscribe((credits) => {
                    this.movieCredits = credits
                })
            } else if (this.router.url.includes('tv') || this.router.url.includes('series')) {
                console.log('call series api')
                this.userAuth.fetchMovieData('tv', this.movieId).subscribe((movie) => {
                    this.movie = movie
                })
                this.userAuth.fetchMovieCast('tv', this.movieId).subscribe((credits) => {
                    this.movieCredits = credits
                })
            }
        })
    }
}
