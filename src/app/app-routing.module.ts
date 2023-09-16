import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { NoResultPageComponent } from './modules/no-result-page/no-result-page.component'
import { BookmarkPageComponent } from './modules/bookmark-page/bookmark-page.component'
import { HomePageComponent } from './modules/home-page/home-page.component'
import { LoginPageComponent } from './modules/login-page/login-page.component'
import { MovieGenreDetailsPageComponent } from './modules/movie-genre-details-page/movie-genre-details-page.component'
import { MovieGenrePageComponent } from './modules/movie-genre-page/movie-genre-page.component'
import { DashboardComponent } from './modules/dashboard/dashboard.component'
import { DetailPageComponent } from './modules/detail-page/detail-page.component'
import { SearchResultPageComponent } from './modules/search-result-page/search-result-page.component'
import { RegistrationPageComponent } from './modules/registration-page/registration-page.component'
import { AuthGuardService } from './services/auth-guard.service'
import { LoginRegisterAuthService } from './services/login-register-auth.service'

const routes: Routes = [
    { path: 'login', component: LoginPageComponent, canActivate: [LoginRegisterAuthService] },
    { path: 'register', component: RegistrationPageComponent, canActivate: [LoginRegisterAuthService] },
    {
        path: 'home',
        component: HomePageComponent,
        // canActivate: [AuthGuardService],
        children: [
            { path: '', component: DashboardComponent },
            { path: 'bookmarks', component: BookmarkPageComponent },
            { path: 'bookmarks/details/:id', component: DetailPageComponent },
            { path: 'bookmarks/:type/details/:id', component: DetailPageComponent },
            { path: 'details/:id', component: DetailPageComponent },
            { path: 'movies/details/:id', component: DetailPageComponent },
            { path: 'search/:query', component: SearchResultPageComponent },
            { path: 'search/:query/:type/details/:id', component: DetailPageComponent },
            { path: ':moviesSeries', component: MovieGenrePageComponent },
            { path: ':moviesSeries/:id', component: MovieGenreDetailsPageComponent },
            { path: ':moviesSeries/:id/details/:id', component: DetailPageComponent },
        ],
    },
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'no-result/:errorData', component: NoResultPageComponent },
]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
