import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'

import { SearchBarComponent } from './components/search-bar/search-bar.component'
import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { InputComponent } from './components/input/input.component'
import { CardComponent } from './components/card/card.component'
import { DropDownMenuComponent } from './components/drop-down-menu/drop-down-menu.component'
import { ButtonComponent } from './components/button/button.component'
import { NavigationBarComponent } from './components/navigation-bar/navigation-bar.component'
import { ProfileMenuComponent } from './components/profile-menu/profile-menu.component'
import { NavigationMenuComponent } from './components/navigation-menu/navigation-menu.component'
import { MovieSeriesCardComponent } from './components/movie-series-card/movie-series-card.component'
import { GenreComponent } from './components/genre/genre.component'
import { RegistrationPageComponent } from './modules/registration-page/registration-page.component'
import { HttpClientModule } from '@angular/common/http'
import { LoginPageComponent } from './modules/login-page/login-page.component'
import { UserAuthService } from './services/user-auth.service'
import { HomePageComponent } from './modules/home-page/home-page.component'
import { AuthGuardService } from './services/auth-guard.service'
import { JwtModule } from '@auth0/angular-jwt'
import { NoResultPageComponent } from './modules/no-result-page/no-result-page.component'
import { BannerComponent } from './components/banner/banner.component'
import { BookmarkPageComponent } from './modules/bookmark-page/bookmark-page.component';
import { MovieGenrePageComponent } from './modules/movie-genre-page/movie-genre-page.component';
import { MovieGenreDetailsPageComponent } from './modules/movie-genre-details-page/movie-genre-details-page.component'
import { InfiniteScrollModule } from 'ngx-infinite-scroll'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { DashboardComponent } from './modules/dashboard/dashboard.component'
import { CarouselModule } from 'ngx-owl-carousel-o'
import { StarRatingComponent } from './components/star-rating/star-rating.component'
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MovieDetailComponent } from './components/movie-detail/movie-detail.component';
import { GenreCardComponent } from './components/genre-card/genre-card.component';
import { CastMemberComponent } from './components/cast-member/cast-member.component';
import { DetailPageComponent } from './modules/detail-page/detail-page.component'
import { SearchResultPageComponent } from './modules/search-result-page/search-result-page.component'
import { LoginRegisterAuthService } from './services/login-register-auth.service';
import { BookmarkIconComponent } from './components/bookmark-icon/bookmark-icon.component'
import { BookmarkService } from './services/bookmark.service'

@NgModule({
    declarations: [
        AppComponent,
        ButtonComponent,
        GenreComponent,
        MovieSeriesCardComponent,
        NavigationBarComponent,
        ProfileMenuComponent,
        SearchBarComponent,
        NavigationMenuComponent,
        DropDownMenuComponent,
        ProfileMenuComponent,
        CardComponent,
        InputComponent,
        LoginPageComponent,
        RegistrationPageComponent,
        HomePageComponent,
        SearchResultPageComponent,
        NoResultPageComponent,
        DashboardComponent,
        BannerComponent,
        BookmarkPageComponent,
        MovieGenrePageComponent,
        MovieGenreDetailsPageComponent,
        DashboardComponent,
        StarRatingComponent,
        MovieDetailComponent,
        GenreCardComponent,
        CastMemberComponent,
        DetailPageComponent,
        SearchResultPageComponent,
        BookmarkIconComponent,
    ],

    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        BrowserAnimationsModule,
        InfiniteScrollModule,
        JwtModule.forRoot({
            config: {
                tokenGetter: () => localStorage.getItem('access_token'),
            },
        }),
        CarouselModule,
        BrowserAnimationsModule,
        NgbModule,
    ],

    providers: [UserAuthService, AuthGuardService, LoginRegisterAuthService, BookmarkService],
    bootstrap: [AppComponent],
})
export class AppModule {}
