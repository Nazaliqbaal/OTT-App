import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing'
import { TestBed, fakeAsync, tick } from '@angular/core/testing'
import { RouterTestingModule } from '@angular/router/testing'
import { UserAuthService } from './user-auth.service'
import { Router } from '@angular/router'

describe('UserAuthService', () => {
    let service: UserAuthService
    let httpMock: HttpTestingController
    let router: Router

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule, RouterTestingModule],
            providers: [UserAuthService],
        })

        service = TestBed.inject(UserAuthService)
        httpMock = TestBed.inject(HttpTestingController)
        router = TestBed.inject(Router)
    })

    afterEach(() => {
        httpMock.verify()
    })

    it('should be created', () => {
        expect(service).toBeTruthy()
    })

    it('should make a POST request to the login API', () => {
        const dummyUser = {
            identifier: 'test@example.com',
            password: 'password',
        }

        service.loginUser(dummyUser).subscribe((response) => {
            expect(response).toBeTruthy()
        })

        const req = httpMock.expectOne(`${service.apiUrl}`)
        expect(req.request.method).toBe('POST')
        req.flush({})
    })

    it('should make a POST request to the register API', () => {
        const dummyUser = {
            username: 'testName',
            email: 'test@example.com',
            password: 'password',
            confirmPassword: 'password',
        }

        service.registerUser(dummyUser).subscribe((response) => {
            expect(response).toBeTruthy()
        })

        const req = httpMock.expectOne(`${service.apiUrl}/register`)
        expect(req.request.method).toBe('POST')
        req.flush({})
    })

    it('should make a GET request to the movies/series API with authorization headers', () => {
        const dummySearchVal = 'test'
        const dummyPageNo = 1

        service.fetchMoviesSeries(dummySearchVal, dummyPageNo).subscribe((response) => {
            expect(response).toBeTruthy()
        })

        const req = httpMock.expectOne(
            `https://api.themoviedb.org/3/search/multi?query=${dummySearchVal}&api_key=1d42d448b0d527e767f463355d242d88&language=en-US&page=${dummyPageNo}&include_adult=false`
        )
        expect(req.request.method).toBe('GET')
        expect(req.request.headers.get('Authorization')).toBeTruthy()
        req.flush({})
    })

    it('should make a GET request to the trending movies API with authorization headers', () => {
        service.fetchTrendingMoviess().subscribe((response) => {
            expect(response).toBeTruthy()
        })

        const req = httpMock.expectOne('https://api.themoviedb.org/3/trending/movie/week?api_key=1d42d448b0d527e767f463355d242d88')
        expect(req.request.method).toBe('GET')
        expect(req.request.headers.get('Authorization')).toBeTruthy()
        req.flush({})
    })

    it('should make a GET request to the popular movies API with authorization headers', () => {
        service.fetchPopularMoviess().subscribe((response) => {
            expect(response).toBeTruthy()
        })

        const req = httpMock.expectOne(
            'https://api.themoviedb.org/3/movie/popular?api_key=1d42d448b0d527e767f463355d242d88&language=en-US&page=1'
        )
        expect(req.request.method).toBe('GET')
        expect(req.request.headers.get('Authorization')).toBeTruthy()
        req.flush({})
    })
    it('should clear localStorage and navigate to login page after logging out', fakeAsync(() => {
        spyOn(router, 'navigate')
        service.logOutUser()
        tick(1000)
        expect(localStorage.length).toBe(0)
        expect(router.navigate).toHaveBeenCalledWith(['/login'])
    }))
     it('should retrieve movie data', () => {
         const mockMovieData = {
             title: 'Example Movie',
             release_date: '2022-01-01',
             overview: 'This is an example movie.',
         }

         service.fetchMovieData('movie', 12345).subscribe((data) => {
             expect(data).toEqual(mockMovieData)
         })

         const req = httpMock.expectOne(`https://api.themoviedb.org/3/movie/12345?api_key=1d42d448b0d527e767f463355d242d88`)
         expect(req.request.method).toBe('GET')
         req.flush(mockMovieData)
     })
       it('should retrieve movie cast from API via GET', () => {
           const movieorseries = 'movie'
           const movieId = 12345
           const mockCastResponse = {
               cast: [
                   { id: 1, name: 'Actor 1' },
                   { id: 2, name: 'Actor 2' },
                   { id: 3, name: 'Actor 3' },
               ],
           }
           service.fetchMovieCast(movieorseries, movieId).subscribe((response: any) => {
               expect(response).toEqual(mockCastResponse)
           })
           const request = httpMock.expectOne(
               `https://api.themoviedb.org/3/${movieorseries}/${movieId}/credits?api_key=1d42d448b0d527e767f463355d242d88`
           )
           expect(request.request.method).toBe('GET')
           request.flush(mockCastResponse)
       })
       it('should return movie genre list', () => {
           const dummyGenreList = {
               genres: [
                   { id: 28, name: 'Action' },
                   { id: 12, name: 'Adventure' },
                   { id: 16, name: 'Animation' },
               ],
           }

           service.fetchMovieGenre('movie').subscribe((genreList) => {
               expect(genreList).toEqual(dummyGenreList)
           })

           const req = httpMock.expectOne(
               `https://api.themoviedb.org/3/genre/movie/list?api_key=1d42d448b0d527e767f463355d242d88&language=en-US`
           )
           expect(req.request.method).toBe('GET')
           req.flush(dummyGenreList)
       })
       it('should retrieve genre details', () => {
           const dummyGenreDetails = { results: [{ id: 1, name: 'Action' }] }

           service.fetchMovieGenreDetails('movie', 1, '28').subscribe((genreDetails: any) => {
               expect(genreDetails).toEqual(dummyGenreDetails)
           })

           const req = httpMock.expectOne(
               `https://api.themoviedb.org/3/discover/movie?api_key=1d42d448b0d527e767f463355d242d88&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres=28`
           )
           expect(req.request.method).toBe('GET')
           req.flush(dummyGenreDetails)
       })
})
