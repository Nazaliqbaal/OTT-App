// also exported from '@storybook/angular' if you can deal with breaking changes in 6.1
import { Story, moduleMetadata } from '@storybook/angular'
import { GenreComponent } from './genre.component'

// More on default export: https://storybook.js.org/docs/angular/writing-stories/introduction#default-export
export default {
    title: 'OTT App/Genre',
    component: GenreComponent,
    decorators: [
        moduleMetadata({
            declarations: [GenreComponent],
        }),
    ],
}

export const ActionGenre: Story = () => ({
    props: {
        genre: 'Action',
        color: '#0e7490',
    },
})
export const AdventureGenre: Story = () => ({
    props: {
        genre: 'Adventure',
        color: '#171E31',
    },
})
export const DocumentaryGenre: Story = () => ({
    props: {
        genre: 'Documentary',
        color: '#0F766E',
    },
})
export const AnimationGenre: Story = () => ({
    props: {
        genre: 'Animation',
        color: '#0e7490',
    },
})

