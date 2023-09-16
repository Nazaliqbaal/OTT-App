import { Component, OnInit } from '@angular/core'
import { UserAuthService } from 'src/app/services/user-auth.service'
import { OwlOptions } from 'ngx-owl-carousel-o'
import { environment } from 'src/environments/environment'

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
    imageBaseUrl: string = environment.imageBaseUrl
    customOptions: OwlOptions = {
        loop: false,
        mouseDrag: false,
        touchDrag: false,
        pullDrag: false,
        dots: false,
        navSpeed: 600,
        navText: ['<img src="/assets/prev-button.svg">', '<img src="/assets/next-button.svg">'],
        responsive: {
            0: {
                items: 1,
            },
            200: {
                items: 2,
            },
            300: {
                items: 2,
            },
            760: {
                items: 3,
            },
            1000: {
                items: 3,
            },
        },
        nav: true,
    }
    customOptions1: OwlOptions = {
        loop: false,
        mouseDrag: false,
        touchDrag: false,
        pullDrag: false,
        dots: false,
        navSpeed: 600,
        navText: ['<img src="/assets/prev-button.svg">', '<img src="/assets/next-button.svg">'],
        responsive: {
            0: {
                items: 1,
            },
            200: {
                items: 1,
            },
            300: {
                items: 1,
            },
            760: {
                items: 1,
            },
            1000: {
                items: 1,
            },
        },
        nav: true,
        autoplay: true,
        lazyLoad: true,
    }

    allTrendingMovies: any = []
    allPopularMovies: any = []

    constructor(private userAuth: UserAuthService) {}

    ngOnInit(): void {
        this.fetchTrendingMovies()
        this.fetchPopularMovies()
    }

    public fetchTrendingMovies() {
        this.userAuth.fetchTrendingMoviess().subscribe((res: any) => {
            console.log(res)
            this.allTrendingMovies = res.results
        })
    }

    public fetchPopularMovies() {
        this.userAuth.fetchPopularMoviess().subscribe((res: any) => {
            console.log(res)
            this.allPopularMovies = res.results
        })
    }
}
