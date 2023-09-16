// also exported from '@storybook/angular' if you can deal with breaking changes in 6.1
import { Story, moduleMetadata } from '@storybook/angular'
import { MovieSeriesCardComponent } from './movie-series-card.component'

// More on default export: https://storybook.js.org/docs/angular/writing-stories/introduction#default-export
export default {
    title: 'OTT App/Movie series card',
    component: MovieSeriesCardComponent,
    decorators: [
        moduleMetadata({
            declarations: [MovieSeriesCardComponent],
        }),
    ],
}

export const moviescard: Story = () => ({
    props: {
        image: 'assets/card-movie.png',
        icon: 'assets/movie-icon.png',
        label: 'Movie',
        title: 'Batman',
        year: 2000,
        isBookmark: false,
    },
})
export const seriescard: Story = () => ({
    props: {
        image: 'assets/card-series.png',
        icon: 'assets/movie-icon.png',
        label: 'TV Series',
        title: 'Friends',
        year: 1999,
        isBookmark: true,
    },
})
