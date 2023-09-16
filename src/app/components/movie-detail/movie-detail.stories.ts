import { MovieDetailComponent } from "./movie-detail.component"

export default {
    title: 'OTT App/Movie Detail',
    component: MovieDetailComponent,
}

export const MovieDetails1 = () => ({
    props: {
        label: 'Language',
        movieDetail: 'English',
    },
})

export const MovieDetails2 = () => ({
    props: {
        label: 'Year',
        movieDetail: '1994',
    },
})
