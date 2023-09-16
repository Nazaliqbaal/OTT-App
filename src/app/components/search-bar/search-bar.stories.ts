import { Meta, moduleMetadata, Story } from '@storybook/angular'

import { SearchBarComponent } from './search-bar.component'
import { FormsModule } from '@angular/forms'
import { ButtonComponent } from '../button/button.component'

export default {
    /* 👇 The title prop is optional.
     * See https://storybook.js.org/docs/angular/configure/overview#configure-story-loading
     * to learn how to generate automatic titles
     */
    title: 'OTT App/Search Bar',
    component: SearchBarComponent,
    decorators: [
        moduleMetadata({
            declarations: [SearchBarComponent, ButtonComponent],
            imports: [FormsModule],
        }),
    ],
}

export const SearchBar: Story = () => ({
    props: {
        inputPlaceholder: 'Search for movies or TV series',
    },
})
