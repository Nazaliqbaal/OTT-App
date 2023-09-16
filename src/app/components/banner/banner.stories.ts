// also exported from '@storybook/angular' if you can deal with breaking changes in 6.1
import { Story, moduleMetadata } from '@storybook/angular'
import { BannerComponent } from './banner.component'

// More on default export: https://storybook.js.org/docs/angular/writing-stories/introduction#default-export
export default {
    title: 'OTT App/Banner',
    component: BannerComponent,
    decorators: [
        moduleMetadata({
            declarations: [BannerComponent],
        }),
    ],
}

export const bannerjohnwick: Story = () => ({
    props: {
        year: '2000',
        title: 'John wick: Chapter 3 - Parabellum',
        overview:
            'In "John Wick: Chapter 3 - Parabellum", legendary hitman John Wick is on the run after being declared "excommunicado" by the High Table, with a $14 million bounty on his head. Wick must fight his way through waves of assassins and navigate the dangerous world of the criminal underworld to try and survive.',
        voteAverage: '4.5',
        background: 'assets/card-movie.png',
    },
})
