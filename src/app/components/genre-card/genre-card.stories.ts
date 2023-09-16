import { GenreCardComponent } from './genre-card.component'

export default {
    title: 'OTT App/MovieGenres',
    component: GenreCardComponent,
}

export const MovieGenre = () => ({
    props: {
        genre: 'Action',
    },
})
