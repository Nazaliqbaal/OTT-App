import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { environment } from 'src/environments/environment'
import { Router } from '@angular/router'
import { tap } from 'rxjs/operators'
import { Observable } from 'rxjs'

interface ILogin {
    identifier: string
    password: string
}

interface IRegister {
    username: string
    email: string
    password: string
}

@Injectable()
export class UserAuthService {
    public apiUrl = environment.apiUrl
    constructor(private http: HttpClient, private router: Router) {}
    loginUser(user: ILogin) {
        return this.http.post(this.apiUrl, user)
    }
    registerUser(user: IRegister): Observable<any> {
        return this.http.post(`${this.apiUrl}/register`, user).pipe(
            tap((response: any) => {
                localStorage.setItem('token', response.jwt)
            })
        )
    }
    fetchMoviesSeries(seachVal: string, pageNo: number) {
        const token = localStorage.getItem('token')
        const headers = { Authorization: `Bearer ${token}` }

        return this.http.get(
            `https://api.themoviedb.org/3/search/multi?query=${seachVal}&api_key=1d42d448b0d527e767f463355d242d88&language=en-US&page=${pageNo}&include_adult=false`,
            { headers }
        )
    }

    /**
     * Removes the token from localStorage and navigates the user to the login page.
     * After clearing the token, it waits for 2 seconds before navigating to the login page.
     * This method is called when the user logs out.
     */
    logOutUser() {
        localStorage.clear()
        setTimeout(() => {
            this.router.navigate(['/login'])
        }, 1000)
    }

    fetchTrendingMoviess() {
        const token = localStorage.getItem('token')
        const headers = { Authorization: `Bearer ${token}` }
        return this.http.get('https://api.themoviedb.org/3/trending/movie/week?api_key=1d42d448b0d527e767f463355d242d88', {
            headers,
        })
    }

    fetchPopularMoviess() {
        const token = localStorage.getItem('token')
        const headers = { Authorization: `Bearer ${token}` }
        return this.http.get('https://api.themoviedb.org/3/movie/popular?api_key=1d42d448b0d527e767f463355d242d88&language=en-US&page=1', {
            headers,
        })
    }

    fetchMovieData(movieorseries: string, movieId: number) {
        return this.http.get(`https://api.themoviedb.org/3/${movieorseries}/${movieId}?api_key=1d42d448b0d527e767f463355d242d88`)
    }

    fetchMovieCast(movieorseries: string, movieId: number) {
        return this.http.get(`https://api.themoviedb.org/3/${movieorseries}/${movieId}/credits?api_key=1d42d448b0d527e767f463355d242d88`)
    }
    fetchMovieGenre(movieSeries: string) {
        return this.http.get(
            `https://api.themoviedb.org/3/genre/${movieSeries}/list?api_key=1d42d448b0d527e767f463355d242d88&language=en-US`
        )
    }
    fetchMovieGenreDetails(movieSeries: string, pageNo: number, genreId: string) {
        return this.http.get(
            `https://api.themoviedb.org/3/discover/${movieSeries}?api_key=1d42d448b0d527e767f463355d242d88&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${pageNo}&with_genres=${genreId}`
        )
    }
}
